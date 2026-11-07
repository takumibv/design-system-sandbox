// 補助の撮影スクリプト（自作）。brief/scripts/capture.mjs と同じ states.json を使う。
// ADS の Layout（@atlaskit/navigation-system）は main の中でスクロールするため、
// capture.mjs の fullPage では 900px より下が写らない。ここでは viewport の高さを内容に合わせて全体を撮る。
// axe と横はみ出しの検査は capture.mjs の結果（screenshots/report.json）を正とする。
// 使い方: APP_URL=http://localhost:5173 NODE_PATH=$(npm root -g) node scripts/capture-full.mjs states.json
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const states = JSON.parse(readFileSync(process.argv[2] ?? "states.json", "utf8"));
mkdirSync("screenshots/full", { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 390]) {
	const context = await browser.newContext({ viewport: { width, height: 900 }, locale: "ja-JP", timezoneId: "Asia/Tokyo", reducedMotion: "reduce" });
	const page = await context.newPage();
	for (const { id, path } of states) {
		await page.setViewportSize({ width, height: 900 });
		await page.goto(`${APP}${path}`, { waitUntil: "networkidle" });
		await page.waitForTimeout(600);
		const h = await page.evaluate(() =>
			Math.max(document.documentElement.scrollHeight, ...[...document.querySelectorAll("[data-layout-slot]")].map((e) => e.scrollHeight + e.getBoundingClientRect().top)),
		);
		await page.setViewportSize({ width, height: Math.min(Math.max(900, Math.ceil(h)), 8000) });
		await page.waitForTimeout(200);
		await page.screenshot({ path: `screenshots/full/${id}-${width}.png` });
	}
	await context.close();
}
await browser.close();
console.log("done", states.length * 2);
