// 画面をまたいで使う操作（デモでは Slack に接続せず、通知だけを出す）。
import { App } from 'antd';
import { findMember, useScenario } from './scenario';
import { navigate, routes } from './router';

export const useActions = () => {
  const { message } = App.useApp();
  const { scenario, update } = useScenario();

  const login = () => {
    const userId = 1;
    const member = findMember(scenario.members, userId);
    update({ userId, loginError: false });
    message.success(`${member?.name ?? ''}としてログインしました（デモのため Slack には接続していません）`);
  };

  const logout = () => {
    update({ userId: null });
    message.success('ログアウトしました');
    navigate(routes.home);
  };

  const startHuddle = (channel: string) => {
    message.info(`Slack の #${channel} でハドルを始めます（デモのため Slack は開きません）`);
  };

  const reload = () => {
    update({ load: 'loading' });
    window.setTimeout(() => update({ load: 'ready' }), 600);
  };

  return { login, logout, startHuddle, reload };
};
