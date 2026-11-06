import { useEffect, useMemo } from "react";
import {
  App as AntApp, Alert, Badge, Button, Card, Col, Collapse, Descriptions, Empty, Flex, Result, Row,
  Skeleton, Space, Tag, Typography, theme,
} from "antd";
import { ClockCircleOutlined, CoffeeOutlined, PhoneOutlined, SlackOutlined, TeamOutlined } from "@ant-design/icons";
import { CT_START, huddleChannel, withWeekday, type Member, type Week } from "./data";
import { Person, PersonAvatar } from "./Person";
import { activeMembers, useStore } from "./store";
import { AppLink } from "./AppLink";

const { Title, Text, Paragraph } = Typography;

type MyWeek =
  | { kind: "pair"; partner: Member; channel?: string }
  | { kind: "rest" }
  | { kind: "holiday"; name: string }
  | { kind: "empty" }
  | { kind: "out" };

function myWeek(week: Week, meId: number, person: (id: number) => Member | undefined): MyWeek {
  if (week.holiday) return { kind: "holiday", name: week.holiday };
  if (week.pairs.length === 0) return { kind: "empty" };
  if (week.rest === meId) return { kind: "rest" };
  const pair = week.pairs.find((p) => p.includes(meId));
  if (!pair) return { kind: "out" };
  const members = pair.map((id) => person(id)).filter((m): m is Member => !!m);
  const partner = members.find((m) => m.id !== meId);
  if (!partner) return { kind: "out" };
  return { kind: "pair", partner, channel: huddleChannel(members) };
}

function useHuddle() {
  const { message } = AntApp.useApp();
  return (channel: string, names: string) =>
    message.info(`デモ：${names}ハドルを #${channel} で始めます（実際には Slack が開きます）`);
}

export function SchedulePage() {
  const store = useStore();
  const { weeks, members, loading, loadError, loggedIn, me, person, scenario } = store;
  const participants = activeMembers(members);
  const few = participants.length < 2;

  if (loading) return <ScheduleSkeleton />;
  if (loadError) {
    return (
      <Result
        status="error"
        title="組み合わせを読み込めませんでした"
        subTitle="通信が不安定か、サーバーが応答していません。少し待ってから再読み込みしてください。直らない場合は Slack の CT 投稿で今週のペアを確認できます。"
        extra={<Button type="primary" onClick={store.reload}>再読み込み</Button>}
      />
    );
  }

  const [thisWeek, ...future] = weeks;

  return (
    <Flex vertical gap="large">
      <div>
        <Title level={1}>組み合わせ</Title>
        <Text type="secondary">
          CT は毎週月曜 {CT_START} 開始です。参加者 {participants.length} 人
          （全メンバー {members.length} 人）・<AppLink to="/members">メンバーを見る</AppLink>
        </Text>
      </div>

      {loggedIn && me ? <MyCard week={thisWeek} future={future} few={few} /> : <GuestCard />}

      <section aria-labelledby="this-week">
        <Card
          title={
            <Flex gap="small" align="center" wrap>
              <span id="this-week">今週のペア</span>
              <Text type="secondary">{withWeekday(thisWeek.date)} {CT_START}〜</Text>
            </Flex>
          }
        >
          {few ? <FewEmpty /> : <WeekBody week={thisWeek} withHuddle />}
        </Card>
      </section>

      <section aria-labelledby="future">
        <Flex vertical gap="middle">
          <div>
            <Title level={2} id="future">今後の予定</Title>
            <Text type="secondary">
              先の週は「予定」です。参加者が増えたり減ったりすると、その週以降の組み合わせは組み直されます。
            </Text>
          </div>
          {few ? (
            <Card><FewEmpty /></Card>
          ) : (
            <FutureWeeks weeks={future} openWeek={scenario.openWeek} />
          )}
        </Flex>
      </section>
    </Flex>
  );
}

