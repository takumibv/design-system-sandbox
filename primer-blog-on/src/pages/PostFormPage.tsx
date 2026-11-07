import {SignInIcon} from '@primer/octicons-react'
import {Banner, Button, Checkbox, CheckboxGroup, ConfirmationDialog, FormControl, PageHeader, PageLayout, Select, Stack, Textarea, TextInput} from '@primer/react'
import {Blankslate} from '@primer/react/experimental'
import {useEffect, useRef, useState} from 'react'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {NoPermission} from '../components/StateViews'
import {canCreate, canEdit, CATEGORIES, isValidDate, STATUS_LABEL, STATUS_ORDER, TODAY, viewerId, type Category, type Post, type Status} from '../domain'
import {useStore} from '../store'
import {useQuery} from '../url'
import {NotFoundPage} from './NotFoundPage'

type Draft = {
  title: string
  category: Category
  authorIds: number[]
  plannedDate: string
  status: Status
  publishedDate: string
  url: string
  note: string
}
type Errors = Partial<Record<'title' | 'authorIds' | 'plannedDate' | 'publishedDate' | 'url', string>>

const toDraft = (p: Post): Draft => ({
  title: p.title,
  category: p.category,
  authorIds: p.authorIds,
  plannedDate: p.plannedDate ?? '',
  status: p.status,
  publishedDate: p.publishedDate ?? '',
  url: p.url ?? '',
  note: p.note ?? '',
})

const validate = (d: Draft): Errors => {
  const e: Errors = {}
  if (!d.title.trim()) e.title = 'タイトルを入力してください。仮タイトルでもかまいません。'
  if (d.authorIds.length === 0) e.authorIds = '書く人を 1 人以上選んでください。'
  if (d.plannedDate && !isValidDate(d.plannedDate)) e.plannedDate = '公開予定日は日付で入力してください。未定なら空欄にします。'
  if (d.status === 'published') {
    if (!isValidDate(d.publishedDate)) e.publishedDate = '公開済みにするときは、公開日を入力してください。'
    if (d.url && !/^https?:\/\/\S+$/.test(d.url.trim())) e.url = '記事 URL は https:// から入力してください。'
  }
  return e
}

