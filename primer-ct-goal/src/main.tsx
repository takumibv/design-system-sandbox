import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// init（Primer MCP）の指示どおりテーマ CSS を読み込む。余白・文字・角丸などのトークンは primitives.css にあるため併せて読み込む
import '@primer/primitives/dist/css/primitives.css'
import '@primer/primitives/dist/css/functional/themes/light.css'
import { BaseStyles, ThemeProvider } from '@primer/react'
import { RouterProvider } from './router'
import { AppStateProvider } from './state'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider colorMode="light">
      <BaseStyles>
        <RouterProvider>
          <AppStateProvider>
            <App />
          </AppStateProvider>
        </RouterProvider>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>,
)
