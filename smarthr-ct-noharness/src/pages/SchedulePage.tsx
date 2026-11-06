import { useEffect } from 'react'
import {
  AccordionPanel,
  AccordionPanelContent,
  AccordionPanelItem,
  AccordionPanelTrigger,
  Base,
  Button,
  Cluster,
  FaClockIcon,
  Heading,
  InformationPanel,
  Loader,
  PageHeading,
  Section,
  Stack,
  StatusLabel,
  Text,
  TextLink,
} from 'smarthr-ui'
import type { AppApi } from '../App'
import type { Member } from '../fixtures'
import { Person } from '../Person'
import { huddleChannel, withWeekday, type Week } from '../scenario'

type Props = { api: AppApi }

const weekId = (w: Week) => {
  const m = w.date.match(/(\d+)年(\d+)月(\d+)日/)
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : w.date
}

export const SchedulePage = ({ api }: Props) => {
  const { scenario, me } = api
  const byId = (id: number) => scenario.members.find((m) => m.id === id)!
  const activeCount = scenario.members.filter((m) => m.active).length

  const huddle = (channel: string) =>
    api.notify({ type: 'info', text: `（デモ）Slack の #${channel} でハドルを始めます。` })

  const focusWeek = new URLSearchParams(window.location.search).get('week')
  useEffect(() => {
    if (focusWeek) document.getElementById(`week-${focusWeek}`)?.scrollIntoView()
  }, [focusWeek])

  if (scenario.load === 'loading') {
    return (
      <Stack gap={1.5}>
        <PageHeading>組み合わせ</PageHeading>
        <Base padding={2}>
          <Cluster justify="center">
            <Loader text="組み合わせを読み込んでいます…" />
          </Cluster>
        </Base>
      </Stack>
    )
  }

  if (scenario.load === 'error') {
    return (
      <Stack gap={1.5}>
        <PageHeading>組み合わせ</PageHeading>
        <InformationPanel type="error" heading="組み合わせを読み込めませんでした">
          <Stack gap={1} align="flex-start">
            <Text as="p">通信が不安定か、サーバーで問題が起きている可能性があります。もう一度読み込んでください。</Text>
            <Button
              onClick={() => api.setScenario((s) => ({ ...s, load: 'ready' }))}
            >
              再読み込み
            </Button>
          </Stack>
        </InformationPanel>
      </Stack>
    )
  }

  const [thisWeek, ...upcoming] = scenario.weeks
  const pairOf = (w: Week, id: number) => w.pairs.find((p) => p.includes(id))
  const nextRest = me ? upcoming.find((w) => w.rest === me.id) : undefined

  return (
    <Stack gap={2}>
      <Stack gap={0.5}>
        <PageHeading>組み合わせ</PageHeading>
        <Cluster gap={1} align="center">
          <Text color="TEXT_GREY" icon={<FaClockIcon />}>
            CT は毎週月曜 14:00 から
          </Text>
          <Text color="TEXT_GREY">参加者 {activeCount} 人</Text>
          <TextLink
              href="/members"
              onClick={(e) => {
                e.preventDefault()
                api.navigate('/members')
              }}
            >
              メンバーを見る
            </TextLink>
        </Cluster>
      </Stack>

      <MyThisWeek api={api} week={thisWeek} upcoming={upcoming} byId={byId} onHuddle={huddle} />

      <Section>
        <Stack gap={1}>
          <Heading>今週のペア一覧</Heading>
          <WeekPairs week={thisWeek} byId={byId} meId={me?.id} onHuddle={huddle} showHuddle />
        </Stack>
      </Section>

      <Section>
        <Stack gap={1}>
          <Heading>これからの予定</Heading>
          <Text as="p" color="TEXT_GREY">
            来週以降の組み合わせは<Text weight="bold">予定</Text>
            です。参加者が増えたり減ったりすると、その週以降の組み合わせは組み直されます。
          </Text>
          {me && upcoming.some((w) => w.pairs.length > 0) && (
            <Text as="p">
              あなたの次のお休み：
              <Text weight="bold">{nextRest ? withWeekday(nextRest.date) : '表示中の期間にはありません'}</Text>
            </Text>
          )}
          <AccordionPanel expandableMultiply defaultExpanded={focusWeek ? [focusWeek] : []}>
            {upcoming.map((w) => {
              const p = me ? pairOf(w, me.id) : undefined
              const partner = p && me ? byId(p.find((id) => id !== me.id)!) : undefined
              return (
                <AccordionPanelItem key={w.date} name={weekId(w)} id={`week-${weekId(w)}`}>
                  <AccordionPanelTrigger headingType="blockTitle">
                    <Cluster gap={0.5} align="center" as="span">
                      <span>{withWeekday(w.date)}</span>
                      {w.holiday ? (
                        <StatusLabel type="grey">CT なし</StatusLabel>
                      ) : (
                        <StatusLabel type="grey">予定</StatusLabel>
                      )}
                      <Text size="S" color="TEXT_GREY" weight="normal">
                        {w.holiday
                          ? `${w.holiday}のため CT はありません`
                          : w.pairs.length === 0
                            ? '組み合わせなし'
                            : me
                              ? partner
                                ? `あなたの相手：${partner.name}さん`
                                : w.rest === me.id
                                  ? 'あなたはお休み'
                                  : 'あなたは組み合わせに入っていません'
                              : `${w.pairs.length} ペア`}
                      </Text>
                    </Cluster>
                  </AccordionPanelTrigger>
                  <AccordionPanelContent>
                    <Base padding={1} bgColor="OVER_BACKGROUND" layer={0}>
                      <WeekPairs week={w} byId={byId} meId={me?.id} />
                    </Base>
                  </AccordionPanelContent>
                </AccordionPanelItem>
              )
            })}
          </AccordionPanel>
        </Stack>
      </Section>
    </Stack>
  )
}

