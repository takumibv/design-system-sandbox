import { Banner, Button, Details, Heading, Label, Link, Spinner, Stack, Text, VisuallyHidden } from "@primer/react";
import { Blankslate, Card, InlineMessage } from "@primer/react/experimental";
import { CalendarIcon, ChevronDownIcon, PeopleIcon, SignInIcon, UnmuteIcon } from "@primer/octicons-react";
import { useApp } from "../App";
import { Layout } from "../components/Layout";
import { Person, PersonAvatar } from "../components/PersonAvatar";
import { CT_TIME, huddleChannel, isParticipant, myWeek, withWeekday, type Member, type Week } from "../model";

export function SchedulePage() {
	const { load, retryLoad, weeks, thisWeekIndex, members } = useApp();
	const thisWeek = weeks[thisWeekIndex];
	const upcoming = weeks.slice(thisWeekIndex + 1);
	const participants = members.filter(isParticipant).length;

	if (load === "loading") {
		return (
			<Layout title="組み合わせ">
				<Heading as="h1">今週の組み合わせ</Heading>
				<Stack direction="horizontal" align="center" gap="condensed" role="status">
					<Spinner size="small" srText={null} />
					<Text>組み合わせを読み込んでいます…</Text>
				</Stack>
			</Layout>
		);
	}
	if (load === "error") {
		return (
			<Layout title="組み合わせ">
				<Heading as="h1">今週の組み合わせ</Heading>
				<Banner
					variant="critical"
					title="組み合わせを読み込めませんでした"
					description="通信が不安定な可能性があります。もう一度読み込んでください。続く場合は、毎週月曜 11:00 に Slack チャンネルへ届く投稿でも今週のペアを確かめられます。"
					primaryAction={<Banner.PrimaryAction onClick={retryLoad}>もう一度読み込む</Banner.PrimaryAction>}
				/>
			</Layout>
		);
	}

	return (
		<Layout title="組み合わせ" pane={<UpcomingWeeks weeks={upcoming} />}>
			<Stack gap="condensed">
				<Heading as="h1">{thisWeek.holiday ? "今週の CT" : "今週の組み合わせ"}</Heading>
				<Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
					<Text>
						<CalendarIcon /> {withWeekday(thisWeek.date)} {thisWeek.holiday ? `は CT なし（${thisWeek.holiday}）` : `${CT_TIME} 開始`}
					</Text>
					<Text>
						<PeopleIcon /> 参加者 {participants} 人（<InternalLink to="/members">メンバーを見る</InternalLink>）
					</Text>
				</Stack>
			</Stack>
			{participants < 2 ? (
				<FewParticipants participants={participants} />
			) : (
				<>
					<MyThisWeek week={thisWeek} next={upcoming.find((w) => !w.holiday && w.pairs.length > 0)} />
					{!thisWeek.holiday && <AllPairs week={thisWeek} withHuddle headingLevel="h2" />}
				</>
			)}
		</Layout>
	);
}

/** 画面内の移動用リンク（再読み込みせずに画面を切り替える） */
export function InternalLink({ to, children }: { to: string; children: React.ReactNode }) {
	const { navigate } = useApp();
	return (
		<Link
			href={to}
			onClick={(e: React.MouseEvent) => {
				e.preventDefault();
				navigate(to);
			}}
		>
			{children}
		</Link>
	);
}

function startHuddle(notify: ReturnType<typeof useApp>["notify"], channel: string, names: string) {
	notify({
		variant: "info",
		title: `（デモ）#${channel} でハドルを始めます`,
		description: `実際のサービスでは Slack の #${channel} が開き、${names} のハドルが始まります。`,
	});
}

