import { test, expect } from './fixtures';

test.describe('visitor journeys', () => {
  test('finds the next home dance and opens details', async ({ pinned: page }) => {
    await page.goto('/');
    const card = page.locator('[data-featured-candidate]:not([hidden]) .featured');
    await expect(card).toBeVisible();
    await expect(card.getByText('Next Riverbend dance')).toBeVisible();
    await expect(card.locator('.featured__title')).toHaveText('Thursday Night Swing');
    await expect(card.getByText(/Lesson:/)).toBeVisible();
    await expect(card.locator('li', { hasText: 'Where:' })).toContainText('Riverbend Community Hall');
    await expect(card.locator('li', { hasText: 'Admission:' })).toContainText('$15');
    await card.getByRole('link', { name: 'View event details' }).click();
    await expect(page).toHaveURL(/\/events\/2026-10-08-thursday-night-swing\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Thursday Night Swing');
    await expect(page.locator('section[aria-labelledby="glance"]')).toContainText('Riverbend Community Hall');
  });

  test('calendar and share links work', async ({ pinned: page, request }) => {
    await page.goto('/events/2026-10-08-thursday-night-swing/');
    const icsHref = await page.locator('#add-to-calendar a[download]').getAttribute('href');
    const res = await request.get(icsHref!);
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain('BEGIN:VCALENDAR');
    expect(body).toContain('SUMMARY:Thursday Night Swing');
    const google = await page.locator('#add-to-calendar a[data-track-method="google"]').getAttribute('href');
    expect(new URL(google!).searchParams.get('dates')).toMatch(/^\d{8}T\d{6}Z\/\d{8}T\d{6}Z$/);
    await expect(page.locator('#share').getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', /facebook\.com\/sharer/);
  });

  test('home events come before community events and filters can isolate them', async ({ pinned: page }) => {
    await page.goto('/events/');
    await expect(page.locator('[data-featured-candidate] .featured__label')).toContainText('Next Riverbend dance');
    const sections = await page.locator('[data-host-section]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.hostSection));
    expect(sections).toEqual(['home', 'community']);
    await page.locator('label.chip', { hasText: 'Community events' }).click();
    await expect(page.locator('[data-host-section="home"]')).toBeHidden();
    await expect(page).toHaveURL(/host=community/);
    const visibleHosts = await page.locator('[data-upcoming-list] .event-card:visible').evaluateAll((els) => [...new Set(els.map((e) => (e as HTMLElement).dataset.host))]);
    expect(visibleHosts).toEqual(['community']);
  });

  test('cancelled events stay visible and expired events are hidden from upcoming', async ({ pinned: page }) => {
    await page.goto('/events/2026-11-05-thursday-night-swing/');
    await expect(page.locator('.alert--bad')).toContainText('This event is cancelled.');
    await page.goto('/events/');
    await expect(page.locator('a[href="/events/2026-09-24-september-sendoff/"]')).toHaveCount(0);
  });

  test('only the next 3 home dances show before Show more', async ({ pinned: page }) => {
    await page.goto('/');
    const list = page.locator('[data-upcoming-list="home"]');
    await expect(list.locator('.event-card:visible')).toHaveCount(3);
    const total = await list.locator('.event-card').count();
    expect(total).toBeGreaterThan(3);
    const more = page.locator('[data-collapse-toggle="home-home-list"]');
    await expect(more).toHaveText(`Show ${total - 3} more Riverbend dances`);
    await more.click();
    await expect(list.locator('.event-card:visible')).toHaveCount(total);
  });

  test('theme switch, slideshow, map, CMS, redirects and no-JS list', async ({ pinned: page, browser, isMobile }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 14, 27)');
    if (isMobile) {
      await page.getByRole('button', { name: 'Menu' }).click();
      await page.locator('#nav-panel input[value="light"]').check({ force: true });
    } else {
      await page.locator('.site-header').getByRole('button', { name: 'Switch to light mode' }).click();
    }
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    const show = page.locator('.home-hero__photos [data-slideshow]');
    await expect(show).toBeVisible();
    expect(await show.locator('[data-slide]').count()).toBeGreaterThan(5);
    await show.getByRole('button', { name: 'Next photo' }).click();
    await expect(show.locator('[data-slideshow-count]')).toHaveText(/^2 \/ \d+$/);

    await page.goto('/events/map/');
    const places = page.locator('[data-map-place]');
    expect(await places.count()).toBeGreaterThan(3);
    await expect(page.locator('.leaflet-marker-icon')).toHaveCount(await places.count());
    await expect(page.locator('.leaflet-marker-icon.map-pin--home')).toHaveCount(1);

    await page.goto('/admin/');
    await expect(page.getByText(/Login with GitHub|Sign in with GitHub/i)).toBeVisible({ timeout: 20_000 });
    await page.goto('/events.php');
    await expect(page).toHaveURL(/\/events\/$/);

    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const nojs = await ctx.newPage();
    await nojs.goto('/events/');
    await expect(nojs.locator('[data-event-filters]')).toBeHidden();
    expect(await nojs.locator('[data-upcoming-list] .event-card').count()).toBeGreaterThan(3);
    await ctx.close();
  });
});
