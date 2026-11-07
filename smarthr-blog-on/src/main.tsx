import 'smarthr-ui/smarthr-ui.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EnvironmentProvider, IntlProvider, ThemeProvider, createTheme } from 'smarthr-ui'

import { App } from './App'
import { RouterProvider } from './router'
import { StoreProvider } from './store'

const theme = createTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <EnvironmentProvider>
          <RouterProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </RouterProvider>
        </EnvironmentProvider>
      </ThemeProvider>
    </IntlProvider>
  </StrictMode>,
)
