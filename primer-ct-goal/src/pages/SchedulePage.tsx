import { useState } from 'react'
import { Banner, Button, Heading, Label, Link, PageLayout, Stack, Text } from '@primer/react'
import { Blankslate, Card, InlineMessage } from '@primer/react/experimental'
import {
  AlertIcon,
  CalendarIcon,
  ClockIcon,
  CommentDiscussionIcon,
  MoonIcon,
  PeopleIcon,
  SyncIcon,
} from '@primer/octicons-react'
import { CT_START, findMember, huddleChannel, type Member, type Week } from '../data/model'
import { useLinkHandler, useRouter } from '../router'
import { useAppState } from '../state'
import { Person } from '../components/Person'
import { PersonAvatar } from '../components/PersonAvatar'
import { LoadingSchedule } from '../components/LoadingSchedule'
import { HuddleNotice } from '../components/HuddleNotice'
import styles from './SchedulePage.module.css'

const pairOf = (week: Week, id?: number) => week.pairs.find((p) => id !== undefined && p.includes(id))
const partnerIn = (pair: [number, number], id: number) => (pair[0] === id ? pair[1] : pair[0])

/** その週の状況（自分の相手／お休み／CT なし）を 1 行で説明する */
function myStatusText(week: Week, members: Member[], me: Member): string {
  if (week.holiday) return `CT なし（${week.holiday}）`
  const pair = pairOf(week, me.id)
  if (pair) return `${findMember(members, partnerIn(pair, me.id))?.name ?? '不明'} さん`
  if (week.rest === me.id) return 'あなたはお休み'
  if (!me.active) return '参加していません'
  return '組み合わせなし'
}

export function SchedulePage() {
  const { scenario, visibleWeeks, members, me } = useAppState()
  const { navigate, href } = useRouter()
  const link = useLinkHandler()

  if (scenario.data === 'loading') return <LoadingSchedule />

  if (scenario.data === 'error') {
    return (
      <PageLayout containerWidth="large">
        <PageLayout.Content as="div">
          <Heading as="h1" variant="medium">
            組み合わせ
          </Heading>
          <Blankslate border>
            <Blankslate.Visual>
              <AlertIcon size="medium" className={styles.mutedIcon} />
            </Blankslate.Visual>
            <Blankslate.Heading as="h2">組み合わせを読み込めませんでした</Blankslate.Heading>
            <Blankslate.Description>
              通信が途切れたか、サーバーが一時的に応答していない可能性があります。少し待ってから、もう一度読み込んでください。
              月曜 11:00 に Slack へ投稿されたペアの一覧でも、今週の相手を確かめられます。
            </Blankslate.Description>
            <Blankslate.PrimaryAction onClick={() => navigate('/', { data: undefined })}>
              もう一度読み込む
            </Blankslate.PrimaryAction>
          </Blankslate>
        </PageLayout.Content>
      </PageLayout>
    )
  }

  const thisWeek = visibleWeeks[0]
  const upcoming = visibleWeeks.slice(1)
  const activeCount = members.filter((m) => m.active).length
  const nextCtWeek = visibleWeeks.find((w, i) => i > 0 && !w.holiday && w.pairs.length > 0)

  return (
    <PageLayout containerWidth="xlarge">
      <PageLayout.Content as="div">
        <Stack gap="spacious">
          <Stack gap="condensed">
            <Heading as="h1" variant="medium">
              組み合わせ
            </Heading>
            <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
              <Text size="small" className={styles.meta}>
                <ClockIcon size={16} /> CT は毎週月曜 {CT_START} から
              </Text>
              <Text size="small" className={styles.meta}>
                <PeopleIcon size={16} /> 参加者 {activeCount} 人・
                <Link href={href('/members')} onClick={link('/members')} inline>
                  メンバーを見る
                </Link>
              </Text>
            </Stack>
          </Stack>

          {me ? (
            <ThisWeekCard week={thisWeek} nextCtWeek={nextCtWeek} me={me} members={members} />
          ) : (
            <Banner
              variant="info"
              title="Slack でログインすると、あなたの相手がここに表示されます"
              description="ログインすると、今週の相手とハドルの開始ボタンがいちばん上に出ます。参加・不参加などの自分の設定も変えられます。"
              primaryAction={<LoginAction />}
            />
          )}

          <WeekSection week={thisWeek} members={members} me={me} />
        </Stack>
      </PageLayout.Content>

      <PageLayout.Pane position={{ narrow: 'end', regular: 'end', wide: 'end' }} aria-labelledby="upcoming-heading" width="medium" divider={{ narrow: 'line' }}>
        <UpcomingWeeks weeks={upcoming} members={members} me={me} />
      </PageLayout.Pane>
    </PageLayout>
  )
}

function LoginAction() {
  const { login } = useAppState()
  return <Banner.PrimaryAction onClick={login}>Slack でログイン</Banner.PrimaryAction>
}

