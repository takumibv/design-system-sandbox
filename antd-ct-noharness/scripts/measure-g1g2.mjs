// G1・G2 の計測：開いた直後のファーストビュー（高さ 900px）に「相手の名前」と「ハドルを始める」が入るか、
// ハドル開始までに何回操作が要るかを測る。使い方: NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const browser = await chromium.launch();
const rows = [];
for (const width of [1440, 390]) {
  for (const [id, path, loginFirst] of [["S01", "/?state=ready", false], ["S02→ログイン", "/?state=guest", true], ["S09", "/?state=no-channel", false]]) {
    const page = await (await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" })).newPage();
    await page.goto(APP + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    let clicks = 0;
    if (loginFirst) {
      await page.getByRole("button", { name: "Slack でログイン" }).first().click();
      clicks++;
      await page.waitForTimeout(300);
    }
    const name = page.getByRole("heading", { level: 2, name: /さん$/ });
    const nameBox = await name.boundingBox();
    const btn = page.getByRole("button", { name: "ハドルを始める" });
    const hasBtn = (await btn.count()) > 0;
    const btnBox = hasBtn ? await btn.boundingBox() : null;
    let toast = "";
    if (hasBtn) {
      await btn.click();
      clicks++;
      toast = (await page.locator(".ant-message-notice", { hasText: "ハドル" }).first().innerText({ timeout: 2000 }).catch(() => "")).trim();
    }
    const scrollY = await page.evaluate(() => window.scrollY);
    rows.push({
      width, id,
      partner: (await name.innerText()).trim(),
      partnerBottom: Math.round(nameBox.y + nameBox.height),
      huddleBottom: btnBox ? Math.round(btnBox.y + btnBox.height) : null,
      scrollNeeded: Math.max(0, Math.round((btnBox ? btnBox.y + btnBox.height : nameBox.y + nameBox.height) - 900)),
      clicksToHuddle: hasBtn ? clicks : "導線なし（理由を表示）",
      scrollYAfter: scrollY,
      toast,
    });
  }
}
await browser.close();
console.log(JSON.stringify(rows, null, 2));
