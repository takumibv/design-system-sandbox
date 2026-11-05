import Button from "@atlaskit/button/default/button";
import LinkButton from "@atlaskit/button/link";
import { cssMap } from "@atlaskit/css";
import EmptyState from "@atlaskit/empty-state";
import Heading from "@atlaskit/heading";
import HeadphonesIcon from "@atlaskit/icon/core/headphones";
import Link from "@atlaskit/link";
import Lozenge from "@atlaskit/lozenge";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import SectionMessage from "@atlaskit/section-message";
import { WarningIconJa } from "../components/messageIcons";
import { token } from "@atlaskit/tokens";
import { PersonAvatar } from "../components/PersonAvatar";
import { CT_TIME, findMember, longDate, type Member, myWeek, shortDate, type Week } from "../model";
import { linkTo } from "../router";

const styles = cssMap({
	// 1024px 以上では「今週のあなたの CT」と「あなたの今後の予定」を横に並べ、G1〜G3 を同じ画面に収める
	top: {
		display: "grid",
		gap: token("space.200"),
		gridTemplateColumns: "minmax(0, 1fr)",
		"@media (min-width: 64rem)": { gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)" },
	},
	card: {
		borderWidth: token("border.width"),
		borderStyle: "solid",
		borderColor: token("color.border"),
		borderRadius: token("radius.large"),
	},
	// 主役のカードだけ太い枠と強い面で他と区別する（ADS: 大きさと余白・コントラストで階層を作る）
	heroCard: {
		borderWidth: token("border.width.selected"),
		borderStyle: "solid",
		borderColor: token("color.border.brand"),
		borderRadius: token("radius.large"),
	},
	list: { listStyle: "none", margin: token("space.0"), padding: token("space.0") },
	pairGrid: {
		display: "grid",
		gap: token("space.100"),
		gridTemplateColumns: "minmax(0, 1fr)",
		listStyle: "none",
		margin: token("space.0"),
		padding: token("space.0"),
		"@media (min-width: 48rem)": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
	},
	weekGrid: {
		display: "grid",
		gap: token("space.200"),
		gridTemplateColumns: "minmax(0, 1fr)",
		"@media (min-width: 64rem)": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
	},
	rowDivider: {
		borderBlockStartWidth: token("border.width"),
		borderBlockStartStyle: "solid",
		borderBlockStartColor: token("color.border"),
	},
});

type Props = {
	weeks: Week[];
	thisWeekIndex: number;
	members: Member[];
	me: Member | undefined;
	onHuddle: (channel: string) => void;
	onLogin: () => void;
};

const nameOf = (members: Member[], id: number) => findMember(members, id)?.name ?? "（不明なメンバー）";

export function HomePage({ weeks, thisWeekIndex, members, me, onHuddle, onLogin }: Props) {
	const thisWeek = weeks[thisWeekIndex];
	const upcoming = weeks.slice(thisWeekIndex + 1);
	const activeCount = members.filter((m) => m.active).length;

	return (
		<Stack space="space.400">
			<Stack space="space.100">
				<Heading size="large" as="h1">
					今週の CT
				</Heading>
				<Text color="color.text.subtle">
					{longDate(thisWeek.iso)} {CT_TIME} 開始・参加者 {activeCount} 人（<Link {...linkTo("members")}>メンバーを見る</Link>）
				</Text>
			</Stack>

			{activeCount < 2 ? (
				<NotEnoughParticipants activeCount={activeCount} />
			) : (
				<>
					<Box xcss={styles.top}>
						{me ? <MyThisWeek week={thisWeek} weeks={weeks} index={thisWeekIndex} members={members} me={me} onHuddle={onHuddle} /> : <LoginPrompt onLogin={onLogin} />}
						{me && me.active && <MyUpcoming weeks={upcoming} members={members} me={me} />}
					</Box>
					<ThisWeekPairs week={thisWeek} members={members} me={me} onHuddle={onHuddle} />
					<Upcoming weeks={upcoming} members={members} me={me} />
				</>
			)}
		</Stack>
	);
}

