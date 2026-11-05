import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// antd 公式の全体リセット（body の余白などを消す）。自前の CSS ではなく antd 同梱のもの
import 'antd/dist/reset.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