/** V5 登録 / V6 編集。項目が 8 つあり再読み込みにも耐えるよう専用ページにする（patterns/create.md:29,77）。 */
export function PostFormPage({mode}: {mode: 'create' | 'edit'}) {
  const {id} = useParams()
  const {posts, members, viewer, login, createPost, updatePost} = useStore()
  const {get} = useQuery()
  const navigate = useNavigate()
  const existing = mode === 'edit' ? posts.find(p => String(p.id) === id) : undefined

  const initial: Draft = existing
    ? toDraft(existing)
    : {
        title: '',
        category: '技術',
        authorIds: viewerId(viewer) != null ? [viewerId(viewer)!] : [],
        plannedDate: isValidDate(get('date')) ? get('date')! : '',
        status: 'idea',
        publishedDate: '',
        url: '',
        note: '',
      }
  const [draft, setDraft] = useState<Draft>(initial)
  const [errors, setErrors] = useState<Errors>(() => (get('error') === 'validation' ? validate(initial) : {}))
  const [saveFailed, setSaveFailed] = useState(get('error') === 'save')
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const fieldRefs = {
    title: useRef<HTMLInputElement>(null),
    authorIds: useRef<HTMLInputElement>(null),
    plannedDate: useRef<HTMLInputElement>(null),
    publishedDate: useRef<HTMLInputElement>(null),
    url: useRef<HTMLInputElement>(null),
  }

  useEffect(() => {
    if (saveFailed) bannerRef.current?.focus()
  }, [saveFailed])

  if (mode === 'edit' && !existing) return <NotFoundPage what="投稿予定" />

  const backTo = existing ? `/posts/${existing.id}` : '/'
  const title = mode === 'create' ? '投稿予定を登録' : '投稿予定を編集'

  // 権限が無いときは、フォームの代わりに理由と次にできることを出す（ブリーフ「権限の無い操作」）
  const denied =
    viewer.kind === 'guest' ? (
      <NoPermission
        heading={mode === 'create' ? '投稿予定を登録するには、ログインが必要です' : '投稿予定を編集するには、ログインが必要です'}
        description="ログインしていなくても計画は見られます。登録や編集は、Slack アカウントでログインしてから行えます。"
        action={
          <Blankslate.PrimaryAction onClick={() => login()}>
            <SignInIcon /> Slack でログイン
          </Blankslate.PrimaryAction>
        }
      />
    ) : mode === 'create' && !canCreate(viewer) ? (
      <NoPermission heading="投稿予定を登録できません" description="登録できるのはログイン中のメンバーです。" />
    ) : existing && !canEdit(viewer, existing) ? (
      <NoPermission
        heading="この投稿予定は編集できません"
        description="編集できるのは、この投稿の書く人と編集担当です。変更が必要なときは、書く人か編集担当に Slack で伝えてください。"
        action={<Blankslate.PrimaryAction onClick={() => navigate(backTo)}>投稿予定を見る</Blankslate.PrimaryAction>}
      />
    ) : null

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft(d => ({...d, [k]: v}))
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(draft)
    setErrors(errs)
    const first = (Object.keys(fieldRefs) as (keyof typeof fieldRefs)[]).find(k => errs[k])
    if (first) {
      fieldRefs[first].current?.focus() // 項目の誤りは最初の誤りへ（patterns/create.md:45）
      return
    }
    if (get('fail') === 'save') {
      setSaveFailed(false)
      queueMicrotask(() => setSaveFailed(true)) // 保存の失敗（デモ）：入力は残し、Banner へフォーカス
      return
    }
    const post: Omit<Post, 'id'> = {
      title: draft.title.trim(),
      category: draft.category,
      authorIds: draft.authorIds,
      plannedDate: draft.plannedDate || null,
      status: draft.status,
      ...(draft.status === 'published' ? {publishedDate: draft.publishedDate, url: draft.url.trim() || undefined} : {}),
      note: draft.note.trim() || undefined,
    }
    if (existing) {
      updatePost({...post, id: existing.id})
      navigate(`/posts/${existing.id}?result=saved`)
    } else {
      const created = createPost(post)
      navigate(`/posts/${created.id}?result=created`)
    }
  }

  return (
    <PageLayout containerWidth="medium" padding="normal" rowGap="condensed">
      <PageLayout.Header>
        <PageHeader role="banner" aria-label={title}>
          <PageHeader.ContextArea>
            <PageHeader.ParentLink as={RouterLink} to={backTo} hidden={false}>
              {existing ? '投稿予定に戻る' : '計画に戻る'}
            </PageHeader.ParentLink>
          </PageHeader.ContextArea>
          <PageHeader.TitleArea variant="medium">
            <PageHeader.Title as="h1">{title}</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
      </PageLayout.Header>
      <PageLayout.Content as="main" aria-label="本文">
        {denied ?? (
          <form onSubmit={submit} noValidate aria-label={title}>
            <Stack gap="normal">
              <div ref={bannerRef} tabIndex={-1} aria-live="assertive">
                {saveFailed ? (
                  <Banner
                    variant="critical"
                    title={mode === 'create' ? '投稿予定を登録できませんでした' : '変更を保存できませんでした'}
                    description={`通信が一時的に切れた可能性があります。入力した内容はそのまま残っています。もう一度「${mode === 'create' ? '投稿予定を登録' : '変更を保存'}」を押してください。`}
                  />
                ) : null}
              </div>

              <FormControl required>
                <FormControl.Label>タイトル</FormControl.Label>
                <FormControl.Caption>仮タイトルでかまいません。</FormControl.Caption>
                <TextInput ref={fieldRefs.title} value={draft.title} onChange={e => set('title', e.target.value)} block />
                {errors.title ? <FormControl.Validation variant="error">{errors.title}</FormControl.Validation> : null}
              </FormControl>

              <FormControl required>
                <FormControl.Label>カテゴリ</FormControl.Label>
                <Select value={draft.category} onChange={e => set('category', e.target.value as Category)} block>
                  {CATEGORIES.map(c => (
                    <Select.Option key={c} value={c}>
                      {c}
                    </Select.Option>
                  ))}
                </Select>
              </FormControl>

              <CheckboxGroup required>
                <CheckboxGroup.Label>書く人</CheckboxGroup.Label>
                <CheckboxGroup.Caption>共著なら複数選びます。</CheckboxGroup.Caption>
                {members.map((m, i) => (
                  <FormControl key={m.id}>
                    <Checkbox
                      ref={i === 0 ? fieldRefs.authorIds : undefined}
                      value={String(m.id)}
                      checked={draft.authorIds.includes(m.id)}
                      onChange={e => set('authorIds', e.target.checked ? [...draft.authorIds, m.id] : draft.authorIds.filter(x => x !== m.id))}
                    />
                    <FormControl.Label>
                      {m.name}
                      {m.role === 'editor' ? '（編集担当）' : ''}
                    </FormControl.Label>
                  </FormControl>
                ))}
                {errors.authorIds ? <CheckboxGroup.Validation variant="error">{errors.authorIds}</CheckboxGroup.Validation> : null}
              </CheckboxGroup>

              <FormControl>
                <FormControl.Label>公開予定日</FormControl.Label>
                <FormControl.Caption>未定なら空欄のままにします。週ごとの計画では、この日の週に並びます。</FormControl.Caption>
                <TextInput ref={fieldRefs.plannedDate} type="date" value={draft.plannedDate} onChange={e => set('plannedDate', e.target.value)} />
                {errors.plannedDate ? <FormControl.Validation variant="error">{errors.plannedDate}</FormControl.Validation> : null}
              </FormControl>

              <FormControl required>
                <FormControl.Label>状態</FormControl.Label>
                <Select
                  value={draft.status}
                  onChange={e => {
                    const s = e.target.value as Status
                    setDraft(d => ({...d, status: s, publishedDate: s === 'published' && !d.publishedDate ? TODAY : d.publishedDate}))
                  }}
                >
                  {STATUS_ORDER.map(s => (
                    <Select.Option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </Select.Option>
                  ))}
                </Select>
                <FormControl.Caption>「公開済み」を選ぶと、公開日と記事 URL を入力できます。</FormControl.Caption>
              </FormControl>

              {draft.status === 'published' ? (
                <>
                  <FormControl required>
                    <FormControl.Label>公開日</FormControl.Label>
                    <TextInput ref={fieldRefs.publishedDate} type="date" value={draft.publishedDate} onChange={e => set('publishedDate', e.target.value)} />
                    {errors.publishedDate ? <FormControl.Validation variant="error">{errors.publishedDate}</FormControl.Validation> : null}
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>記事 URL</FormControl.Label>
                    <TextInput ref={fieldRefs.url} type="url" value={draft.url} onChange={e => set('url', e.target.value)} placeholder="https://example.com/blog/..." block />
                    {errors.url ? <FormControl.Validation variant="error">{errors.url}</FormControl.Validation> : null}
                  </FormControl>
                </>
              ) : null}

              <FormControl>
                <FormControl.Label>メモ</FormControl.Label>
                <Textarea value={draft.note} onChange={e => set('note', e.target.value)} rows={3} block resize="vertical" />
              </FormControl>

              <Stack direction="horizontal" gap="condensed">
                <Button type="submit" variant="primary">
                  {mode === 'create' ? '投稿予定を登録' : '変更を保存'}
                </Button>
                <Button type="button" onClick={() => (dirty ? setConfirmDiscard(true) : navigate(backTo))}>
                  キャンセル
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
        {confirmDiscard ? (
          <ConfirmationDialog
            title="入力した内容を破棄しますか？"
            confirmButtonContent="入力内容を破棄"
            confirmButtonType="danger"
            cancelButtonContent="入力を続ける"
            onClose={g => (g === 'confirm' ? navigate(backTo) : setConfirmDiscard(false))}
          >
            保存していない変更は失われます。
          </ConfirmationDialog>
        ) : null}
      </PageLayout.Content>
    </PageLayout>
  )
}
