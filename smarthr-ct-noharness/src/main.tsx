import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EnvironmentProvider, IntlProvider, ThemeProvider, createTheme } from 'smarthr-ui'
import 'smarthr-ui/smarthr-ui.css'
import { App } from './App'

const theme = createTheme()

// smarthr-ui の CSS は body の余白・背景を扱わないため、ここだけ body に指定する（値はテーマのトークン）。
document.body.style.margin = '0'
document.body.style.backgroundColor = theme.color.BACKGROUND

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <EnvironmentProvider>
          <App />
        </EnvironmentProvider>
      </ThemeProvider>
    </IntlProvider>
  </StrictMode>,
)