// ---------------------------------------------------------------------------
// 主役：今週のあなたの CT
function MyThisWeek({ week, weeks, index, members, me, onHuddle }: { week: Week; weeks: Week[]; index: number; members: Member[]; me: Member; onHuddle: (c: string) => void }) {
	const mine = myWeek(week, members, me.id);
	const next = nextPair(weeks, index + 1, members, me.id);
	const nextText = next ? `次の CT は ${shortDate(next.week.iso)}、${next.partner.name}さんとです。` : "";

	let body: React.ReactNode;
	if (mine.kind === "pair") {
		body = (
			<Stack space="space.200">
				<Inline space="space.200" alignBlock="center">
					<PersonAvatar member={mine.partner} size="xlarge" decorative />
					<Stack space="space.050">
						<Heading size="xlarge" as="h3">
							{mine.partner.name}さん
						</Heading>
						<Text color="color.text.subtle">{CT_TIME} から</Text>
					</Stack>
				</Inline>
				{mine.huddleChannel ? (
					<Stack space="space.100">
						<Box>
							<Button appearance="primary" iconBefore={HeadphonesIcon} onClick={() => onHuddle(mine.huddleChannel!)}>
								ハドルを始める
							</Button>
						</Box>
						<Text size="small" color="color.text.subtle">
							#{mine.huddleChannel} で始まります。{mine.partner.name}さんも同じチャンネルに入ります。
						</Text>
					</Stack>
				) : (
					<SectionMessage headingLevel="h3" appearance="warning" icon={WarningIconJa} title="ハドルを始められません">
						<Text as="p">
							{mine.missingChannelOf?.id === me.id ? "あなた" : `${mine.missingChannelOf?.name}さん`}の uチャンネルが未設定のため、ここからハドルを始められません。Slack で{mine.partner.name}さんに直接連絡してください。
						</Text>
					</SectionMessage>
				)}
			</Stack>
		);
	} else if (mine.kind === "rest") {
		body = (
			<Stack space="space.100">
				<Heading size="large" as="h3">
					今週はお休みです
				</Heading>
				<Text as="p">参加者が奇数の週は 1 人がお休みになり、毎週入れ替わります。{nextText}</Text>
			</Stack>
		);
	} else if (mine.kind === "holiday") {
		body = (
			<Stack space="space.100">
				<Heading size="large" as="h3">
					今週は CT がありません
				</Heading>
				<Text as="p">
					{shortDate(week.iso)}は{mine.name}のため、組み合わせはありません。{nextText}
				</Text>
			</Stack>
		);
	} else {
		body = (
			<Stack space="space.150">
				<Heading size="large" as="h3">
					今週の組み合わせに入っていません
				</Heading>
				<Text as="p">CT に参加する設定にすると、組み合わせに入ります。</Text>
				<Box>
					<LinkButton {...linkTo("settings")}>自分の設定を開く</LinkButton>
				</Box>
			</Stack>
		);
	}

	return (
		<Box as="section" aria-labelledby="my-week-title" padding="space.300" backgroundColor="elevation.surface.raised" xcss={styles.heroCard}>
			<Stack space="space.200">
				<Heading size="small" as="h2" id="my-week-title">
					今週のあなたの相手
				</Heading>
				{body}
			</Stack>
		</Box>
	);
}

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
	return (
		<Box as="section" aria-labelledby="login-title" padding="space.300" backgroundColor="color.background.discovery" xcss={styles.card}>
			<Stack space="space.150">
				<Heading size="medium" as="h2" id="login-title">
					ログインすると、あなたの相手がここに出ます
				</Heading>
				<Text as="p">Slack でログインすると、今週の相手と今後の予定を探さずに確認でき、ここからハドルを始められます。自分の参加状況も変えられます。</Text>
				<Box>
					<Button appearance="primary" onClick={onLogin}>
						Slack でログイン
					</Button>
				</Box>
			</Stack>
		</Box>
	);
}

