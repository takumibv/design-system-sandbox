import { useEffect } from 'react';
import Button from '@atlaskit/button/default/button';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';
import Spinner from '@atlaskit/spinner';
import HeadphonesIcon from '@atlaskit/icon/core/headphones';
import { Box, Inline, Stack, Text, xcss } from '@atlaskit/primitives';
import { useApp } from '../app-context';
import {
	CT_START,
	type AppMember,
	type Week,
	findMember,
	huddleChannel,
	myWeek,
	weeks,
	withWeekday,
} from '../model';
import { PersonAvatar, PersonName } from '../components/PersonAvatar';
import { InternalLink } from '../components/InternalLink';

const card = xcss({
	backgroundColor: 'elevation.surface.raised',
	boxShadow: 'elevation.shadow.raised',
	borderRadius: 'radius.large',
	padding: 'space.300',
});

const heroCard = xcss({
	backgroundColor: 'elevation.surface.raised',
	boxShadow: 'elevation.shadow.raised',
	borderRadius: 'radius.large',
	borderWidth: 'border.width.selected',
	borderStyle: 'solid',
	borderColor: 'color.border.brand',
	padding: 'space.300',
});

const pairRow = xcss({
	paddingBlock: 'space.150',
	paddingInline: 'space.200',
	borderRadius: 'radius.medium',
	borderWidth: 'border.width',
	borderStyle: 'solid',
	borderColor: 'color.border',
});

const myPairRow = xcss({
	backgroundColor: 'color.background.selected',
	borderColor: 'color.border.selected',
});

const list = xcss({ listStyle: 'none', margin: 'space.0', padding: 'space.0' });

export function HomePage() {
	const { status, reload, me, members, scenario, loginError, logIn, notify, navigate } = useApp();

	useEffect(() => {
		if (status === 'ready' && scenario.week) {
			document.getElementById(`week-${scenario.week}`)?.scrollIntoView();
		}
	}, [status, scenario.week]);

	const activeCount = members.filter((m) => m.active).length;
	const startHuddle = (channel: string) =>
		notify('info', `#${channel} でハドルを始めます（デモ）`, '実際には Slack のチャンネルが開き、ハドルが始まります。');

	return (
		<Stack space="space.400">
			<Stack space="space.100">
				<Heading size="xlarge" as="h1">
					CT の組み合わせ
				</Heading>
				<Text color="color.text.subtle">
					毎週月曜 {CT_START} から、2 人 1 組で話します。
					{status === 'ready' && (
						<>
							今の参加者は {activeCount} 人です（<InternalLink to="/members">メンバーを見る</InternalLink>）。
						</>
					)}
				</Text>
			</Stack>

			{loginError && (
				<SectionMessage
					appearance="error"
					title="Slack でログインできませんでした"
					actions={<SectionMessageAction onClick={logIn}>もう一度 Slack でログイン</SectionMessageAction>}
				>
					<Text as="p">
						Slack 側で許可されなかったか、通信が途切れた可能性があります。組み合わせはこのまま見られます。
					</Text>
				</SectionMessage>
			)}

			{status === 'loading' && (
				<Box xcss={card} role="status">
					<Inline space="space.150" alignBlock="center">
						<Spinner size="medium" label="読み込み中" />
						<Text>組み合わせを読み込んでいます…</Text>
					</Inline>
				</Box>
			)}

			{status === 'error' && (
				<SectionMessage
					appearance="error"
					title="組み合わせを読み込めませんでした"
					actions={<SectionMessageAction onClick={reload}>もう一度読み込む</SectionMessageAction>}
				>
					<Text as="p">
						通信が途切れたか、サーバーが応答しませんでした。少し待ってからもう一度読み込んでください。今週のペアは
						Slack の #ct チャンネル（毎週月曜 11:00 の投稿）でも確かめられます。
					</Text>
				</SectionMessage>
			)}

			{status === 'ready' && (
				<>
					{me && activeCount >= 2 ? (
						<MyCard me={me} onHuddle={startHuddle} />
					) : me ? null : (
						!loginError && <GuestMessage onLogIn={logIn} />
					)}
					{activeCount < 2 ? (
						<SectionMessage
							appearance="warning"
							title="参加者が 2 人未満のため、組み合わせを作れません"
							actions={<SectionMessageAction onClick={() => navigate('/members')}>メンバーを確認する</SectionMessageAction>}
						>
							<Text as="p">
								今の参加者は {activeCount} 人です。2 人以上が「CT に参加する」にすると、次の月曜から組み合わせが作られます。
							</Text>
						</SectionMessage>
					) : (
						<Stack space="space.300">
							<WeekSection week={weeks[0]} meId={me?.id} members={members} onHuddle={startHuddle} />
							<Stack space="space.100">
								<Heading size="large" as="h2">
									来週以降の予定
								</Heading>
								<Text color="color.text.subtle">
									参加者が増えたり減ったりすると組み直されるため、来週以降は「予定」です。
								</Text>
							</Stack>
							{weeks.slice(1).map((w) => (
								<WeekSection key={w.iso} week={w} meId={me?.id} members={members} onHuddle={startHuddle} />
							))}
						</Stack>
					)}
				</>
			)}
		</Stack>
	);
}

