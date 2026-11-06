import { useCallback, useEffect, useMemo, useState } from "react";
import {
  App as AntApp, Alert, Button, Dropdown, Flex, Grid, Layout, Menu, Result, Typography, theme,
} from "antd";
import { DownOutlined, LogoutOutlined, SettingOutlined, SlackOutlined } from "@ant-design/icons";
import { scenarioFromUrl, type Member } from "./data";
import { StoreContext, useStore, type Store } from "./store";
import { PersonAvatar } from "./Person";
import { SchedulePage } from "./SchedulePage";
import { MembersPage } from "./MembersPage";
import { SettingsPage } from "./SettingsPage";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const routes: Record<string, { key: string; title: string }> = {
  "/": { key: "schedule", title: "組み合わせ" },
  "/members": { key: "members", title: "メンバー" },
  "/settings": { key: "settings", title: "自分の設定" },
  "/setup": { key: "settings", title: "初回設定" },
};

export function App() {
  const { message } = AntApp.useApp();
  const scenario = useMemo(() => scenarioFromUrl(window.location.search), []);
  const [path, setPath] = useState(window.location.pathname);
  const [loggedIn, setLoggedIn] = useState(scenario.loggedIn);
  const [loginError, setLoginError] = useState(scenario.loginError);
  const [members, setMembers] = useState<Member[]>(scenario.members);
  const [loading, setLoading] = useState(scenario.loading);
  const [loadError, setLoadError] = useState(scenario.loadError);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  const person = useCallback((id: number) => members.find((m) => m.id === id), [members]);
  const me = loggedIn ? person(scenario.meId) : undefined;

  const store: Store = {
    scenario,
    loggedIn,
    me,
    members,
    weeks: scenario.weeks,
    loading,
    loadError,
    path,
    navigate,
    person,
    login: () => {
      // ログイン手段は Slack のみ。デモでは通知を出してログイン済みにする
      message.info("デモ：Slack の認証画面へ移動します（このデモではそのままログインします）");
      setLoginError(false);
      setLoggedIn(true);
    },
    logout: () => {
      setLoggedIn(false);
      message.success("ログアウトしました");
    },
    reload: () => {
      setLoadError(false);
      setLoading(true);
      window.setTimeout(() => setLoading(false), 600);
    },
    removeMember: (id) => setMembers((ms) => ms.filter((m) => m.id !== id)),
    updateMe: (patch) => setMembers((ms) => ms.map((m) => (m.id === scenario.meId ? { ...m, ...patch } : m))),
  };

  const route = routes[path];
  useEffect(() => {
    document.title = `${route?.title ?? "ページが見つかりません"} | CTスケジュール`;
  }, [route]);

  // 初回設定が済んでいない人は、初回設定へ案内する
  useEffect(() => {
    if (me?.incomplete && path === "/" && scenario.state.startsWith("setup")) navigate("/setup");
  }, [me, path, scenario.state, navigate]);

  let page: React.ReactNode;
  if (path === "/") page = <SchedulePage />;
  else if (path === "/members") page = <MembersPage />;
  else if (path === "/settings") page = <SettingsPage mode={me?.incomplete ? "setup" : "settings"} />;
  else if (path === "/setup") page = <SettingsPage mode="setup" />;
  else page = <NotFound />;

  return (
    <StoreContext.Provider value={store}>
      <Layout>
        <SiteHeader activeKey={route?.key} />
        <Content>
          <Container>
            <Flex vertical gap="large">
              {loginError && (
                <Alert
                  type="error"
                  showIcon
                  title="Slack でのログインに失敗しました"
                  description="Slack 側で許可されなかったか、通信が途中で切れた可能性があります。もう一度お試しください。組み合わせとメンバーはログインしなくても見られます。"
                  action={<Button onClick={store.login} icon={<SlackOutlined aria-hidden />}>もう一度ログイン</Button>}
                />
              )}
              {me?.incomplete && path !== "/setup" && path !== "/settings" && (
                <Alert
                  type="warning"
                  showIcon
                  title="初回設定が済んでいません"
                  description="社員番号と uチャンネルを登録すると、組み合わせに入ります。"
                  action={<Button onClick={() => navigate("/setup")}>設定する</Button>}
                />
              )}
              <main>{page}</main>
            </Flex>
          </Container>
        </Content>
        <Footer>
          <Container>
            <Text type="secondary">CTスケジュール — Gaji-Labo のチームで毎週月曜に行う 2 人 1 組の雑談の組み合わせ</Text>
          </Container>
        </Footer>
      </Layout>
    </StoreContext.Provider>
  );
}

/** 本文の最大幅と左右の余白。Layout に幅の上限を指定する props が無いため style で決める（理由は docs に記録） */
function Container({ children }: { children: React.ReactNode }) {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const pad = screens.md ? token.paddingLG : token.padding;
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: `${pad}px ${pad}px` }}>{children}</div>;
}

function SiteHeader({ activeKey }: { activeKey?: string }) {
  const { loggedIn, me, login, logout, navigate } = useStore();
  const screens = Grid.useBreakpoint();
  const narrow = !screens.md;

  const nav = (to: string, label: string) => (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {label}
    </a>
  );
  const items = [
    { key: "schedule", label: nav("/", "組み合わせ") },
    { key: "members", label: nav("/members", "メンバー") },
    ...(loggedIn ? [{ key: "settings", label: nav(me?.incomplete ? "/setup" : "/settings", "自分の設定") }] : []),
  ];

  const logo = (
    <a href="https://www.gaji.jp/" target="_blank" rel="noopener noreferrer" aria-label="Gaji-Labo（新しいタブで開きます）">
      <img src="/gaji-labo-logo.svg" alt="Gaji-Labo" height={narrow ? 18 : 22} />
    </a>
  );

  const user = loggedIn && me ? (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          { key: "settings", icon: <SettingOutlined aria-hidden />, label: "自分の設定", onClick: () => navigate(me.incomplete ? "/setup" : "/settings") },
          { type: "divider" },
          { key: "logout", icon: <LogoutOutlined aria-hidden />, label: "ログアウト", onClick: logout },
        ],
      }}
    >
      <Button type="text" aria-label={`${me.name}としてログイン中。メニューを開く`}>
        <Flex align="center" gap="small">
          <PersonAvatar member={me} size="small" />
          <Text>{me.name}</Text>
          <DownOutlined aria-hidden />
        </Flex>
      </Button>
    </Dropdown>
  ) : (
    <Button icon={<SlackOutlined aria-hidden />} onClick={login}>
      {narrow ? "ログイン" : "Slack でログイン"}
    </Button>
  );

  const menu = (
    <nav aria-label="画面の切り替え">
      <Menu mode="horizontal" selectedKeys={activeKey ? [activeKey] : []} items={items} disabledOverflow />
    </nav>
  );

  return (
    <>
      <Header>
        <Flex align="center" justify="space-between" gap="middle">
          <Flex align="center" gap="middle">
            {logo}
            {/* 390px ではログイン中の名前と並べると折り返すため、アプリ名は見出し・タブ名に任せる */}
            {!narrow && <Text strong>CTスケジュール</Text>}
          </Flex>
          {!narrow && menu}
          {user}
        </Flex>
      </Header>
      {narrow && menu}
    </>
  );
}

function NotFound() {
  const { navigate } = useStore();
  return (
    <Result
      status="404"
      title="ページが見つかりません"
      subTitle="URL が間違っているか、ページが移動・削除された可能性があります。"
      extra={<Button type="primary" onClick={() => navigate("/")}>組み合わせへ戻る</Button>}
    />
  );
}
