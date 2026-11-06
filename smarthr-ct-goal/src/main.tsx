import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { EnvironmentProvider, IntlProvider, ThemeProvider, createTheme } from 'smarthr-ui'
import 'smarthr-ui/smarthr-ui.css'

import { App } from './App'

const theme = createTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <EnvironmentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EnvironmentProvider>
      </ThemeProvider>
    </IntlProvider>
  </StrictMode>,
)
