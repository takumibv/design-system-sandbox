// 目標評価のための計測（G1〜G6）。ビューポート 1440×900 と 390×900（capture.mjs と同じ）。
// 使い方: NODE_PATH=$(npm root -g) APP_URL=http://localhost:4173 node scripts/measure.cjs > docs/measurements.json
const { chromium } = require("playwright");
const APP = process.env.APP_URL ?? "http://localhost:4173";
const H = 900;

const box = async (locator) => {
	const b = await locator.first().boundingBox();
	return b && { top: Math.round(b.y), bottom: Math.round(b.y + b.height) };
};
const scrollNeeded = (b) => (b ? Math.max(0, b.bottom - H) : null);

// Tab を何回押すとその要素にフォーカスが届くか（最大 60 回）
async function tabsTo(page, locator) {
	const target = await locator.first().elementHandle();
	await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
	for (let i = 1; i <= 60; i++) {
		await page.keyboard.press("Tab");
		if (await page.evaluate((el) => document.activeElement === el, target)) return i;
	}
	return null;
}

(async () => {
	const browser = await chromium.launch();
	const out = [];
	for (const width of [1440, 390]) {
		const ctx = await browser.newContext({ viewport: { width, height: H }, locale: "ja-JP", reducedMotion: "reduce" });
		const page = await ctx.newPage();
		const go = async (path) => {
			await page.goto(APP + path, { waitUntil: "networkidle" });
			await page.waitForTimeout(300);
		};
		const r = { width };

		// G1・G2：ログイン中（S01）
		await go("/?state=S01");
		const partner = page.getByRole("heading", { name: "高橋 健太さん" });
		const huddle = page.getByRole("button", { name: "ハドルを始める" });
		r.S01 = {
			partnerName: await box(partner),
			huddleButton: await box(huddle),
			scrollToPartner: scrollNeeded(await box(partner)),
			scrollToHuddle: scrollNeeded(await box(huddle)),
			pageHeight: await page.evaluate(() => document.documentElement.scrollHeight),
			tabsToHuddle: await tabsTo(page, huddle),
		};
		await huddle.first().click();
		await page.waitForTimeout(400);
		r.S01.clicksToStartHuddle = 1;
		r.S01.huddleFeedbackShown = await page.getByText("#u-misaki でハドルを始めます（デモ）").isVisible();

		// G3：今後の予定（ログイン中）
		await go("/?state=S01");
		const upcoming = page.getByRole("heading", { name: "あなたの今後の予定" });
		const lastRow = page.getByText("山本 蓮さん");
		r.G3 = { upcomingHeading: await box(upcoming), lastUpcomingRow: await box(lastRow), scrollToSeeAllUpcoming: scrollNeeded(await box(lastRow)) };

		// 未ログインから（S02）：ログイン → 相手の確認
		await go("/?state=S02");
		const loginInCard = page.getByRole("button", { name: "Slack でログイン" }).last();
		r.S02 = { loginButton: await box(loginInCard), scrollToLogin: scrollNeeded(await box(loginInCard)) };
		await loginInCard.click();
		await page.waitForTimeout(300);
		r.S02.afterLoginPartnerVisible = await partner.isVisible();
		r.S02.afterLoginHuddle = await box(huddle);
		r.S02.clicksToHuddleFromLoggedOut = 2;

		// S03（お休み）・S09（相手の uチャンネル未設定）：主役のカードに理由と次の行動が入るか
		await go("/?state=S03");
		const rest = page.getByRole("heading", { name: "今週はお休みです" });
		r.S03 = { restHeading: await box(rest), nextCtText: await page.getByText("次の CT は 10月19日（月）、小林 結衣さんとです。").isVisible() };
		await go("/?state=S09");
		const warn = page.getByRole("heading", { name: "ハドルを始められません" });
		r.S09 = { warningHeading: await box(warn), scrollToWarning: scrollNeeded(await box(warn)) };

		// G4：メンバー削除（組み合わせ画面から）
		await go("/?state=S01");
		let clicks = 0;
		await page.getByRole("link", { name: "メンバー" }).first().click();
		clicks++;
		await page.waitForTimeout(300);
		const del = page.getByRole("button", { name: "加藤 大輔さんを削除" });
		r.G4 = { deleteButton: await box(del), scrollToDelete: scrollNeeded(await box(del)) };
		await del.click();
		clicks++;
		await page.waitForTimeout(400);
		r.G4.dialogTitle = await page.getByRole("dialog").getByRole("heading").first().innerText();
		await page.getByRole("button", { name: "削除する" }).click();
		clicks++;
		await page.waitForTimeout(400);
		r.G4.clicks = clicks;
		r.G4.successFlag = await page.getByText("加藤 大輔さんを削除しました").isVisible();

		// G5：参加をやめる（組み合わせ画面から）
		await go("/?state=S01");
		clicks = 0;
		await page.getByRole("link", { name: "自分の設定" }).first().click();
		clicks++;
		await page.waitForTimeout(300);
		await page.getByLabel("CT に参加する").click({ force: true });
		clicks++;
		r.G5 = { warningShownBeforeSave: await page.getByRole("heading", { name: "保存すると組み合わせが組み直されます" }).isVisible() };
		const save = page.getByRole("button", { name: "保存する" });
		r.G5.saveButton = await box(save);
		r.G5.scrollToSave = scrollNeeded(await box(save));
		await save.click();
		clicks++;
		await page.waitForTimeout(800);
		r.G5.clicks = clicks;
		r.G5.backOnHome = new URL(page.url()).pathname === "/";
		r.G5.successFlag = await page.getByText("設定を保存しました").isVisible();
		r.G5.heroAfterLeaving = await page.getByRole("heading", { name: "今週の組み合わせに入っていません" }).isVisible();

		// G6：初回設定（S15）→ 今週の相手が見えるまで
		await go("/settings?state=S15");
		let ops = 0;
		await page.getByLabel("社員番号").fill("1011");
		ops++;
		await page.getByLabel("uチャンネル").fill("u-mao");
		await page.keyboard.press("Enter");
		ops++;
		const done = page.getByRole("button", { name: "設定を完了する" });
		r.G6 = { submitButton: await box(done), scrollToSubmit: scrollNeeded(await box(done)) };
		await done.click();
		ops++;
		await page.waitForTimeout(800);
		r.G6.inputs = ops;
		r.G6.backOnHome = new URL(page.url()).pathname === "/";
		r.G6.successFlag = await page.getByText("設定を保存しました").isVisible();
		r.G6.heroHeading = await page.locator("#my-week-title").isVisible();

		out.push(r);
		await ctx.close();
	}
	await browser.close();
	console.log(JSON.stringify(out, null, 2));
})();
