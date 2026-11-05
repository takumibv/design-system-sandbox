import { Button, Dropdown, Flex, Grid, Layout, Menu, Typography, theme } from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, SettingOutlined, SlackOutlined } from '@ant-design/icons';
import logo from '../assets/gaji-labo-logo.svg';
import { useActions } from '../actions';
import { navigate, routes, usePath } from '../router';
import { findMember, useScenario } from '../scenario';
import { PersonAvatar } from './Person';

const Account = () => {
  const { scenario } = useScenario();
  const { login, logout } = useActions();
  const screens = Grid.useBreakpoint();
  const user = findMember(scenario.members, scenario.userId);

  if (!user) {
    return (
      <Button icon={<SlackOutlined />} onClick={login}>
        {screens.sm ? 'Slack でログイン' : 'ログイン'}
      </Button>
    );
  }

  const items: MenuProps['items'] = [
    { key: 'settings', icon: <SettingOutlined />, label: '自分の設定', onClick: () => navigate(routes.settings) },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'ログアウト', onClick: logout },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Button type="text" aria-label={`${user.name}としてログイン中。メニューを開く`}>
        <Flex gap="small" align="center">
          <PersonAvatar member={user} size="small" />
          <Typography.Text>{user.name}</Typography.Text>
        </Flex>
      </Button>
    </Dropdown>
  );
};

const Navigation = () => {
  const path = usePath();
  const { scenario } = useScenario();
  const items: MenuProps['items'] = [
    { key: routes.home, label: '組み合わせ' },
    { key: routes.members, label: 'メンバー' },
    ...(scenario.userId ? [{ key: routes.settings, label: '自分の設定' }] : []),
  ];
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[path === routes.setup ? routes.settings : path]}
      items={items}
      onClick={({ key }) => navigate(key)}
      // 横並びの Menu は幅が足りないと「…」に畳まれるため、伸ばして全項目を出す
      style={{ flex: 1, minWidth: 0, borderBottom: 'none' }}
      aria-label="画面の切り替え"
    />
  );
};

const Brand = () => (
  <Flex gap="small" align="center">
    <a href="https://www.gaji.jp/" target="_blank" rel="noopener noreferrer" aria-label="Gaji-Labo のサイト（新しいタブで開きます）">
      <Flex>
        <img src={logo} alt="Gaji-Labo" height={18} />
      </Flex>
    </a>
    <Typography.Text strong>CTスケジュール</Typography.Text>
  </Flex>
);

export const AppHeader = () => {
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();
  // ヘッダーと本文の境目。Layout.Header に境界線の token が無いため style で引く（色・太さは token）
  const border = { borderBottom: `${token.lineWidth}px solid ${token.colorSplit}` };

  if (screens.md) {
    return (
      <Layout.Header style={border}>
        <Flex align="center" gap="large" style={{ height: '100%' }}>
          <Brand />
          <Navigation />
          <Account />
        </Flex>
      </Layout.Header>
    );
  }

  // 390px など狭い幅：1 段目にロゴとログイン状態、2 段目に画面の切り替え
  return (
    <header style={{ ...border, background: token.colorBgContainer }}>
      <Flex align="center" justify="space-between" gap="small" style={{ padding: `${token.paddingXS}px ${token.padding}px` }}>
        <Brand />
        <Account />
      </Flex>
      <Flex style={{ paddingInline: token.paddingXS }}>
        <Navigation />
      </Flex>
    </header>
  );
};
