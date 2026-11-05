import { Alert, Button, Card, Col, Collapse, Empty, Flex, Grid, Row, Skeleton, Tag, Typography } from 'antd';
import type { CollapseProps } from 'antd';
import {
  CalendarOutlined,
  CoffeeOutlined,
  PhoneOutlined,
  SlackOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Member } from '../fixtures';
import { useActions } from '../actions';
import { navigate, routes } from '../router';
import { findMember, huddleChannel, isIncomplete, partnerOf, useScenario, withWeekday, type Week } from '../scenario';
import { PersonAvatar, PersonName } from '../components/Person';
import { LoadError } from '../components/LoadError';

const { Title, Text, Paragraph, Link } = Typography;

const goTo = (to: string) => (event: React.MouseEvent) => {
  event.preventDefault();
  navigate(to);
};

/** 今週・これからの週で、ある人の次の CT（相手がいる週）を探す */
const nextMeeting = (weeks: Week[], userId: number, from: number) => {
  for (const week of weeks.slice(from)) {
    const { partnerId } = partnerOf(week, userId);
    if (partnerId) return { week, partnerId };
  }
  return undefined;
};

// ───────── 今週のあなたの相手（主役） ─────────

const HeroCard = () => {
  const { scenario } = useScenario();
  const { login, startHuddle } = useActions();
  const screens = Grid.useBreakpoint();
  const { members, weeks } = scenario;
  const user = findMember(members, scenario.userId);
  const week = weeks[0];
  const when = `${withWeekday(week.short)} 14:00〜`;

  if (!user) {
    return (
      <Card title="今週のあなたの相手">
        <Flex vertical gap="middle" align="flex-start">
          <Paragraph style={{ margin: 0 }}>
            Slack でログインすると、今週の相手がここに表示され、そのままハドルを始められます。参加をやめる・戻るといった自分の設定も変えられます。
          </Paragraph>
          <Button type="primary" size="large" icon={<SlackOutlined />} onClick={login} block={!screens.sm}>
            Slack でログイン
          </Button>
          <Text type="secondary">ログインしなくても、下の組み合わせとメンバーは見られます</Text>
        </Flex>
      </Card>
    );
  }

  if (isIncomplete(user)) {
    return (
      <Card title="今週のあなたの相手">
        <Alert
          type="warning"
          showIcon
          title="はじめての設定が済んでいません"
          description="社員番号と uチャンネルを設定すると、組み合わせに入れるようになります。"
          action={
            <Button type="primary" onClick={() => navigate(routes.setup)}>
              設定する
            </Button>
          }
        />
      </Card>
    );
  }

  if (!user.active) {
    return (
      <Card title="今週のあなたの相手">
        <Alert
          type="info"
          showIcon
          title="CT に参加していないため、今週の相手はいません"
          description="休職や繁忙期が終わったら、「自分の設定」で「参加する」に戻すと、次の組み合わせから入ります。"
          action={<Button onClick={() => navigate(routes.settings)}>参加状況を変える</Button>}
        />
      </Card>
    );
  }

  if (week.holiday) {
    const next = nextMeeting(weeks, user.id, 1);
    const partner = findMember(members, next?.partnerId);
    return (
      <Card title="今週のあなたの相手" extra={<Text type="secondary">{withWeekday(week.short)}</Text>}>
        <Flex vertical gap="small">
          <Flex gap="small" align="center" wrap>
            <Title level={2} style={{ margin: 0 }}>
              今週は CT がありません
            </Title>
            <Tag icon={<CalendarOutlined />}>{week.holiday}</Tag>
          </Flex>
          <Text>{week.holiday}のため、今週の組み合わせは作らず、次の週へ繰り越します。</Text>
          {next && partner && (
            <Text>
              次は {withWeekday(next.week.short)} 14:00〜、<Text strong>{partner.name}</Text> さんと話す予定です。
            </Text>
          )}
        </Flex>
      </Card>
    );
  }

  const { partnerId, resting } = partnerOf(week, user.id);
  const partner = findMember(members, partnerId);

  if (!resting && !partner && week.pairs.length > 0) {
    return (
      <Card title="今週のあなたの相手" extra={<Text type="secondary">{when}</Text>}>
        <Alert
          type="info"
          showIcon
          title="まだ今週の組み合わせに入っていません"
          description="参加する人が増えたため、今週以降の組み合わせが組み直しになります。組み直しが終わると、ここに相手が表示されます。"
        />
      </Card>
    );
  }

  if (resting || !partner) {
    const next = nextMeeting(weeks, user.id, 1);
    const nextPartner = findMember(members, next?.partnerId);
    const noPairs = week.pairs.length === 0;
    return (
      <Card title="今週のあなたの相手" extra={<Text type="secondary">{when}</Text>}>
        <Flex vertical gap="small">
          <Flex gap="small" align="center">
            <CoffeeOutlined aria-hidden />
            <Title level={2} style={{ margin: 0 }}>
              {noPairs ? '今週の相手はいません' : '今週はお休みです'}
            </Title>
          </Flex>
          <Text>
            {noPairs
              ? 'CT に参加している人が 2 人未満のため、組み合わせを作れません。'
              : '参加者が奇数のため、今週はあなたがお休みの番です。CT の時間は自由に過ごしてください。'}
          </Text>
          {next && nextPartner && (
            <Text>
              次は {withWeekday(next.week.short)} 14:00〜、<Text strong>{nextPartner.name}</Text> さんと話す予定です。
            </Text>
          )}
        </Flex>
      </Card>
    );
  }

  const channel = huddleChannel(user, partner);
  return (
    <Card title="今週のあなたの相手" extra={<Text type="secondary">{when}</Text>}>
      <Flex vertical gap="middle">
        <Flex gap="middle" align="center">
          <PersonAvatar member={partner} size={screens.sm ? 64 : 48} />
          <Flex vertical>
            <Title level={2} style={{ margin: 0 }}>
              {partner.name} さん
            </Title>
            {channel && <Text type="secondary">ハドルの場所：#{channel}（2 人で共通）</Text>}
          </Flex>
        </Flex>
        {channel ? (
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={() => startHuddle(channel)}
            block={!screens.sm}
          >
            {partner.name}さんとハドルを始める
          </Button>
        ) : (
          <Alert
            type="warning"
            showIcon
            title={`${!partner.channel ? partner.name + 'さん' : 'あなた'}の uチャンネルが未設定です`}
            description={
              !partner.channel
                ? `ここからはハドルを始められません。Slack で ${partner.name}さんに直接声をかけてください。`
                : '「自分の設定」で uチャンネルを選ぶと、ここからハドルを始められるようになります。'
            }
          />
        )}
      </Flex>
    </Card>
  );
};

// ───────── ペアの 1 行 ─────────

const PairRow = ({ a, b, userId, actions }: { a: Member; b: Member; userId: number | null; actions: boolean }) => {
  const { startHuddle } = useActions();
  const mine = userId === a.id || userId === b.id;
  const channel = huddleChannel(a, b);
  return (
    <Flex justify="space-between" align="center" gap="small">
      <Flex gap="small" align="center" wrap flex="auto">
        <Flex gap="middle" align="center" wrap>
          <PersonName member={a} strong={mine} />
          <PersonName member={b} strong={mine} />
        </Flex>
        {mine && (
          <Tag color="processing" icon={<UserOutlined />}>
            あなたのペア
          </Tag>
        )}
      </Flex>
      {actions && channel && (
        <Button
          type="text"
          icon={<PhoneOutlined />}
          onClick={() => startHuddle(channel)}
          aria-label={`${a.name}さんと${b.name}さんのハドルを #${channel} で始める`}
        >
          ハドル
        </Button>
      )}
    </Flex>
  );
};

const PairList = ({ week, actions }: { week: Week; actions: boolean }) => {
  const { scenario } = useScenario();
  const rest = findMember(scenario.members, week.rest || undefined);
  return (
    <Flex vertical gap="middle">
      <Flex vertical gap="middle" role="list" aria-label="ペアの一覧">
      {week.pairs.map(([x, y]) => {
        const a = findMember(scenario.members, x);
        const b = findMember(scenario.members, y);
        if (!a || !b) return null;
        return (
          <div role="listitem" key={`${x}-${y}`}>
            <PairRow a={a} b={b} userId={scenario.userId} actions={actions} />
          </div>
        );
      })}
      </Flex>
      {rest && (
        <Flex gap="small" align="center" wrap>
          <Tag icon={<CoffeeOutlined />}>お休み</Tag>
          <PersonName member={rest} strong={rest.id === scenario.userId} />
        </Flex>
      )}
    </Flex>
  );
};

// ───────── 今週の組み合わせ ─────────

const ThisWeekCard = () => {
  const { scenario } = useScenario();
  const week = scenario.weeks[0];
  const active = scenario.members.filter((member) => member.active).length;
  const title = '今週の組み合わせ';
  const extra = (
    <Link href={routes.members} onClick={goTo(routes.members)}>
      <TeamOutlined aria-hidden /> 参加者 {active} 人
    </Link>
  );

  if (week.holiday) {
    return (
      <Card title={title} extra={extra}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={`${week.holiday}のため、今週のペアはありません`}
        />
      </Card>
    );
  }

  if (week.pairs.length === 0) {
    return (
      <Card title={title} extra={extra}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Flex vertical gap="small">
              <Text>今週の組み合わせはありません</Text>
              <Text type="secondary">
                CT に参加している人が {active} 人のため、ペアを作れません。2 人以上が参加すると組み合わせが作られます。
              </Text>
            </Flex>
          }
        >
          <Button onClick={() => navigate(routes.members)}>メンバーの参加状況を見る</Button>
        </Empty>
      </Card>
    );
  }

  return (
    <Card title={title} extra={extra}>
      <PairList week={week} actions />
    </Card>
  );
};

