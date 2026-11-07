import {Route, Routes} from 'react-router-dom'
import {AppShell} from './components/AppShell'
import {TabbedLayout} from './components/TabbedLayout'
import {AuthorsPage} from './pages/AuthorsPage'
import {MinePage} from './pages/MinePage'
import {NotFoundPage} from './pages/NotFoundPage'
import {PlanPage} from './pages/PlanPage'
import {PostDetailPage} from './pages/PostDetailPage'
import {PostFormPage} from './pages/PostFormPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route element={<TabbedLayout />}>
          <Route path="/" element={<PlanPage />} />
          <Route path="/mine" element={<MinePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Route>
        <Route path="/posts/new" element={<PostFormPage mode="create" />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostFormPage mode="edit" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}
