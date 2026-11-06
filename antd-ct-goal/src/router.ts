// 依存を増やさないための最小のルーター（pathname だけを見る）。
import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
window.addEventListener('popstate', notify);

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const navigate = (to: string) => {
  window.history.pushState(null, '', to);
  window.scrollTo(0, 0);
  notify();
};

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname);

export const routes = {
  home: '/',
  members: '/members',
  settings: '/settings',
  setup: '/setup',
} as const;
