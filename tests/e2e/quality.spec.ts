import AxeBuilder from '@axe-core/playwright';
import { test, expect, noHorizontalScroll } from './fixtures';

const PAGES = [
  '/',
  '/events/',
  '/events/map/',
  '/events/calendar/',
  '/events/past/',
  '/events/past/2026/',
  '/events/series/thursday-night-swing/',
  '/events/2026-10-08-thursday-night-swing/',
  '/events/2026-10-03-beacon-blues-night/',
  '/community/',
  '/new-to-swing/',
  '/lessons/',
  '/venues/',
  '/venues/riverbend-community-hall/',
  '/venues/juniper-grange/',
  '/performers/',
  '/performers/maya-rivera/',
  '/about/',
  '/membership/',
  '/gallery/',
  '/contact/',
  '/faq/',
  '/privacy/',
  '/this-page-does-not-exist/',
];

test.describe('accessibility (axe, WCAG 2.2 AA)', () => {
  for (const path of PAGES) {
    test(`no serious or critical violations: ${path}`, async ({ pinned: page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')})`)).toEqual([]);
    });
  }
});

test.describe('keyboard and narrow screens', () => {
  test('skip link and add-to-calendar menu are keyboard accessible', async ({ pinned: page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    const summary = page.locator('[data-featured-candidate]:not([hidden]) details[data-menu] > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-featured-candidate]:not([hidden]) details[data-menu] a[data-track-method="google"]')).toBeVisible();
  });

  test.describe('320 px', () => {
    test.use({ viewport: { width: 320, height: 640 } });
    for (const path of PAGES) {
      test(`no sideways scrolling: ${path}`, async ({ pinned: page }) => {
        await page.goto(path);
        await noHorizontalScroll(page);
      });
    }
  });
});

test.describe('SEO metadata', () => {
  test('every key page has a unique title, description and canonical URL', async ({ page }) => {
    const titles = new Set<string>();
    for (const path of PAGES.filter((p) => !p.includes('does-not-exist'))) {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(titles.has(title), `duplicate title "${title}"`).toBe(false);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${path.replace(/\//g, '\\/')}$`));
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https?:\/\//);
      expect(await page.locator('h1').count()).toBe(1);
    }
  });

  test('event pages include valid Event structured data', async ({ page }) => {
    await page.goto('/events/2026-10-17-saturday-stomp-live-band/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const event = blocks.map((b) => JSON.parse(b)).find((d) => d['@type'] === 'DanceEvent');
    expect(event.startDate).toBe('2026-10-17T19:30:00-04:00');
    expect(event.location.address.addressLocality).toBe('Riverbend');
    expect(event.performer[0]['@type']).toBe('MusicGroup');
  });

  test('unknown pages show a helpful 404', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Oops, we missed a step');
    await expect(page.getByRole('link', { name: 'See upcoming dances' })).toBeVisible();
  });
});
