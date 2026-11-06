import { createRoot } from 'react-dom/client';
import '@atlaskit/css-reset';
import { setGlobalTheme } from '@atlaskit/tokens/set-global-theme';
import App from './App';

// ADS のトークン（ライトテーマ）を読み込む。色・余白・文字はすべてトークン経由で使う。
setGlobalTheme({ colorMode: 'light', light: 'light', spacing: 'spacing', typography: 'typography' });

// StrictMode は使わない：React 18 の開発時の二重マウントで、@atlaskit のポータル（モーダル・フラグ）が
// 空のまま残る現象をこの環境で確認したため（docs/design-decisions.md「実装後の追記」）。
createRoot(document.getElementById('root')!).render(<App />);
