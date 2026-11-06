// capture.mjs の axe 結果を詳しく見るための補助スクリプト（違反ノードと色を出す）
// 使い方: NODE_PATH=$(npm root -g) node scripts/axe-detail.mjs "/?state=S01" 390
import { createRequire } from 'node:module';
import AxeBuilder from '@axe-core/playwright';
const { chromium } = createRequire(import.meta.url)('playwright');
const [path = '/', width = '1440'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: Number(width), height: 900 }, locale: 'ja-JP', reducedMotion: 'reduce' })).newPage();
await page.goto(`${process.env.APP_URL ?? 'http://localhost:5173'}${path}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
for (const v of r.violations) for (const n of v.nodes) console.log(v.id, '|', n.target.join(' '), '|', (n.any[0]?.message ?? n.failureSummary).slice(0, 160));
const ow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 5).map((e) => e.className.toString().slice(0, 80)));
console.log('overflow elements:', ow);
await browser.close();
