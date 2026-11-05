// 原本 (DADS版 Storybook) と Ant Design 版を同じ状態・同じ幅で撮影し、axe と横はみ出しを検査する。
// ads-ct-schedule/scripts/screenshots.mjs を流用し、次の 2 点を足した。
//   1. ORIGINAL_URL を指定しないときは原本を撮らず、ADS 版の検証で撮った原本画像を流用する
//      （原本リポジトリは ADS 版の撮影時から更新されていない：c6ee7a6、2026-10-10）
//   2. ブラウザのコンソールに出た antd の警告（非推奨 API など）を記録する
// 使い方: [ORIGINAL_URL=http://localhost:6008] ANTD_URL=http://localhost:6011 node scripts/screenshots.mjs
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import AxeBuilder from "@axe-core/playwright";

// 環境にプリインストールされた playwright を使う（NODE_PATH=$(npm root -g) で解決）
const { chromium } = createRequire(import.meta.url)("playwright");

const ORIGINAL = process.env.ORIGINAL_URL;
const ANTD = process.env.ANTD_URL ?? "http://localhost:6011";
// [ファイル名, 原本 Story ID, Ant Design 版クエリ]
const cases = [
	["schedule-default", "pages-ct組み合わせ表--default", ""],
	["schedule-guest", "pages-ct組み合わせ表--guest", "signedIn=0"],
	["schedule-rest", "pages-ct組み合わせ表--rest", "state=rest"],
	["schedule-holiday", "pages-ct組み合わせ表--holiday", "state=holiday"],
	["schedule-insufficient", "pages-ct組み合わせ表--insufficient", "state=insufficient"],
	["schedule-loading", "pages-ct組み合わせ表--loading", "state=loading"],
	["schedule-login-error", "pages-ct組み合わせ表--login-error", "state=loginError&signedIn=0"],
	["schedule-saved", "pages-ct組み合わせ表--saved", "state=saveSuccess"],
	["members-default", "pages-メンバー一覧--default", "screen=members"],
	["members-empty", "pages-メンバー一覧--empty", "screen=members&state=empty&signedIn=0"],
	["members-delete-confirm", "pages-メンバー一覧--delete-confirm", "screen=members&dialog=1"],
	["members-delete-error", "pages-メンバー一覧--delete-error", "screen=members&state=deleteError"],
	["settings-default", "pages-自分の設定--default", "screen=settings"],
	["settings-onboarding", "pages-自分の設定--onboarding", "screen=onboarding"],
	["settings-validation", "pages-自分の設定--validation", "screen=onboarding&state=validation"],
	["not-found", "pages-存在しないページ--default", "screen=notFound"],
];
const widths = [1440, 390];
mkdirSync("screenshots/original", { recursive: true });
mkdirSync("screenshots/antd", { recursive: true });

const browser = await chromium.launch();
const report = [];
const consoleMessages = new Set();
for (const width of widths) {
	const context = await browser.newContext({
		viewport: { width, height: 900 },
		locale: "ja-JP",
		timezoneId: "Asia/Tokyo",
		reducedMotion: "reduce",
	});
	const page = await context.newPage();
	page.on("console", (m) => {
		if (m.type() === "warning" || m.type() === "error") consoleMessages.add(`[${m.type()}] ${m.text()}`);
	});
	for (const [file, story, query] of cases) {
		const targets = [["antd", `${ANTD}/?${query}`]];
		if (ORIGINAL)
			targets.unshift(["original", `${ORIGINAL}/iframe.html?id=${encodeURIComponent(story)}&viewMode=story`]);
		else {
			const src = `../ads-ct-schedule/screenshots/original/${file}-${width}.png`;
			if (existsSync(src)) copyFileSync(src, `screenshots/original/${file}-${width}.png`);
		}
		for (const [kind, url] of targets) {
			await page.goto(url, { waitUntil: "networkidle" });
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(800);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
			);
			const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
			await page.screenshot({ path: `screenshots/${kind}/${file}-${width}.png`, fullPage: true });
			report.push({
				kind,
				file,
				width,
				overflow,
				violations: axe.violations.map((v) => `${v.id}(${v.nodes.length})`),
				details: axe.violations.map((v) => ({
					id: v.id,
					help: v.help,
					targets: v.nodes.slice(0, 5).map((n) => `${n.target.join(" ")} :: ${n.failureSummary?.split("\n")[1] ?? ""}`),
				})),
			});
		}
	}
	await context.close();
}
await browser.close();
writeFileSync("screenshots/report.json", JSON.stringify(report, null, 2));
writeFileSync("screenshots/console.txt", [...consoleMessages].join("\n") + "\n");
for (const r of report)
	console.log(r.kind.padEnd(8), r.file.padEnd(24), r.width, "overflow", r.overflow, r.violations.join(" "));
console.log(`console warnings/errors: ${consoleMessages.size}`);