function MyCard({ week, future, few }: { week: Week; future: Week[]; few: boolean }) {
  const { me, person } = useStore();
  const huddle = useHuddle();
  if (!me) return null;
  const now = myWeek(week, me.id, person);
  const nextWeek = future[0];
  const nextPair = future
    .map((w) => ({ w, m: myWeek(w, me.id, person) }))
    .find((x) => x.m.kind === "pair");
  const nextRest = future.find((w) => myWeek(w, me.id, person).kind === "rest");
  const last = future[future.length - 1] ?? week;

  const when = `${withWeekday(week.date)} ${CT_START}〜`;

  let body: React.ReactNode;
  if (!me.active) {
    body = (
      <Flex vertical gap="small" align="start">
        <Title level={2}>あなたは今、CT に参加していません</Title>
        <Text>参加すると、組み合わせに入ります（今週以降の全員の組み合わせが組み直されます）。</Text>
        <AppLink to={me.incomplete ? "/setup" : "/settings"}>参加の設定を変える</AppLink>
      </Flex>
    );
  } else if (few || now.kind === "empty") {
    body = (
      <Flex vertical gap="small" align="start">
        <Title level={2}>今週の組み合わせはありません</Title>
        <Text>参加者が 2 人未満のため、組み合わせを作れませんでした。参加者が 2 人以上になると、自動で組み合わせが作られます。</Text>
        <AppLink to="/members">参加しているメンバーを確認する</AppLink>
      </Flex>
    );
  } else if (now.kind === "holiday") {
    body = (
      <Flex vertical gap="small">
        <Title level={2}>今週は CT がありません（{now.name}）</Title>
        <Text>祝日のため、組み合わせは次の週へ繰り越します。</Text>
      </Flex>
    );
  } else if (now.kind === "rest") {
    body = (
      <Flex vertical gap="small" align="start">
        <Text type="secondary">{when}</Text>
        <Title level={2}><CoffeeOutlined aria-hidden /> 今週、あなたはお休みです</Title>
        <Text>参加者が奇数のため、毎週 1 人がお休みになります。お休みの人は週ごとに交代します。</Text>
      </Flex>
    );
  } else if (now.kind === "pair") {
    body = (
      <Flex vertical gap="middle" align="start">
        <Text type="secondary">{when} のあなたの相手</Text>
        <Flex align="center" gap="middle">
          <PersonAvatar member={now.partner} size={64} />
          <Title level={2}>{now.partner.name} さん</Title>
        </Flex>
        {now.channel ? (
          <Flex vertical gap="small" align="start">
            <Button
              type="primary"
              size="large"
              icon={<PhoneOutlined aria-hidden />}
              onClick={() => huddle(now.channel!, `${now.partner.name}さんとの`)}
            >
              ハドルを始める
            </Button>
            <Text type="secondary">
              #{now.channel} で始まります（ペアのうち社員番号が若い人の uチャンネル。相手も同じチャンネルに来ます）
            </Text>
          </Flex>
        ) : (
          <Alert
            type="warning"
            showIcon
            title={`${now.partner.name}さんの uチャンネルが未設定のため、ここからハドルを始められません`}
            description="Slack の DM から声をかけてください。uチャンネルは本人が「自分の設定」で登録できます。"
          />
        )}
      </Flex>
    );
  } else {
    body = <Title level={2}>今週の組み合わせにあなたは入っていません</Title>;
  }

  const nextWeekText = (() => {
    if (!nextWeek) return "—";
    const m = myWeek(nextWeek, me.id, person);
    if (m.kind === "holiday") return `${withWeekday(nextWeek.short)}は CT なし（${m.name}）`;
    if (m.kind === "rest") return `${withWeekday(nextWeek.short)}はお休み（予定）`;
    if (m.kind === "pair") return `${withWeekday(nextWeek.short)} ${m.partner.name}さん（予定）`;
    return `${withWeekday(nextWeek.short)}は組み合わせなし`;
  })();

  return (
    <section aria-labelledby="my-card-title">
      <Card title={<span id="my-card-title">今週のあなたの CT</span>}>
        <Flex vertical gap="large">
          {body}
          {me.active && !few && (
            <Descriptions
              size="small"
              column={1}
              title={<Text strong>あなたの今後の予定</Text>}
              items={[
                { key: "next", label: "来週", children: nextWeekText },
                {
                  key: "pair",
                  label: "次に話す相手",
                  children: nextPair && nextPair.m.kind === "pair"
                    ? `${withWeekday(nextPair.w.short)} ${nextPair.m.partner.name}さん（予定）`
                    : `${withWeekday(last.short)}までの予定にはありません`,
                },
                {
                  key: "rest",
                  label: "次のお休み",
                  children: nextRest
                    ? `${withWeekday(nextRest.short)}（予定）`
                    : `${withWeekday(last.short)}までの予定にはありません`,
                },
              ]}
            />
          )}
        </Flex>
      </Card>
    </section>
  );
}

function GuestCard() {
  const { login } = useStore();
  return (
    <section aria-labelledby="guest-title">
      <Card>
        <Flex vertical gap="middle" align="start">
          <Title level={2} id="guest-title">ログインすると、あなたの今週の相手がすぐわかります</Title>
          <ul>
            <li>自分の相手（またはお休み）をこの場所に大きく表示します</li>
            <li>相手とのハドルをボタン 1 つで始められます</li>
            <li>休職・繁忙期などで参加をやめる／戻る設定ができます</li>
          </ul>
          <Button type="primary" size="large" icon={<SlackOutlined aria-hidden />} onClick={login}>
            Slack でログイン
          </Button>
          <Text type="secondary">ログインしなくても、下の一覧で全員の組み合わせを見られます。</Text>
        </Flex>
      </Card>
    </section>
  );
}