/** G1・G2：自分の今週の相手と、ハドルを始める主ボタン */
function MyThisWeek({ week, next }: { week: Week; next?: Week }) {
	const { user, userId, find, notify, login, navigate } = useApp();

	if (!user || userId == null) {
		return (
			<Card padding="normal">
				<Stack gap="condensed" align="start">
					<Heading as="h2" variant="small">
						ログインすると、あなたの今週の相手がここに出ます
					</Heading>
					<Text as="p">
						Slack でログインすると、相手を探さずに確かめられ、ボタン 1 つでハドルを始められます。休職などで参加をやめる・戻るときの設定や、退職した人の削除もできます。
					</Text>
					<Button variant="primary" leadingVisual={SignInIcon} onClick={login}>
						Slack でログイン
					</Button>
				</Stack>
			</Card>
		);
	}

	if (user.incomplete || !user.active) {
		return (
			<Card padding="normal">
				<Stack gap="condensed" align="start">
					<Heading as="h2" variant="small">
						あなたは今、組み合わせに入っていません
					</Heading>
					<Text as="p">
						{user.incomplete
							? "初回設定（社員番号と uチャンネル）が終わると、組み合わせに入ります。"
							: "「CT に参加する」が外れています。参加に戻すと、全員の組み合わせが組み直されます。"}
					</Text>
					<Button variant="primary" onClick={() => navigate(user.incomplete ? "/setup" : "/settings")}>
						{user.incomplete ? "初回設定をする" : "参加の設定を変える"}
					</Button>
				</Stack>
			</Card>
		);
	}

	const mine = myWeek(week, userId, find);
	const nextMine = next ? myWeek(next, userId, find) : undefined;
	const nextLine =
		next && nextMine?.kind === "pair"
			? `次の CT は ${withWeekday(next.short)} ${CT_TIME} からで、相手は ${nextMine.partner.name} さんです（予定）。`
			: next && nextMine?.kind === "rest"
				? `次の ${withWeekday(next.short)} もお休みの予定です。`
				: "";

	if (mine.kind === "holiday") {
		return (
			<Card padding="normal">
				<Stack gap="condensed">
					<Text size="small" className="muted">
						あなたの今週の予定
					</Text>
					<Heading as="h2" variant="medium">
						今週は CT がありません（{mine.name}）
					</Heading>
					<Text as="p">
						{withWeekday(week.short)}は{mine.name}のため、組み合わせを作らず次の週へ繰り越します。{nextLine}
					</Text>
				</Stack>
			</Card>
		);
	}
	if (mine.kind === "rest") {
		return (
			<Card padding="normal">
				<Stack gap="condensed">
					<Text size="small" className="muted">
						あなたの今週の予定
					</Text>
					<Heading as="h2" variant="medium">
						今週、あなたはお休みです
					</Heading>
					<Text as="p">参加者が奇数のため、毎週 1 人がお休みになります（順番に入れ替わります）。{nextLine}</Text>
				</Stack>
			</Card>
		);
	}
	if (mine.kind !== "pair") return null;

	const { partner, channel, missingChannelOf } = mine;
	return (
		<Card padding="normal">
			<Stack gap="normal" align="start">
				<Stack gap="condensed">
					<Text size="small" className="muted" aria-hidden="true">
						あなたの今週の相手
					</Text>
					<Stack direction="horizontal" align="center" gap="condensed">
						<PersonAvatar member={partner} size={48} />
						<Heading as="h2" variant="large">
							<VisuallyHidden>あなたの今週の相手：</VisuallyHidden>
							{partner.name} さん
						</Heading>
					</Stack>
					<Text>
						{withWeekday(week.short)} {CT_TIME} から
					</Text>
				</Stack>
				{channel ? (
					<Stack gap="condensed" align="start">
						<Button
							variant="primary"
							size="large"
							leadingVisual={UnmuteIcon}
							onClick={() => startHuddle(notify, channel, `あなたと ${partner.name} さん`)}
						>
							ハドルを始める
						</Button>
						<Text size="small" className="muted">
							#{channel} で始めます。ペアのうち社員番号が若い人の uチャンネルに、2 人とも集まります。
						</Text>
					</Stack>
				) : (
					<InlineMessage variant="warning">
						{missingChannelOf?.name} さんの uチャンネルが未設定のため、ここからハドルを始められません。Slack で {partner.name}{" "}
						さんに直接声をかけてください。
					</InlineMessage>
				)}
			</Stack>
		</Card>
	);
}

