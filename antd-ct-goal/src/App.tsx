import { useCallback, useEffect, useMemo, useState } from 'react';
import { App as AntApp, ConfigProvider, Layout, theme } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import { AppHeader } from './components/AppHeader';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { routes, usePath } from './router';
import { ScenarioContext, scenarioFromUrl, useScenario, type Scenario } from './scenario';

// DESIGN.md の Accessibility note に従い、白文字との対比が 4.5:1 を超えるよう primary を blue-7 に下げる。
// 16 進数をここで決めず、antd 自身のプリセット（blue7）から取る。
const base = theme.getDesignToken();
const colorPrimary = base.blue7;

const themeConfig = {
  token: {
    colorPrimary,
    colorInfo: colorPrimary,
    colorLink: colorPrimary,
    // 既定の状態色は文字として使うと 4.5:1 に届かない（Tag の文字、Form のエラー文、「必須」表示など）。
    // DESIGN.md の指示どおり、独自色を作らずプリセットの濃い段に寄せる。
    colorSuccess: base.green8,
    colorWarning: base.gold9,
    colorError: base.red7,
    // seed を濃くすると派生する背景色まで濁るため、背景と枠は既定値（淡色）のまま固定する
    ...Object.fromEntries(
      (['Success', 'Warning', 'Error'] as const).flatMap((status) =>
        (['Bg', 'BgHover', 'Border', 'BorderHover'] as const).map((part) => {
          const key = `color${status}${part}` as const;
          return [key, base[key]];
        }),
      ),
    ),
    // Typography type="secondary" は既定で 0.45 の透明度（#8C8C8C 相当、3.36:1）。0.65 の段に揃える
    colorTextDescription: base.colorTextSecondary,
    // 見出しを 1 画面目に収めるため、h1〜h3 を本文寄りの大きさにする（token の上書きのみ）
    fontSizeHeading1: 24,
    fontSizeHeading2: 20,
    fontSizeHeading3: 16,
  },
  components: {
    // ヘッダーは既定の濃紺ではなく、本文と同じ container 面にする（ロゴが黒一色のため）
    Layout: { headerBg: base.colorBgContainer, headerPadding: `0 ${base.paddingLG}px` },
  },
};

const Pages = () => {
  const path = usePath();
  switch (path) {
    case routes.home:
      return <HomePage />;
    case routes.members:
      return <MembersPage />;
    case routes.settings:
      return <SettingsPage mode="settings" />;
    case routes.setup:
      return <SettingsPage mode="setup" />;
    default:
      return <NotFoundPage />;
  }
};

const Shell = () => {
  const { token } = theme.useToken();
  const { scenario } = useScenario();
  // モーダルを開いている間、背面のページを操作・読み上げの対象から外す（WAI-ARIA のモーダルダイアログの作法）。
  // antd の Modal は aria-modal を付けるが、背面を inert にはしない
  const modalOpen = scenario.deleteTargetId !== null;
  return (
    <Layout style={{ minHeight: '100vh' }} inert={modalOpen}>
      <AppHeader />
      <Layout.Content
        // 本文の外側余白と最大幅。Layout.Content には余白の token が無いため、token の値を style で渡す
        style={{
          width: '100%',
          maxWidth: token.screenXL,
          margin: '0 auto',
          padding: `${token.paddingLG}px ${token.padding}px`,
        }}
      >
        <Pages />
      </Layout.Content>
    </Layout>
  );
};

export default function App() {
  const [scenario, setScenario] = useState<Scenario>(() => scenarioFromUrl(window.location.search));

  const update = useCallback(
    (patch: Partial<Scenario> | ((current: Scenario) => Partial<Scenario>)) =>
      setScenario((current) => ({ ...current, ...(typeof patch === 'function' ? patch(current) : patch) })),
    [],
  );

  // 通常の訪問では読み込みを模す（状態指定のときは指定どおりに止めておく）
  useEffect(() => {
    if (scenario.stateId || scenario.load !== 'loading') return;
    const timer = window.setTimeout(() => update({ load: 'ready' }), 300);
    return () => window.clearTimeout(timer);
  }, [scenario.stateId, scenario.load, update]);

  const value = useMemo(() => ({ scenario, update }), [scenario, update]);

  return (
    <ConfigProvider locale={jaJP} theme={themeConfig}>
      <AntApp>
        <ScenarioContext.Provider value={value}>
          <Shell />
        </ScenarioContext.Provider>
      </AntApp>
    </ConfigProvider>
  );
}
