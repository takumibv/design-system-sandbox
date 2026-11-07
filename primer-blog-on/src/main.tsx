import '@primer/primitives/dist/css/primitives.css'
import '@primer/primitives/dist/css/functional/themes/light.css'
import {BaseStyles, ThemeProvider} from '@primer/react'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {StoreProvider, viewerFromParam} from './store'

// デモ用：最初に開いた URL の ?as= で「誰として見るか」を決める（以降は画面内の状態で持つ）
const initialViewer = viewerFromParam(new URLSearchParams(window.location.search).get('as'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider colorMode="day">
      <BaseStyles>
        <BrowserRouter>
          <StoreProvider initialViewer={initialViewer}>
            <App />
          </StoreProvider>
        </BrowserRouter>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>,
)
