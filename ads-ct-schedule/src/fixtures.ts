export type Member = {
	id: number;
	name: string;
	kana: string;
	channel?: string;
	active: boolean;
	color: string;
	image?: string;
	incomplete?: boolean;
};
export const members: Member[] = [
	{
		id: 1,
		name: "佐藤 美咲",
		kana: "misaki",
		channel: "u-misaki",
		active: true,
		color: "blue",
	},
	{
		id: 2,
		name: "高橋 健太",
		kana: "kenta",
		channel: "u-kenta",
		active: true,
		color: "green",
	},
	{
		id: 3,
		name: "田中 遥",
		kana: "haruka",
		channel: "u-haruka",
		active: true,
		color: "purple",
	},
	{
		id: 4,
		name: "鈴木 翔太",
		kana: "shota",
		channel: "u-shota",
		active: true,
		color: "orange",
	},
	{
		id: 5,
		name: "伊藤 葵",
		kana: "aoi",
		channel: "u-aoi",
		active: true,
		color: "blue",
	},
	{
		id: 6,
		name: "渡辺 直樹",
		kana: "naoki",
		channel: "u-naoki",
		active: true,
		color: "green",
	},
	{
		id: 7,
		name: "小林 結衣",
		kana: "yui",
		channel: "u-yui",
		active: true,
		color: "purple",
	},
	{
		id: 8,
		name: "山本 蓮",
		kana: "ren",
		channel: "u-ren",
		active: true,
		color: "orange",
	},
	{
		id: 9,
		name: "中村 彩",
		kana: "aya",
		channel: "u-aya",
		active: true,
		color: "blue",
	},
	{
		id: 10,
		name: "加藤 大輔",
		kana: "daisuke",
		channel: "u-daisuke",
		active: false,
		color: "green",
	},
	{
		id: 11,
		name: "吉田 真央",
		kana: "mao",
		active: false,
		color: "purple",
		incomplete: true,
	},
];
export const weeks = [
	{
		date: "2026年10月5日",
		short: "10月5日",
		label: "今週",
		pairs: [
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
		],
		rest: 9,
	},
	{
		date: "2026年10月12日",
		short: "10月12日",
		label: "来週",
		pairs: [],
		rest: 0,
		holiday: "スポーツの日",
	},
	{
		date: "2026年10月19日",
		short: "10月19日",
		label: "予定",
		pairs: [
			[1, 4],
			[2, 6],
			[3, 8],
			[7, 9],
		],
		rest: 5,
	},
	{
		date: "2026年10月26日",
		short: "10月26日",
		label: "予定",
		pairs: [
			[1, 6],
			[3, 9],
			[4, 8],
			[5, 7],
		],
		rest: 2,
	},
	{
		date: "2026年11月2日",
		short: "11月2日",
		label: "予定",
		pairs: [
			[1, 8],
			[2, 7],
			[3, 5],
			[4, 9],
		],
		rest: 6,
	},
];
export const person = (id: number) => {
	const member = members.find((member) => member.id === id);
	if (!member) throw new Error(`Unknown member: ${id}`);
	return member;
};
