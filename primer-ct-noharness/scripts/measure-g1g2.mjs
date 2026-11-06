// G1・G2 の計測：相手の名前が見えるまで／ハドル開始までの操作回数・スクロール量・Tab 回数。
// 使い方: NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs （vite preview を 5173 で起動しておく）
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const browser = await chromium.launch();
const out = [];
for (const width of [1440, 390]) {
	for (const [label, path, needsLogin] of [
		["ログイン済み（S01）", "/?state=S01", false],
		["未ログインで来た（S02）", "/?state=S02", true],
		["相手の uチャンネル未設定（S09）", "/?state=S09", false],
	]) {
		const ctx = await browser.newContext({ viewport: { width, height: 900 }, locale: "ja-JP" });
		const page = await ctx.newPage();
		await page.goto(APP + path, { waitUntil: "networkidle" });
		let clicks = 0;
		if (needsLogin) {
			await page.getByRole("button", { name: "Slack でログイン" }).last().click();
			clicks++;
		}
		const name = page.getByRole("heading", { level: 2, name: /あなたの今週の相手/ });
		const nameBox = await name.boundingBox();
		const huddle = page.getByRole("button", { name: "ハドルを始める" });
		const hasHuddle = (await huddle.count()) > 0;
		const huddleBox = hasHuddle ? await huddle.boundingBox() : null;
		// Tab 回数：ページ先頭からハドルボタンにフォーカスが届くまで
		let tabs = null;
		if (hasHuddle) {
			await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
			await page.mouse.click(1, 1);
			for (let i = 1; i <= 40; i++) {
				await page.keyboard.press("Tab");
				const t = await page.evaluate(() => document.activeElement?.textContent?.trim());
				if (t === "ハドルを始める") { tabs = i; break; }
			}
		}
		if (hasHuddle) { await huddle.click(); clicks++; }
		const notice = hasHuddle ? await page.getByText(/でハドルを始めます/).first().textContent() : null;
		out.push({
			width, label,
			partnerNameBottomPx: nameBox && Math.round(nameBox.y + nameBox.height),
			partnerVisibleWithoutScroll: !!nameBox && nameBox.y + nameBox.height <= 900,
			huddleButtonBottomPx: huddleBox && Math.round(huddleBox.y + huddleBox.height),
			huddleVisibleWithoutScroll: !!huddleBox && huddleBox.y + huddleBox.height <= 900,
			scrollNeededPx: huddleBox ? Math.max(0, Math.round(huddleBox.y + huddleBox.height - 900)) : null,
			clicksToStartHuddle: hasHuddle ? clicks : null,
			tabsToHuddleButton: tabs,
			resultNotice: notice,
		});
		await ctx.close();
	}
}
await browser.close();
writeFileSync("screenshots/g1g2-measure.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
