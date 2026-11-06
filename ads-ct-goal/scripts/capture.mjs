// 各状態を 1440px / 390px で撮影し、axe（WCAG 2.1 AA）と横はみ出しを検査する共通スクリプト。
// 使い方: APP_URL=http://localhost:5173 node scripts/capture.mjs states.json
// states.json の例: [{ "id": "S01", "path": "/?state=ready" }, ...]
// Playwright はプリインストール版を使う: NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json
// @axe-core/playwright はプロジェクトの devDependencies に入れる。
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import AxeBuilder from "@axe-core/playwright";

const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const states = JSON.parse(readFileSync(process.argv[2] ?? "states.json", "utf8"));
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const report = [];
for (const width of [1440, 390]) {
	const context = await browser.newContext({ viewport: { width, height: 900 }, locale: "ja-JP", timezoneId: "Asia/Tokyo", reducedMotion: "reduce" });
	const page = await context.newPage();
	for (const { id, path } of states) {
		await page.goto(`${APP}${path}`, { waitUntil: "networkidle" });
		await page.evaluate(() => document.fonts.ready);
		await page.waitForTimeout(600);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
		await page.screenshot({ path: `screenshots/${id}-${width}.png`, fullPage: true });
		report.push({ id, width, overflow, violations: axe.violations.map((v) => `${v.id}(${v.nodes.length})`) });
	}
	await context.close();
}
await browser.close();
writeFileSync("screenshots/report.json", JSON.stringify(report, null, 2));
for (const r of report) console.log(r.id, r.width, "overflow", r.overflow, r.violations.join(" ") || "ok");