const MyThisWeek = ({
  api,
  week,
  upcoming,
  byId,
  onHuddle,
}: {
  api: AppApi
  week: Week
  upcoming: Week[]
  byId: (id: number) => Member
  onHuddle: (c: string) => void
}) => {
  const { me } = api
  const dateLine = (
    <Text color="TEXT_GREY">
      今週 {withWeekday(week.date)} 14:00〜
    </Text>
  )

  if (!me) {
    return (
      <Base padding={1.5} layer={1}>
        <Stack gap={1}>
          {dateLine}
          <Heading type="blockTitle">ログインすると、あなたの今週の相手がすぐにわかります</Heading>
          <Text as="p">
            Slack アカウントでログインすると、この画面のいちばん上に今週の相手が表示され、そのままハドルを始められます。参加をやめる・戻るなどの自分の設定も変えられます。
          </Text>
          <div>
            <Button variant="primary" onClick={api.login}>
              Slack でログイン
            </Button>
          </div>
        </Stack>
      </Base>
    )
  }

  if (week.holiday) {
    return (
      <Base padding={1.5} layer={1}>
        <Stack gap={0.5}>
          {dateLine}
          <Heading type="blockTitle">今週は {week.holiday}のため CT はありません</Heading>
        </Stack>
      </Base>
    )
  }

  if (week.pairs.length === 0) {
    return (
      <InformationPanel type="info" heading="今週の組み合わせはありません">
        <Stack gap={0.5} align="flex-start">
          <Text as="p">
            参加している人が 2 人未満のため、組み合わせを作れませんでした。参加者が 2 人以上になると、その週から組み合わせが作られます。
          </Text>
          <TextLink
            href="/members"
            onClick={(e) => {
              e.preventDefault()
              api.navigate('/members')
            }}
          >
            メンバーの参加状況を見る
          </TextLink>
        </Stack>
      </InformationPanel>
    )
  }

  const pair = week.pairs.find((p) => p.includes(me.id))

  if (!pair) {
    const isRest = week.rest === me.id
    const next = upcoming.find((w) => w.pairs.some((p) => p.includes(me.id)))
    const nextPartner = next ? byId(next.pairs.find((p) => p.includes(me.id))!.find((id) => id !== me.id)!) : undefined
    return (
      <Base padding={1.5} layer={1}>
        <Stack gap={0.5}>
          {dateLine}
          <Heading type="sectionTitle" size="XL">
            {isRest ? '今週、あなたはお休みです' : '今週、あなたは組み合わせに入っていません'}
          </Heading>
          <Text as="p">
            {isRest
              ? '参加者が奇数のため、今週は 1 人がお休みです。お休みの人は週ごとに入れ替わります。'
              : '参加をやめているか、初回設定が済んでいないためです。参加は自分の設定で変えられます。'}
          </Text>
          {next && nextPartner && (
            <Cluster gap={0.5} align="center">
              <Text>
                次回 {withWeekday(next.date)} の相手（予定）：
              </Text>
              <Person member={nextPartner} />
            </Cluster>
          )}
        </Stack>
      </Base>
    )
  }

  const partner = byId(pair.find((id) => id !== me.id)!)
  const members = pair.map(byId)
  const channel = huddleChannel(members)
  const missing = members.filter((m) => !m.channel)

  return (
    <Section>
      <Base padding={1.5} layer={1}>
        <Stack gap={1}>
          {dateLine}
          <Heading type="blockTitle">今週のあなたの相手</Heading>
          <Cluster gap={1.5} align="center" justify="space-between">
            <Person member={partner} size="L" />
            {channel ? (
              <Stack gap={0.25} align="flex-start">
                <Button variant="primary" onClick={() => onHuddle(channel)}>
                  ハドルを始める
                </Button>
                <Text size="S" color="TEXT_GREY">
                  #{channel} で始まります
                </Text>
              </Stack>
            ) : null}
          </Cluster>
          {!channel && (
            <InformationPanel type="warning" heading="この画面からはハドルを始められません">
              <Text as="p">
                {missing.map((m) => `${m.name}さん`).join('、')}の uチャンネルが未設定です。Slack のダイレクトメッセージなどで直接声をかけてください。
              </Text>
            </InformationPanel>
          )}
        </Stack>
      </Base>
    </Section>
  )
}