// ---------------------------------------------------------------------------
// G3：あなたの今後の予定（1 週 1 行）
function MyUpcoming({ weeks, members, me }: { weeks: Week[]; members: Member[]; me: Member }) {
	const nextRest = weeks.find((w) => !w.holiday && w.rest === me.id);
	return (
		<Box as="section" aria-labelledby="my-upcoming-title" padding="space.300" backgroundColor="elevation.surface" xcss={styles.card}>
			<Stack space="space.150">
				<Heading size="small" as="h2" id="my-upcoming-title">
					あなたの今後の予定
				</Heading>
				<Text size="small" color="color.text.subtle">
					次のお休み：{nextRest ? shortDate(nextRest.iso) : `${weeks.length} 週先まではなし`}
				</Text>
				<Box as="ul" xcss={styles.list}>
					{weeks.map((w, i) => {
						const mine = myWeek(w, members, me.id);
						return (
							<Box as="li" key={w.iso} paddingBlock="space.100" xcss={i > 0 ? styles.rowDivider : undefined}>
								<Inline space="space.150" alignBlock="center" shouldWrap>
									<Box>
										<Text weight="medium">{shortDate(w.iso)}</Text>
									</Box>
									<WeekLozenge offset={i + 1} holiday={!!w.holiday} />
									{mine.kind === "pair" ? (
										<Inline space="space.075" alignBlock="center">
											<PersonAvatar member={mine.partner} size="small" decorative />
											<Text>{mine.partner.name}さん</Text>
										</Inline>
									) : mine.kind === "rest" ? (
										<Text weight="bold">お休み</Text>
									) : mine.kind === "holiday" ? (
										<Text color="color.text.subtle">CT なし（{mine.name}）</Text>
									) : (
										<Text color="color.text.subtle">組み合わせなし</Text>
									)}
								</Inline>
							</Box>
						);
					})}
				</Box>
			</Stack>
		</Box>
	);
}

// 今週＝0、来週＝1、それ以降＝予定
function WeekLozenge({ offset, holiday }: { offset: number; holiday?: boolean }) {
	if (holiday) return <Lozenge appearance="default">CT なし</Lozenge>;
	if (offset === 0) return <Lozenge appearance="success">今週</Lozenge>;
	return <Lozenge appearance="inprogress">{offset === 1 ? "来週・予定" : "予定"}</Lozenge>;
}

// ---------------------------------------------------------------------------
// 全員の組み合わせ（今週）
function PairCard({ pair, members, me, onHuddle, showHuddle }: { pair: [number, number]; members: Member[]; me: Member | undefined; onHuddle?: (c: string) => void; showHuddle: boolean }) {
	const [a, b] = [...pair].sort((x, y) => x - y).map((id) => findMember(members, id));
	const isMine = !!me && (a?.id === me.id || b?.id === me.id);
	const channel = a?.channel && b?.channel ? a.channel : undefined;
	return (
		<Box as="li" padding="space.150" backgroundColor={isMine ? "color.background.accent.blue.subtlest" : "elevation.surface"} xcss={styles.card}>
			<Stack space="space.100">
				{isMine && (
					<Text size="small" weight="bold" color="color.text.accent.blue">
						あなたのペア
					</Text>
				)}
				<Inline space="space.150" shouldWrap alignBlock="center">
					{[a, b].map((m) =>
						m ? (
							<Inline key={m.id} space="space.075" alignBlock="center">
								<PersonAvatar member={m} size="small" decorative />
								<Text>{m.name}</Text>
							</Inline>
						) : null,
					)}
				</Inline>
				{showHuddle &&
					(channel ? (
						<Box>
							<Button spacing="compact" iconBefore={HeadphonesIcon} onClick={() => onHuddle?.(channel)}>
								#{channel} でハドル
							</Button>
						</Box>
					) : (
						<Text size="small" color="color.text.subtle">
							uチャンネル未設定のメンバーがいるため、ハドルの導線はありません
						</Text>
					))}
			</Stack>
		</Box>
	);
}

