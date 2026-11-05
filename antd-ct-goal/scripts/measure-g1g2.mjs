// G1・G2 の計測：今週の相手の名前とハドルボタンが、最初の画面（高さ 900px）のどこにあるか、
// 未ログインで開いたときに何回の操作でハドル開始の通知まで行けるかを数える。
// 使い方: NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const APP = process.env.APP_URL ?? 'http://localhost:5173';
const browser = await chromium.launch();
const out = [];
for (const width of [1440, 390]) {
  const page = await (await browser.newContext({ viewport: { width, height: 900 }, locale: 'ja-JP', reducedMotion: 'reduce' })).newPage();
  // 1) ログイン中（S01）
  await page.goto(`${APP}/?state=S01`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const name = await page.getByRole('heading', { name: '高橋 健太 さん' }).boundingBox();
  const btn = await page.getByRole('button', { name: '高橋 健太さんとハドルを始める' }).boundingBox();
  // 2) 通常の訪問（状態指定なし＝ログイン済みとして開く）→ ハドル開始まで
  await page.goto(`${APP}/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '高橋 健太さんとハドルを始める' }).click();
  const toast1 = await page.getByText('#u-kenta でハドルを始めます').waitFor({ timeout: 3000 }).then(() => true, () => false);
  // 3) 未ログイン（S02）→ ログイン → ハドル開始
  await page.goto(`${APP}/?state=S02`, { waitUntil: 'networkidle' });
  const loginBtn = await page.getByRole('button', { name: 'Slack でログイン' }).first().boundingBox();
  await page.getByRole('button', { name: 'Slack でログイン' }).first().click();
  const btn2 = await page.getByRole('button', { name: '高橋 健太さんとハドルを始める' }).boundingBox();
  await page.getByRole('button', { name: '高橋 健太さんとハドルを始める' }).click();
  const toast2 = await page.getByText('#u-kenta でハドルを始めます').first().waitFor({ timeout: 3000 }).then(() => true, () => false);
  const scrollY = await page.evaluate(() => window.scrollY);
  out.push({ width, partnerNameBottom: Math.round(name.y + name.height), huddleButtonBottom: Math.round(btn.y + btn.height), viewportHeight: 900,
    loggedInClicksToHuddle: toast1 ? 1 : 'fail', loginButtonBottom: Math.round(loginBtn.y + loginBtn.height), huddleButtonBottomAfterLogin: Math.round(btn2.y + btn2.height),
    loggedOutClicksToHuddle: toast2 ? 2 : 'fail', scrollYAtEnd: scrollY });
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