/** 主役：今週のあなたの相手と、ハドル開始ボタン */
function ThisWeekCard({ week, nextCtWeek, me, members }: { week: Week; nextCtWeek?: Week; me: Member; members: Member[] }) {
  const [notice, setNotice] = useState<string>()
  const pair = pairOf(week, me.id)
  const partner = pair ? findMember(members, partnerIn(pair, me.id)) : undefined
  const channel = pair ? huddleChannel(members, pair) : undefined

  const nextLine = nextCtWeek ? (
    <Text as="p" className={styles.para}>
      次の CT は {nextCtWeek.label} {CT_START} から。{myStatusText(nextCtWeek, members, me)}
      {pairOf(nextCtWeek, me.id) ? ' と話す予定です。' : 'の予定です。'}
    </Text>
  ) : null

  let body
  if (week.holiday) {
    body = (
      <>
        <CardTitle>今週は CT がありません</CardTitle>
        <Text as="p" className={styles.para}>
          {week.label}は{week.holiday}のため、CT はお休みです。組み合わせは次の週へ繰り越されます。
        </Text>
        {nextLine}
      </>
    )
  } else if (week.pairs.length === 0) {
    body = (
      <>
        <CardTitle>今週の組み合わせはありません</CardTitle>
        <Text as="p" className={styles.para}>参加者が 2 人未満のため、組み合わせを作れませんでした。くわしくは下の「今週の組み合わせ」を見てください。</Text>
      </>
    )
  } else if (!me.active) {
    body = (
      <>
        <CardTitle>あなたは今 CT に参加していません</CardTitle>
        <Text as="p" className={styles.para}>参加すると、今週以降の組み合わせに入ります。参加するかどうかは「自分の設定」で変えられます。</Text>
      </>
    )
  } else if (week.rest === me.id) {
    body = (
      <>
        <Stack direction="horizontal" align="center" gap="condensed">
          <MoonIcon size={24} className={styles.mutedIcon} />
          <CardTitle>今週のあなたはお休みです</CardTitle>
        </Stack>
        <Text as="p" className={styles.para}>参加者が奇数のため、毎週 1 人がお休みになります。お休みの人は週ごとに入れ替わります。</Text>
        {nextLine}
      </>
    )
  } else if (partner) {
    body = (
      <>
        <CardTitle>今週のあなたの相手</CardTitle>
        <Stack direction={{ narrow: 'vertical', regular: 'horizontal' }} align={{ narrow: 'start', regular: 'center' }} justify="space-between" gap="normal">
          <Stack direction="horizontal" align="center" gap="normal" wrap="nowrap">
            <PersonAvatar member={partner} size={48} />
            <span className={styles.heroName}>{partner.name} さん</span>
          </Stack>
          {channel ? (
            <Button
              variant="primary"
              size="large"
              leadingVisual={CommentDiscussionIcon}
              onClick={() => setNotice(channel)}
              block={false}
            >
              ハドルを始める
            </Button>
          ) : null}
        </Stack>
        {channel ? (
          <Text size="small" className={styles.muted}>
            #{channel}（{partner.channel === channel ? `${partner.name} さん` : 'あなた'}の uチャンネル）で始めます。相手も同じチャンネルに来ます。
          </Text>
        ) : (
          <InlineMessage variant="warning">
            {partner.channel ? 'あなた' : `${partner.name} さん`}の uチャンネルが設定されていないため、ここからハドルを始められません。Slack の DM で{' '}
            {partner.name} さんに連絡してください。
            {partner.channel ? '「自分の設定」で uチャンネルを設定すると、次回から始められます。' : ''}
          </InlineMessage>
        )}
        {notice ? <HuddleNotice channel={notice} onDismiss={() => setNotice(undefined)} /> : null}
      </>
    )
  }

  return (
    <Card as="section" aria-labelledby="this-week-heading" padding="normal">
      <Stack gap="normal">
        <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
          <Label variant="accent">今週</Label>
          <Text size="small" weight="semibold">
            <CalendarIcon size={16} /> {week.longLabel} {CT_START}〜
          </Text>
        </Stack>
        {body}
      </Stack>
    </Card>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" id="this-week-heading" variant="small">
      {children}
    </Heading>
  )
}

/** 今週の組み合わせ（全ペア） */
function WeekSection({ week, members, me }: { week: Week; members: Member[]; me?: Member }) {
  const { href } = useRouter()
  const activeCount = members.filter((m) => m.active).length
  return (
    <section aria-labelledby="week-pairs-heading">
      <Stack gap="condensed">
        <Stack direction="horizontal" align="baseline" gap="condensed" wrap="wrap">
          <Heading as="h2" id="week-pairs-heading" variant="small">
            今週の組み合わせ
          </Heading>
          <Text size="small" className={styles.muted}>
            {week.longLabel}
          </Text>
        </Stack>
        {week.holiday ? (
          <InlineHoliday week={week} />
        ) : week.pairs.length === 0 ? (
          <Blankslate border size="small">
            <Blankslate.Visual>
              <PeopleIcon size="medium" />
            </Blankslate.Visual>
            <Blankslate.Heading as="h3">今週の組み合わせはありません</Blankslate.Heading>
            <Blankslate.Description>
              組み合わせは参加者が 2 人以上いるときに作られます。今の参加者は {activeCount} 人です。
              参加する人が増えると、その週から自動で組み合わせが作られます。
            </Blankslate.Description>
            <Blankslate.PrimaryAction href={href('/members')}>
              メンバーと参加状況を見る
            </Blankslate.PrimaryAction>
          </Blankslate>
        ) : (
          <ul className={styles.pairList}>
            {week.pairs.map((pair) => (
              <PairRow key={pair.join('-')} pair={pair} members={members} me={me} />
            ))}
            {week.rest ? (
              <li className={styles.pairRow}>
                <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
                  <Text size="small" className={styles.muted}>
                    お休み
                  </Text>
                  <Person member={findMember(members, week.rest)!} isMe={week.rest === me?.id} />
                </Stack>
              </li>
            ) : null}
          </ul>
        )}
      </Stack>
    </section>
  )
}