// ───────── これからの予定 ─────────

const UpcomingCard = () => {
  const { scenario } = useScenario();
  const { members, weeks, userId } = scenario;
  const user = findMember(members, userId);
  const upcoming = weeks.slice(1);
  const lastWeek = weeks[weeks.length - 1];

  const myLine = (week: Week) => {
    if (!user || isIncomplete(user)) return null;
    if (week.holiday) return null;
    const { partnerId, resting } = partnerOf(week, user.id);
    const partner = findMember(members, partnerId);
    if (resting) return <Text type="secondary">あなた：お休み</Text>;
    if (partner) return <Text type="secondary">あなた：{partner.name}さん</Text>;
    return <Text type="secondary">あなた：組み合わせなし</Text>;
  };

  const items: CollapseProps['items'] = upcoming.map((week) => ({
    key: week.date,
    label: (
      <Flex vertical>
        <Flex gap="small" align="center" wrap>
          <Text strong>{withWeekday(week.short)}</Text>
          {week.holiday ? <Tag color="default">CT なし・{week.holiday}</Tag> : <Tag color="blue">予定</Tag>}
        </Flex>
        {myLine(week)}
      </Flex>
    ),
    children: week.holiday ? (
      <Text>{week.holiday}のため CT はありません。組み合わせは次の週へ繰り越します。</Text>
    ) : week.pairs.length === 0 ? (
      <Text>参加者が 2 人未満のため、組み合わせはありません。</Text>
    ) : (
      <PairList week={week} actions={false} />
    ),
  }));

  const nextRest = user && !isIncomplete(user) ? weeks.find((week) => week.rest === user.id) : undefined;

  return (
    <Card title="これからの予定">
      <Flex vertical gap="middle">
        {user && !isIncomplete(user) && user.active && weeks.some((week) => week.pairs.length > 0) && (
          <Text>
            <CoffeeOutlined aria-hidden /> 次のお休み：
            {nextRest ? (
              <Text strong>
                {nextRest === weeks[0] ? `今週（${withWeekday(nextRest.short)}）` : withWeekday(nextRest.short)}
              </Text>
            ) : (
              <Text strong>{lastWeek.short}の週まではありません</Text>
            )}
          </Text>
        )}
        <Text type="secondary">
          先の週は予定です。参加する人が増えたり減ったりすると、その週以降の組み合わせは組み直しになります。
        </Text>
        {upcoming.length ? (
          <Collapse items={items} />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="表示できる先の予定はありません" />
        )}
      </Flex>
    </Card>
  );
};

