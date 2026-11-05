import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
  Button,
  Center,
  Cluster,
  Container,
  DefinitionList,
  DefinitionListItem,
  FaArrowRotateRightIcon,
  FaRightToBracketIcon,
  Heading,
  InformationPanel,
  Loader,
  NotificationBar,
  PageHeading,
  Panel,
  Reel,
  ResponseMessage,
  Section,
  Stack,
  StatusLabel,
  TabBar,
  TabItem,
  Text,
  TextLink,
  WarningIcon,
  useEnvironment,
} from 'smarthr-ui'

import { Layout } from '../components/Layout'
import { Person } from '../components/Person'
import { fullDateLabel, huddleChannel, type Member, type Week } from '../data/model'
import { useAppState } from '../state'

const START_TIME = '14:00'

/** react-router 用の TextLink（?state= を引き継ぐ） */
const RouterTextLink = ({ to, children }: { to: string; children: string }) => {
  const { search } = useLocation()
  return (
    <TextLink elementAs={Link} to={`${to}${search}`}>
      {children}
    </TextLink>
  )
}

/** ハドル開始の操作。デモのため通知だけを出す。フィードバックはボタンの近くに出す [H:feedback] */
const HuddleButton = ({
  channel,
  variant,
  partnerLabel,
}: {
  channel: string
  variant: 'primary' | 'secondary'
  /** 読み上げ用：誰とのハドルか */
  partnerLabel: string
}) => {
  const [started, setStarted] = useState(false)
  const { mobile } = useEnvironment()
  return (
    <Stack gap={0.5} align={mobile ? 'stretch' : 'flex-start'}>
      <Button variant={variant} wide={mobile} onClick={() => setStarted(true)} aria-label={`${partnerLabel}とハドルを始める`}>
        ハドルを始める
      </Button>
      <Text size="S" color="TEXT_GREY">
        場所：#{channel}
      </Text>
      {started && (
        <ResponseMessage status="info" role="status">
          デモのため Slack には接続しません。本番では #{channel} でハドルが始まります。
        </ResponseMessage>
      )}
    </Stack>
  )
}

type MyWeek =
  | { kind: 'pair'; partner: Member; channel?: string }
  | { kind: 'rest' }
  | { kind: 'holiday'; name: string }
  | { kind: 'none' }
  | { kind: 'inactive' }

const myWeek = (week: Week, me: Member, find: (id: number) => Member | undefined): MyWeek => {
  if (week.holiday) return { kind: 'holiday', name: week.holiday }
  if (!me.active) return { kind: 'inactive' }
  const pair = week.pairs.find((p) => p.includes(me.id))
  if (pair) {
    const partner = find(pair[0] === me.id ? pair[1] : pair[0])
    if (partner) return { kind: 'pair', partner, channel: huddleChannel(me, partner) }
  }
  if (week.rest === me.id) return { kind: 'rest' }
  return { kind: 'none' }
}