function ThisWeekPairs({ week, members, me, onHuddle }: { week: Week; members: Member[]; me: Member | undefined; onHuddle: (c: string) => void }) {
	return (
		<Box as="section" aria-labelledby="all-pairs-title">
			<Stack space="space.150">
				<Inline space="space.100" alignBlock="center">
					<Heading size="medium" as="h2" id="all-pairs-title">
						今週の全ペア
					</Heading>
					<Text color="color.text.subtle">{shortDate(week.iso)}</Text>
				</Inline>
				{week.holiday ? (
					<Text as="p">
						{week.holiday}のため、今週は CT がありません。組み合わせは次の週へ繰り越されます。
					</Text>
				) : (
					<>
						<Box as="ul" xcss={styles.pairGrid}>
							{week.pairs.map((p) => (
								<PairCard key={p.join("-")} pair={p} members={members} me={me} onHuddle={onHuddle} showHuddle />
							))}
						</Box>
						{week.rest ? <Text as="p">お休み：{nameOf(members, week.rest)}{me?.id === week.rest ? "（あなた）" : ""}</Text> : null}
					</>
				)}
			</Stack>
		</Box>
	);
}

// 来週以降（予定）
function Upcoming({ weeks, members, me }: { weeks: Week[]; members: Member[]; me: Member | undefined }) {
	return (
		<Box as="section" aria-labelledby="upcoming-title">
			<Stack space="space.150">
				<Heading size="medium" as="h2" id="upcoming-title">
					今後の予定
				</Heading>
				<Text as="p" color="color.text.subtle">
					来週以降の組み合わせは予定です。参加者が増えたり減ったりすると、その週以降は組み直されます。
				</Text>
				<Box xcss={styles.weekGrid}>
					{weeks.map((w, i) => (
						<Box as="section" key={w.iso} aria-labelledby={`week-${w.iso}`} padding="space.200" backgroundColor="elevation.surface.sunken" xcss={styles.card}>
							<Stack space="space.150">
								<Inline space="space.100" alignBlock="center">
									<Heading size="small" as="h3" id={`week-${w.iso}`}>
										{shortDate(w.iso)}
									</Heading>
									<WeekLozenge offset={i + 1} holiday={!!w.holiday} />
								</Inline>
								{w.holiday ? (
									<Text as="p">
										{w.holiday}のため CT はありません。組み合わせは次の週へ繰り越されます。
									</Text>
								) : (
									<>
										<Box as="ul" xcss={styles.pairGrid}>
											{w.pairs.map((p) => (
												<PairCard key={p.join("-")} pair={p} members={members} me={me} showHuddle={false} />
											))}
										</Box>
										{w.rest ? (
											<Text as="p" size="small">
												お休み：{nameOf(members, w.rest)}
												{me?.id === w.rest ? "（あなた）" : ""}
											</Text>
										) : null}
									</>
								)}
							</Stack>
						</Box>
					))}
				</Box>
			</Stack>
		</Box>
	);
}

function NotEnoughParticipants({ activeCount }: { activeCount: number }) {
	return (
		<EmptyState
			header="今週の組み合わせはありません"
			headingLevel={2}
			description={`CT の参加者が ${activeCount} 人のため、組み合わせを作れません。参加者が 2 人以上になると、その週から組み合わせが作られます。`}
			primaryAction={<LinkButton appearance="primary" {...linkTo("members")}>メンバーを見る</LinkButton>}
		/>
	);
}

function nextPair(weeks: Week[], from: number, members: Member[], userId: number) {
	for (let i = from; i < weeks.length; i++) {
		const m = myWeek(weeks[i], members, userId);
		if (m.kind === "pair") return { week: weeks[i], partner: m.partner };
	}
	return undefined;
}