function GuestMessage({ onLogIn }: { onLogIn: () => void }) {
	return (
		<SectionMessage
			appearance="information"
			title="Slack でログインすると、あなたの相手がすぐわかります"
			actions={<SectionMessageAction onClick={onLogIn}>Slack でログイン</SectionMessageAction>}
		>
			<Text as="p">
				ログインすると、今週のあなたの相手がこの場所に表示され、ワンクリックでハドルを始められます。参加をやめる・戻るなどの自分の設定も変えられます。ログインしなくても、下の組み合わせとメンバーは見られます。
			</Text>
		</SectionMessage>
	);
}

function MyCard({ me, onHuddle }: { me: AppMember; onHuddle: (channel: string) => void }) {
	const { members } = useApp();
	const now = myWeek(weeks[0], me.id);
	const partner = now.kind === 'pair' ? findMember(members, now.partnerId) : undefined;
	const channel = partner ? huddleChannel(me, partner) : null;
	const upcoming = weeks.slice(1).map((w) => myWeek(w, me.id));
	const nextPair = upcoming.find((u) => u.kind === 'pair');
	const nextRest = upcoming.find((u) => u.kind === 'rest');

	return (
		<Box xcss={heroCard} as="section" aria-labelledby="my-week-title">
			<Stack space="space.250">
				<Stack space="space.050">
					<Heading size="small" as="h2" id="my-week-title">
						今週のあなたの相手
					</Heading>
					<Text color="color.text.subtle">
						{weeks[0].date}（月）{CT_START} から
					</Text>
				</Stack>

				{now.kind === 'pair' && partner && (
					<Stack space="space.200">
						<Inline space="space.200" alignBlock="center">
							<PersonAvatar member={partner} size="xlarge" />
							<Heading size="xlarge" as="div">
								{partner.name} さん
							</Heading>
						</Inline>
						{channel ? (
							<Stack space="space.100">
								<Box>
									<Button
										appearance="primary"
										iconBefore={HeadphonesIcon}
										onClick={() => onHuddle(channel)}
									>
										#{channel} でハドルを始める
									</Button>
								</Box>
								<Text size="small" color="color.text.subtle">
									ペアの 2 人とも #{channel} に集まります。
								</Text>
							</Stack>
						) : (
							<SectionMessage appearance="warning" title="ここからはハドルを始められません">
								<Text as="p">
									{partner.name} さんの uチャンネルが未設定です。Slack の DM で {partner.name}{' '}
									さんに声をかけて、CT を始めてください。
								</Text>
							</SectionMessage>
						)}
					</Stack>
				)}

				{now.kind === 'rest' && (
					<Stack space="space.100">
						<Heading size="large" as="div">
							今週、あなたはお休みです
						</Heading>
						<Text as="p">
							参加者が奇数の週は 1 人がお休みになり、毎週入れ替わります。
							{nextPair?.kind === 'pair' && (
								<>
									次の CT は {withWeekday(nextPair.week.short)}、相手は{' '}
									{findMember(members, nextPair.partnerId)?.name} さんの予定です。
								</>
							)}
						</Text>
					</Stack>
				)}

				{now.kind === 'none' && (
					<Text as="p">
						あなたは今週の組み合わせに入っていません。「CT に参加する」になっているか、
						<InternalLink to="/settings">自分の設定</InternalLink>で確かめてください。
					</Text>
				)}

				<Stack space="space.100">
					<Heading size="xsmall" as="h3">
						あなたの今後の予定
					</Heading>
					<Box as="ul" xcss={list}>
						{upcoming.map((u) => (
							<Box as="li" key={u.week.iso}>
								<Inline space="space.100" shouldWrap>
									<Text weight="medium">{withWeekday(u.week.short)}</Text>
									<Text color="color.text.subtle">
										{u.kind === 'pair'
											? `${findMember(members, u.partnerId)?.name} さん`
											: u.kind === 'rest'
												? 'お休み'
												: u.kind === 'holiday'
													? `CT なし（${u.week.holiday}）`
													: '組み合わせに入っていません'}
									</Text>
								</Inline>
							</Box>
						))}
					</Box>
					<Text size="small" color="color.text.subtle">
						{nextRest ? '' : '表示している期間に、あなたのお休みはありません。'}
						予定は参加者の増減で変わることがあります。
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}

function WeekSection({
	week,
	meId,
	members,
	onHuddle,
}: {
	week: Week;
	meId?: number;
	members: AppMember[];
	onHuddle: (channel: string) => void;
}) {
	const rest = week.rest ? findMember(members, week.rest) : undefined;
	const titleId = `week-title-${week.iso}`;
	return (
		<Box xcss={card} as="section" id={`week-${week.iso}`} aria-labelledby={titleId}>
			<Stack space="space.200">
				<Inline space="space.100" alignBlock="center" shouldWrap>
					<Heading size="medium" as={week.isCurrent ? 'h2' : 'h3'} id={titleId}>
						{week.date}（月）
					</Heading>
					{week.isCurrent ? (
						<Lozenge appearance="inprogress" isBold>
							今週
						</Lozenge>
					) : (
						<Lozenge appearance="default">予定</Lozenge>
					)}
					{week.holiday && <Lozenge appearance="moved">CT なし</Lozenge>}
				</Inline>

				{week.holiday ? (
					<Text as="p">
						{week.holiday}（祝日）のため、この週の CT はありません。組み合わせは次の週へ繰り越します。
					</Text>
				) : (
					<Stack space="space.100">
						<Stack as="ul" space="space.100" xcss={list}>
								{week.pairs.map(([a, b]) => {
									const ma = findMember(members, a);
									const mb = findMember(members, b);
									if (!ma || !mb) return null;
									const mine = meId === a || meId === b;
									const channel = huddleChannel(ma, mb);
									return (
										<Box as="li" key={`${a}-${b}`} xcss={[pairRow, mine ? myPairRow : undefined]}>
											<Inline space="space.200" alignBlock="center" spread="space-between" shouldWrap>
												<Inline space="space.150" alignBlock="center" shouldWrap>
													<PersonName member={ma} />
													<Text color="color.text.subtle">と</Text>
													<PersonName member={mb} />
													{mine && (
														<Lozenge appearance="new" isBold>
															あなたのペア
														</Lozenge>
													)}
												</Inline>
												{week.isCurrent &&
													(channel ? (
														<Button spacing="compact" onClick={() => onHuddle(channel)}>
															#{channel} でハドル
														</Button>
													) : (
														<Text size="small" color="color.text.subtle">
															uチャンネル未設定のためハドル導線なし
														</Text>
													))}
											</Inline>
										</Box>
									);
								})}
						</Stack>
						{rest && (
							<Inline space="space.100" alignBlock="center" shouldWrap>
								<Text color="color.text.subtle">お休み：</Text>
								<PersonName member={rest} />
								{rest.id === meId && <Lozenge appearance="new">あなた</Lozenge>}
							</Inline>
						)}
					</Stack>
				)}
			</Stack>
		</Box>
	);
}