function PairRow({ pair, members, me }: { pair: [number, number]; members: Member[]; me?: Member }) {
  const [notice, setNotice] = useState<string>()
  const [a, b] = pair.map((id) => findMember(members, id)!)
  const channel = huddleChannel(members, pair)
  const mine = me ? pair.includes(me.id) : false
  return (
    <li className={mine ? `${styles.pairRow} ${styles.mine}` : styles.pairRow}>
      <Stack gap="condensed">
        <Stack direction="horizontal" align="center" justify="space-between" gap="condensed" wrap="wrap">
          <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
            <Person member={a} isMe={a.id === me?.id} />
            <Text size="small" className={styles.muted}>
              と
            </Text>
            <Person member={b} isMe={b.id === me?.id} />
          </Stack>
          {channel ? (
            <Button
              size="small"
              leadingVisual={CommentDiscussionIcon}
              onClick={() => setNotice(channel)}
              aria-label={`${a.name} さんと ${b.name} さんのハドルを #${channel} で始める`}
            >
              ハドル
            </Button>
          ) : (
            <Text size="small" className={styles.muted}>
              uチャンネル未設定のためハドル不可
            </Text>
          )}
        </Stack>
        {notice ? <HuddleNotice channel={notice} onDismiss={() => setNotice(undefined)} /> : null}
      </Stack>
    </li>
  )
}

function InlineHoliday({ week }: { week: Week }) {
  return (
    <Stack direction="horizontal" align="center" gap="condensed">
      <Label variant="secondary">CT なし</Label>
      <Text>{week.holiday}のため、この週は組み合わせを作りません。</Text>
    </Stack>
  )
}

/** これからの予定（来週以降） */
function UpcomingWeeks({ weeks, members, me }: { weeks: Week[]; members: Member[]; me?: Member }) {
  const nextRest = me ? weeks.find((w) => w.rest === me.id) : undefined
  const noPairsAtAll = weeks.every((w) => w.pairs.length === 0 && !w.holiday)
  return (
    <Stack gap="normal">
      <Stack gap="condensed">
        <Heading as="h2" id="upcoming-heading" variant="small">
          これからの予定
        </Heading>
        <Text size="small" className={styles.muted}>
          <SyncIcon size={16} /> 参加者が増減すると組み直されるため、来週以降は予定です。
        </Text>
        {me && me.active ? (
          <Text size="small">
            次のあなたのお休み：<strong>{nextRest ? nextRest.label : `表示中の ${weeks.length} 週にはありません`}</strong>
          </Text>
        ) : null}
      </Stack>
      {noPairsAtAll ? (
        <Text size="small" className={styles.muted}>
          参加者が 2 人以上になると、ここに予定が表示されます。
        </Text>
      ) : (
        <ol className={styles.weekList}>
          {weeks.map((week, i) => (
            <li key={week.iso} className={styles.weekItem}>
              <Stack gap="condensed">
                <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
                  <Heading as="h3" variant="small" className={styles.weekTitle}>
                    {week.label}
                  </Heading>
                  <Label variant="secondary">{i === 0 ? '来週・予定' : '予定'}</Label>
                </Stack>
                {week.holiday ? (
                  <Stack direction="horizontal" align="center" gap="condensed">
                    <Label variant="secondary">CT なし</Label>
                    <Text size="small">{week.holiday}</Text>
                  </Stack>
                ) : (
                  <>
                    {me && me.active ? (
                      <Text size="small" weight="semibold">
                        あなた：{myStatusText(week, members, me)}
                      </Text>
                    ) : null}
                    <ul className={styles.compactPairs}>
                      {week.pairs
                        .filter((p) => !me || !p.includes(me.id))
                        .map((p) => (
                          <li key={p.join('-')}>
                            <Text size="small">
                              {findMember(members, p[0])?.name} と {findMember(members, p[1])?.name}
                            </Text>
                          </li>
                        ))}
                      {week.rest && week.rest !== me?.id ? (
                        <li>
                          <Text size="small" className={styles.muted}>
                            お休み：{findMember(members, week.rest)?.name}
                          </Text>
                        </li>
                      ) : null}
                    </ul>
                  </>
                )}
              </Stack>
            </li>
          ))}
        </ol>
      )}
    </Stack>
  )
}