/** 主役：今週のあなたの相手とハドル開始 [H:visual-guidance 上部に重要な情報][H:Button Primary は 1 つ] */
const MyThisWeek = () => {
  const { me, weeks, members } = useAppState()
  if (!me) return null
  const find = (id: number) => members.find((m) => m.id === id)
  const [thisWeek, ...upcoming] = weeks
  const current = myWeek(thisWeek, me, find)

  return (
    <Section>
      <Stack gap={1}>
        <Heading>今週のあなたの相手</Heading>
        <Panel padding={1.5}>
          <Stack gap={1.5}>
            <Stack gap={1}>
              <Text size="S" color="TEXT_GREY">
                {fullDateLabel(thisWeek)} {START_TIME} から
              </Text>
              {current.kind === 'pair' && (
                <>
                  <Person member={current.partner} size="L" />
                  {current.channel ? (
                    <HuddleButton channel={current.channel} variant="primary" partnerLabel={current.partner.name} />
                  ) : (
                    <Text as="p" icon={<WarningIcon />}>
                      {current.partner.name}さんの uチャンネルが未設定のため、ここからはハドルを始められません。Slack
                      で直接連絡してください。
                    </Text>
                  )}
                </>
              )}
              {current.kind === 'rest' && (
                <Stack gap={0.5}>
                  <Text size="XL" weight="bold">
                    今週、あなたはお休みです
                  </Text>
                  <Text as="p">参加者が奇数のため、毎週 1 人がお休みになります。お休みの人は週ごとに入れ替わります。</Text>
                </Stack>
              )}
              {current.kind === 'holiday' && (
                <Text size="XL" weight="bold">
                  今週は {current.name} のため CT はありません
                </Text>
              )}
              {current.kind === 'inactive' && (
                <Stack gap={0.5}>
                  <Text size="XL" weight="bold">
                    あなたは今、CT に参加していません
                  </Text>
                  <Text as="p">
                    参加すると、次の組み合わせから入ります。<RouterTextLink to="/settings">自分の設定で参加する</RouterTextLink>
                  </Text>
                </Stack>
              )}
              {current.kind === 'none' && (
                <Stack gap={0.5}>
                  <Text size="XL" weight="bold">
                    今週の組み合わせはありません
                  </Text>
                  <Text as="p">参加者が 2 人未満のため、組み合わせを作れません。2 人以上が参加すると作られます。</Text>
                </Stack>
              )}
            </Stack>
            {me.active && upcoming.length > 0 && (
              <Stack gap={0.5}>
                <Heading type="blockTitle">あなたの今後の予定</Heading>
                <DefinitionList>
                  {upcoming.map((w) => {
                    const v = myWeek(w, me, find)
                    return (
                      <DefinitionListItem key={w.key} term={`${w.short}（月）`} maxColumns={4}>
                        {v.kind === 'pair' && <Person member={v.partner} />}
                        {v.kind === 'rest' && 'お休み'}
                        {v.kind === 'holiday' && `CT なし（${v.name}）`}
                        {v.kind === 'none' && '組み合わせなし'}
                      </DefinitionListItem>
                    )
                  })}
                </DefinitionList>
                <Text size="S" color="TEXT_GREY" as="p">
                  先の週は予定です。参加者が増減すると組み直されます。
                </Text>
              </Stack>
            )}
          </Stack>
        </Panel>
      </Stack>
    </Section>
  )
}

/** 未ログインの人に、ログインすると何ができるかを伝える */
const LoginGuide = () => {
  const { login } = useAppState()
  return (
    <InformationPanel heading="ログインすると、あなたの相手がすぐにわかります" type="info">
      <Stack gap={1}>
        <Text as="p">
          Slack でログインすると、今週のあなたの相手がこの画面の一番上に表示され、そのままハドルを始められます。参加状況などの自分の設定も変えられます。
        </Text>
        <Cluster>
          <Button variant="primary" prefix={<FaRightToBracketIcon />} onClick={login}>
            Slack でログイン
          </Button>
        </Cluster>
      </Stack>
    </InformationPanel>
  )
}

const tabLabel = (w: Week, i: number) => (i === 0 ? '今週' : i === 1 ? '来週' : w.short)

/** 1 週分の組み合わせ */
const WeekPanel = ({ week, isThisWeek }: { week: Week; isThisWeek: boolean }) => {
  const { me, members } = useAppState()
  const find = (id: number) => members.find((m) => m.id === id)
  const restMember = week.rest ? find(week.rest) : undefined
  const mark = (m: Member) => (me && m.id === me.id ? 'あなた' : undefined)

  return (
    <Panel padding={1.5}>
      <Stack gap={1.5}>
        <Cluster align="center" gap={0.5}>
          <Heading type="blockTitle">
            {fullDateLabel(week)} {week.holiday ? '' : `${START_TIME} から`}
          </Heading>
          {week.holiday ? <StatusLabel type="grey">CT なし</StatusLabel> : !isThisWeek && <StatusLabel type="grey">予定</StatusLabel>}
        </Cluster>
        {week.holiday ? (
          <Text as="p">
            {week.holiday}のため、この週の CT はありません。組み合わせは作らず、翌週に繰り越します。
          </Text>
        ) : week.pairs.length === 0 ? (
          <Center padding={1.5}>
            <Stack gap={0.5} align="center">
              <Text as="p">組み合わせはありません。</Text>
              <Text as="p" size="S" color="TEXT_GREY">
                参加者が 2 人未満のためです。2 人以上が参加すると組み合わせが作られます。
              </Text>
              <RouterTextLink to="/members">参加状況をメンバー画面で確認する</RouterTextLink>
            </Stack>
          </Center>
        ) : (
          <Stack gap={1}>
            <Stack as="ul" gap={1} className="shr-list-none shr-ps-0">
              {week.pairs.map(([aId, bId]) => {
                const a = find(aId)
                const b = find(bId)
                if (!a || !b) return null
                const channel = huddleChannel(a, b)
                return (
                  <li key={`${aId}-${bId}`}>
                    <Cluster justify="space-between" align="center" gap={1}>
                      <Cluster align="center" gap={{ row: 0.5, column: 1 }}>
                        <Person member={a} note={mark(a)} />
                        <Text color="TEXT_GREY">と</Text>
                        <Person member={b} note={mark(b)} />
                      </Cluster>
                      {isThisWeek &&
                        (channel ? (
                          <HuddleButton channel={channel} variant="secondary" partnerLabel={`${a.name}さんと${b.name}さん`} />
                        ) : (
                          <Text size="S" color="TEXT_GREY">
                            uチャンネル未設定のためハドル不可
                          </Text>
                        ))}
                    </Cluster>
                  </li>
                )
              })}
            </Stack>
            {restMember && (
              <Cluster align="center" gap={0.5}>
                <Text weight="bold">お休み</Text>
                <Person member={restMember} note={mark(restMember)} />
              </Cluster>
            )}
            {!isThisWeek && (
              <Text as="p" size="S" color="TEXT_GREY">
                この週の組み合わせは予定です。参加者が増減すると組み直されます。
              </Text>
            )}
          </Stack>
        )}
      </Stack>
    </Panel>
  )
}