// ───────── ページ ─────────

const LoadingView = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} lg={14}>
      <Flex vertical gap="large">
        <Card title="今週のあなたの相手" aria-busy>
          <Skeleton avatar active paragraph={{ rows: 2 }} />
        </Card>
        <Card title="今週の組み合わせ" aria-busy>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      </Flex>
    </Col>
    <Col xs={24} lg={10}>
      <Card title="これからの予定" aria-busy>
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    </Col>
  </Row>
);

export const HomePage = () => {
  const { scenario } = useScenario();
  const { login } = useActions();

  return (
    <Flex vertical gap="large">
      {scenario.loginError && (
        <Alert
          type="error"
          showIcon
          title="Slack でログインできませんでした"
          description="Slack 側で許可されなかったか、通信が途切れた可能性があります。もう一度ログインしてください。"
          action={
            <Button icon={<SlackOutlined />} onClick={login}>
              もう一度ログイン
            </Button>
          }
        />
      )}
      <Flex vertical>
        <Title level={1} style={{ margin: 0 }}>
          組み合わせ
        </Title>
        <Text type="secondary">毎週月曜 14:00 から、2 人 1 組で話します</Text>
      </Flex>
      {scenario.load === 'loading' && (
        <>
          <Text role="status">組み合わせを読み込んでいます</Text>
          <LoadingView />
        </>
      )}
      {scenario.load === 'error' && <LoadError what="組み合わせ" />}
      {scenario.load === 'ready' && (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Flex vertical gap="large">
              <HeroCard />
              <ThisWeekCard />
            </Flex>
          </Col>
          <Col xs={24} lg={10}>
            <UpcomingCard />
          </Col>
        </Row>
      )}
    </Flex>
  );
};