function FewEmpty() {
  return (
    <Empty
      description={
        <Space orientation="vertical" size={4}>
          <Text>参加者が 2 人未満のため、組み合わせはありません</Text>
          <Text type="secondary">参加者が 2 人以上になると、自動で組み合わせが作られます。</Text>
        </Space>
      }
    >
      <AppLink to="/members">メンバーを確認する</AppLink>
    </Empty>
  );
}

function WeekBody({ week, withHuddle }: { week: Week; withHuddle?: boolean }) {
  const { me, person, loggedIn } = useStore();
  const huddle = useHuddle();
  const { token } = theme.useToken();
  if (week.holiday) {
    return (
      <Text>
        祝日（{week.holiday}）のため CT はありません。この週の組み合わせは作らず、次の週へ繰り越します。
      </Text>
    );
  }
  if (week.pairs.length === 0) return <FewEmpty />;
  const meId = loggedIn ? me?.id : undefined;
  const rest = week.rest ? person(week.rest) : undefined;
  return (
    <Flex vertical gap="middle">
      <Row gutter={[16, 16]}>
        {week.pairs.map((pair) => {
          const ms = pair.map((id) => person(id)).filter((m): m is Member => !!m);
          const mine = meId !== undefined && pair.includes(meId);
          const channel = huddleChannel(ms);
          const names = ms.map((m) => `${m.name}さん`).join("と");
          const card = (
            <Card size="small">
              <Flex vertical gap="small">
                {ms.map((m) => (
                  // 自分のペアはリボン「あなたのペア」と太字で示す（リボンとタグが重なるため、タグは付けない）
                  <Person key={m.id} member={m} strong={m.id === meId} />
                ))}
                {withHuddle && (channel ? (
                  <Button
                    size="small"
                    icon={<PhoneOutlined aria-hidden />}
                    aria-label={`${names}のハドルを #${channel} で始める`}
                    onClick={() => huddle(channel, `${names}の`)}
                  >
                    ハドル（#{channel}）
                  </Button>
                ) : (
                  <Text type="secondary">uチャンネル未設定のためハドル導線なし</Text>
                ))}
              </Flex>
            </Card>
          );
          return (
            <Col key={pair.join("-")} xs={24} sm={12} lg={6}>
              {mine ? <Badge.Ribbon text="あなたのペア" color={token.colorPrimary}>{card}</Badge.Ribbon> : card}
            </Col>
          );
        })}
      </Row>
      {rest && (
        <Flex align="center" gap="small" wrap>
          <Tag icon={<CoffeeOutlined aria-hidden />}>お休み</Tag>
          <Person member={rest} strong={rest.id === meId} suffix={rest.id === meId ? <Tag color="blue">あなた</Tag> : undefined} />
          <Text type="secondary">（参加者が奇数のため）</Text>
        </Flex>
      )}
    </Flex>
  );
}

function FutureWeeks({ weeks, openWeek }: { weeks: Week[]; openWeek?: string }) {
  const { me, person, loggedIn } = useStore();
  useEffect(() => {
    if (openWeek) document.getElementById(`week-${openWeek}`)?.scrollIntoView({ block: "start" });
  }, [openWeek]);
  const items = useMemo(
    () =>
      weeks.map((w) => {
        const m = loggedIn && me ? myWeek(w, me.id, person) : undefined;
        const summary = w.holiday
          ? `CT なし（${w.holiday}）`
          : m?.kind === "pair"
            ? `あなたの相手：${m.partner.name}さん`
            : m?.kind === "rest"
              ? "あなたはお休み"
              : `${w.pairs.length} 組${w.rest ? "・お休み 1 人" : ""}`;
        return {
          key: w.date,
          label: (
            <Flex id={`week-${w.date}`} gap="small" align="center" wrap>
              <Text strong>{withWeekday(w.short)}</Text>
              {w.holiday ? <Tag color="red">祝日・CT なし</Tag> : <Tag icon={<ClockCircleOutlined aria-hidden />}>予定</Tag>}
              {w.label === "来週" && <Tag>来週</Tag>}
              <Text>{summary}</Text>
            </Flex>
          ),
          children: <WeekBody week={w} />,
        };
      }),
    [weeks, me, person, loggedIn],
  );
  return <Collapse items={items} defaultActiveKey={openWeek ? [openWeek] : []} />;
}

function ScheduleSkeleton() {
  return (
    <Flex vertical gap="large" aria-busy="true" aria-live="polite">
      <div>
        <Title level={1}>組み合わせ</Title>
        <Text type="secondary"><TeamOutlined aria-hidden /> 組み合わせを読み込んでいます…</Text>
      </div>
      <Card>
        <Skeleton avatar={{ size: 64 }} active paragraph={{ rows: 2 }} />
      </Card>
      <Card>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    </Flex>
  );
}