/** 週ごとの組み合わせ。TabBar でセクションの内容を切り替える [H:visual-grouping][H:page-layout 長いページを避ける] */
const WeeksSection = () => {
  const { weeks, members } = useAppState()
  const [params, setParams] = useSearchParams()
  const selectedKey = params.get('week') ?? weeks[0].key
  const selectedIndex = Math.max(
    0,
    weeks.findIndex((w) => w.key === selectedKey),
  )
  const activeCount = members.filter((m) => m.active).length

  return (
    <Section>
      <Stack gap={1}>
        <Cluster justify="space-between" align="center" gap={1}>
          <Heading>週ごとの組み合わせ</Heading>
          <Cluster align="center" gap={1}>
            <Text>参加者 {activeCount} 人</Text>
            <RouterTextLink to="/members">メンバーを見る</RouterTextLink>
          </Cluster>
        </Cluster>
        <Reel>
          <TabBar bordered>
            {weeks.map((w, i) => (
              <TabItem
                key={w.key}
                id={`week-tab-${w.key}`}
                selected={i === selectedIndex}
                onClick={() => {
                  const next = new URLSearchParams(params)
                  next.set('week', w.key)
                  setParams(next, { replace: true })
                }}
              >
                {tabLabel(w, i)}
              </TabItem>
            ))}
          </TabBar>
        </Reel>
        <div role="tabpanel" aria-labelledby={`week-tab-${weeks[selectedIndex].key}`}>
          <WeekPanel week={weeks[selectedIndex]} isThisWeek={selectedIndex === 0} />
        </div>
      </Stack>
    </Section>
  )
}

export const Home = () => {
  const { me, load, reload } = useAppState()
  return (
    <Layout title="組み合わせ">
      <Container>
        <Stack gap={2}>
          <Stack gap={0.5}>
            <PageHeading>CT の組み合わせ</PageHeading>
            <Text as="p">
              毎週月曜 {START_TIME} から、2 人 1 組で話します（CT＝コミュニケーションタイム）。組み合わせは毎週月曜 11:00 に Slack
              にも投稿されます。
            </Text>
          </Stack>
          {load === 'loading' && (
            <Center padding={3}>
              <Loader text="組み合わせを読み込んでいます" />
            </Center>
          )}
          {load === 'error' && (
            <NotificationBar
              type="error"
              bold
              paneled
              subActionArea={
                <Button size="S" prefix={<FaArrowRotateRightIcon />} onClick={reload}>
                  再読み込み
                </Button>
              }
            >
              組み合わせを読み込めませんでした。通信状況を確認して、再読み込みしてください。
            </NotificationBar>
          )}
          {load === 'ready' && (
            <>
              {me ? <MyThisWeek /> : <LoginGuide />}
              <WeeksSection />
            </>
          )}
        </Stack>
      </Container>
    </Layout>
  )
}
