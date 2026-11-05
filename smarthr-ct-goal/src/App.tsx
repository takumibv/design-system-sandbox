import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { isIncomplete } from './data/model'
import { Home } from './pages/Home'
import { Members } from './pages/Members'
import { NotFound } from './pages/NotFound'
import { Settings } from './pages/Settings'
import { AppStateProvider, useAppState } from './state'

/** 初回設定が済んでいない人は、必須項目が埋まるまで初回設定へ誘導する */
const RequireSetup = ({ children }: { children: ReactNode }) => {
  const { me } = useAppState()
  const { search } = useLocation()
  if (me && isIncomplete(me)) return <Navigate to={`/settings${search}`} replace />
  return children
}

export const App = () => {
  const { search } = useLocation()
  const scenarioId = new URLSearchParams(search).get('state')
  return (
    <AppStateProvider scenarioId={scenarioId}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireSetup>
              <Home />
            </RequireSetup>
          }
        />
        <Route
          path="/members"
          element={
            <RequireSetup>
              <Members />
            </RequireSetup>
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppStateProvider>
  )
}