const WeekPairs = ({
  week,
  byId,
  meId,
  onHuddle,
  showHuddle,
}: {
  week: Week
  byId: (id: number) => Member
  meId?: number
  onHuddle?: (c: string) => void
  showHuddle?: boolean
}) => {
  if (week.holiday) {
    return <Text as="p">{week.holiday}のため、この週は CT がありません。組み合わせは翌週へ繰り越します。</Text>
  }
  if (week.pairs.length === 0) {
    return <Text as="p">参加している人が 2 人未満のため、組み合わせはありません。</Text>
  }
  return (
    <Stack gap={0.5} role="list">
      {week.pairs.map((pair) => {
        const ms = pair.map(byId)
        const mine = meId != null && pair.includes(meId)
        const channel = huddleChannel(ms)
        return (
          <Base role="listitem" key={pair.join('-')} padding={{ block: 0.75, inline: 1 }} layer={mine ? 2 : 0}>
            <Cluster gap={1} align="center" justify="space-between">
              <Cluster gap={{ row: 0.5, column: 1 }} align="center">
                {ms.map((m) => (
                  <Person key={m.id} member={m} isMe={m.id === meId} />
                ))}
              </Cluster>
              {showHuddle &&
                (channel ? (
                  <Button size="S" onClick={() => onHuddle?.(channel)}>
                    ハドル（#{channel}）
                  </Button>
                ) : (
                  <Text size="S" color="TEXT_GREY">
                    uチャンネル未設定のためハドル不可
                  </Text>
                ))}
            </Cluster>
          </Base>
        )
      })}
      {week.rest ? (
        <Base role="listitem" padding={{ block: 0.75, inline: 1 }} layer={0} bgColor="OVER_BACKGROUND">
          <Cluster gap={1} align="center">
            <StatusLabel type="grey">お休み</StatusLabel>
            <Person member={byId(week.rest)} isMe={week.rest === meId} />
          </Cluster>
        </Base>
      ) : null}
    </Stack>
  )
}
