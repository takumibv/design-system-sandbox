// 状態一覧（S01〜S18）に無い証拠の撮影：G5 の「参加しない」を選んだ直後の警告
// 使い方: NODE_PATH=$(npm root -g) node scripts/capture-extra.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const APP = process.env.APP_URL ?? 'http://localhost:5173';
const b = await chromium.launch();
for (const width of [1440, 390]) {
  const p = await (await b.newContext({ viewport: { width, height: 900 }, locale: 'ja-JP', reducedMotion: 'reduce' })).newPage();
  await p.goto(`${APP}/settings?state=S01`, { waitUntil: 'networkidle' });
  await p.getByLabel('参加しない（休職・繁忙期など）').check();
  await p.getByText('保存すると、組み合わせから外れます').waitFor();
  await p.screenshot({ path: `screenshots/G5-leave-warning-${width}.png`, fullPage: true });
  const box = await p.getByText('保存すると、組み合わせから外れます').boundingBox();
  const save = await p.getByRole('button', { name: '保存する' }).boundingBox();
  console.log(width, 'warning top', Math.round(box.y), 'save button bottom', Math.round(save.y + save.height));
}
await b.close();