/** 全員のペア（G1 の補助。自分のペアを強調） */
function AllPairs({ week, withHuddle, headingLevel }: { week: Week; withHuddle: boolean; headingLevel: "h2" | "h3" }) {
	const { find, userId, notify } = useApp();
	const rest = week.rest ? find(week.rest) : undefined;
	return (
		<Stack gap="condensed">
			{withHuddle && (
				<Heading as={headingLevel} variant="small">
					全員のペア（{week.pairs.length} 組）
				</Heading>
			)}
			<ul className="plainList pairRows">
				{week.pairs.map(([a, b]) => {
					const left = find(a) as Member;
					const right = find(b) as Member;
					const mine = userId === a || userId === b;
					const channel = huddleChannel(left, right);
					return (
						<li key={`${a}-${b}`} className="pairRow" data-mine={mine}>
							<Stack direction="horizontal" align="center" justify="space-between" wrap="wrap" gap="condensed">
								<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
									<Person member={left} />
									<Text className="muted">と</Text>
									<Person member={right} />
									{mine && <Label variant="accent">あなたのペア</Label>}
								</Stack>
								{withHuddle &&
									(channel ? (
										<Button
											size="small"
											leadingVisual={UnmuteIcon}
											aria-label={`${left.name} さんと ${right.name} さんのハドルを #${channel} で始める`}
											onClick={() => startHuddle(notify, channel, `${left.name} さんと ${right.name} さん`)}
										>
											#{channel}
										</Button>
									) : (
										<Text size="small" className="muted">
											uチャンネル未設定のためハドルの導線なし
										</Text>
									))}
							</Stack>
						</li>
					);
				})}
			</ul>
			{rest && (
				<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
					<Text>お休み：</Text>
					<Person member={rest} />
					{rest.id === userId && <Label variant="accent">あなた</Label>}
				</Stack>
			)}
		</Stack>
	);
}

/** S05：参加者が 2 人未満 */
function FewParticipants({ participants }: { participants: number }) {
	const { navigate } = useApp();
	return (
		<Blankslate border>
			<Blankslate.Visual>
				<PeopleIcon size={24} />
			</Blankslate.Visual>
			<Blankslate.Heading as="h2">今週の組み合わせはありません</Blankslate.Heading>
			<Blankslate.Description>
				参加している人が {participants} 人のため、ペアを作れません。参加する人が 2 人以上になると、その週から組み合わせが作られます。
			</Blankslate.Description>
			<Blankslate.PrimaryAction onClick={() => navigate("/members")}>メンバーの参加状況を見る</Blankslate.PrimaryAction>
		</Blankslate>
	);
}

/** G3：これからの予定（右の欄） */
function UpcomingWeeks({ weeks }: { weeks: Week[] }) {
	const { user, userId, find } = useApp();
	const participating = user && !user.incomplete && user.active && userId != null;
	const lastWeek = weeks[weeks.length - 1];
	const nextRest = participating ? weeks.find((w) => w.rest === userId) : undefined;
	const anyPairs = weeks.some((w) => w.pairs.length > 0);

	return (
		<Stack gap="normal">
			<Stack gap="condensed">
				<Heading as="h2" variant="small">
					これからの予定
				</Heading>
				<Text size="small" className="muted">
					先の週の組み合わせは予定です。参加する人が増えたり減ったりすると、その週から組み直されます。
					{lastWeek && `${withWeekday(lastWeek.short)}までを表示しています。`}
				</Text>
				{participating && lastWeek && anyPairs && (
					<Text>
						<Text weight="semibold">あなたの次のお休み：</Text>
						{nextRest ? withWeekday(nextRest.short) : `${withWeekday(lastWeek.short)}までは予定なし`}
					</Text>
				)}
			</Stack>
			{weeks.length === 0 && <Text className="muted">表示できる先の週はありません。</Text>}
			<Stack as="ul" className="plainList" gap="normal">
					{weeks.map((week) => {
						const mine = participating ? myWeek(week, userId, find) : undefined;
						return (
							<li key={week.date}>
								<Card padding="condensed">
									<Stack gap="condensed">
										<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
											<Heading as="h3" variant="small">
												{withWeekday(week.short)}
											</Heading>
											{week.holiday ? (
												<Label variant="attention">CT なし</Label>
											) : (
												<Label variant="secondary">予定</Label>
											)}
											{week.label === "来週" && <Text className="muted">来週</Text>}
										</Stack>
										{week.holiday ? (
											<Text>{week.holiday}のため CT はありません。</Text>
										) : week.pairs.length === 0 ? (
											<Text className="muted">参加者が 2 人未満のため、組み合わせはありません。</Text>
										) : (
											<>
												{mine?.kind === "pair" && (
													<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
														<Text weight="semibold">あなたの相手：</Text>
														<Person member={mine.partner} suffix=" さん" />
													</Stack>
												)}
												{mine?.kind === "rest" && <Text weight="semibold">あなたはお休みです</Text>}
												<Details>
													<Button as="summary" variant="invisible" size="small" trailingVisual={ChevronDownIcon}>
														全員のペアを見る（{week.pairs.length} 組）
													</Button>
													<Stack paddingBlock="condensed">
														<AllPairs week={week} withHuddle={false} headingLevel="h3" />
													</Stack>
												</Details>
											</>
										)}
									</Stack>
								</Card>
							</li>
						);
					})}
			</Stack>
		</Stack>
	);
}
