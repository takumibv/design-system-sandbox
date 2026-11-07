// 社内ブログ投稿計画ブリーフ用の固定データ（架空）。画面の見本ではなく、データだけを提供する。
// 今日は 2026-11-09（月）とする。ログイン中の自分は id=1（一般メンバー）。編集担当は id=2。

export type Role = "member" | "editor";
export type Status = "idea" | "writing" | "review" | "published" | "cancelled";

export type Member = {
	id: number;
	name: string;
	role: Role;
	color: "blue" | "green" | "purple" | "orange";
};

export type Post = {
	id: number;
	title: string; // 仮タイトルを含む
	category: "技術" | "デザイン" | "チーム・文化" | "イベント報告";
	authorIds: number[]; // 書く人（共著あり）
	plannedDate: string | null; // 公開予定日（未定なら null）
	publishedDate?: string; // 公開した日
	status: Status;
	url?: string; // 公開後の記事 URL
	note?: string;
};

export const today = "2026-11-09";

export const members: Member[] = [
	{ id: 1, name: "佐藤 美咲", role: "member", color: "blue" },
	{ id: 2, name: "高橋 健太", role: "editor", color: "green" },
	{ id: 3, name: "田中 遥", role: "member", color: "purple" },
	{ id: 4, name: "鈴木 翔太", role: "member", color: "orange" },
	{ id: 5, name: "伊藤 葵", role: "member", color: "blue" },
	{ id: 6, name: "渡辺 直樹", role: "member", color: "green" },
	{ id: 7, name: "小林 結衣", role: "member", color: "purple" },
	{ id: 8, name: "山本 蓮", role: "member", color: "orange" },
	{ id: 9, name: "中村 彩", role: "member", color: "blue" },
	{ id: 10, name: "加藤 大輔", role: "member", color: "green" },
];

export const posts: Post[] = [
	// 公開済み（過去）
	{ id: 1, title: "React Server Components を社内ツールに入れてみた", category: "技術", authorIds: [3], plannedDate: "2026-10-05", publishedDate: "2026-10-05", status: "published", url: "https://example.com/blog/1" },
	{ id: 2, title: "デザインレビューの進め方を変えた話", category: "デザイン", authorIds: [5], plannedDate: "2026-10-12", publishedDate: "2026-10-14", status: "published", url: "https://example.com/blog/2" },
	{ id: 3, title: "新メンバー受け入れの 1 か月", category: "チーム・文化", authorIds: [1, 7], plannedDate: "2026-10-19", publishedDate: "2026-10-19", status: "published", url: "https://example.com/blog/3" },
	{ id: 4, title: "社内勉強会レポート（10月）", category: "イベント報告", authorIds: [3], plannedDate: "2026-10-26", publishedDate: "2026-10-27", status: "published", url: "https://example.com/blog/4" },
	{ id: 5, title: "Figma の変数でテーマを管理する", category: "デザイン", authorIds: [5], plannedDate: "2026-11-02", publishedDate: "2026-11-02", status: "published", url: "https://example.com/blog/5" },
	// 遅れ（予定日を過ぎたが未公開）
	{ id: 6, title: "テストの書き方ガイドライン（仮）", category: "技術", authorIds: [4], plannedDate: "2026-11-05", status: "writing", note: "下書きは半分くらい" },
	// 近い予定
	{ id: 7, title: "アクセシビリティ改善の振り返り", category: "技術", authorIds: [1], plannedDate: "2026-11-12", status: "review" },
	{ id: 8, title: "オフィス移転で変えたこと", category: "チーム・文化", authorIds: [6], plannedDate: "2026-11-13", status: "writing" },
	{ id: 9, title: "デザインシステムの運用 1 年", category: "デザイン", authorIds: [5, 2], plannedDate: "2026-11-19", status: "writing" },
	// 先の予定
	{ id: 10, title: "社内勉強会レポート（11月）", category: "イベント報告", authorIds: [3], plannedDate: "2026-11-30", status: "idea" },
	{ id: 11, title: "Rust でCLIツールを作った", category: "技術", authorIds: [8], plannedDate: "2026-12-07", status: "idea" },
	{ id: 12, title: "1on1 で大事にしていること", category: "チーム・文化", authorIds: [2], plannedDate: "2026-12-14", status: "idea" },
	// 日付未定のアイデア
	{ id: 13, title: "（仮）採用面接の裏側", category: "チーム・文化", authorIds: [7], plannedDate: null, status: "idea" },
	{ id: 14, title: "（仮）型安全な API クライアント", category: "技術", authorIds: [1], plannedDate: null, status: "idea" },
	// 取りやめ
	{ id: 15, title: "年末イベントの告知", category: "イベント報告", authorIds: [9], plannedDate: "2026-11-23", status: "cancelled", note: "イベント自体が延期" },
];
// 補足：id=9（中村 彩、取りやめのみ）と id=10（加藤 大輔）は、今のところ書く予定のある投稿が無い。
