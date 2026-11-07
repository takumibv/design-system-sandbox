import {ChevronDownIcon, InfoIcon, LinkExternalIcon, PencilIcon, TrashIcon} from '@primer/octicons-react'
import {ActionList, ActionMenu, Banner, Button, ConfirmationDialog, FormControl, Label, Link, PageHeader, PageLayout, Stack, Text, TextInput, VisuallyHidden} from '@primer/react'
import {Dialog, SkeletonText} from '@primer/react/experimental'
import {useRef, useState} from 'react'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import classes from '../components/Detail.module.css'
import {ResultBanner} from '../components/ResultBanner'
import {LoadError} from '../components/StateViews'
import {StatusLabel} from '../components/StatusLabel'
import {canDelete, canEdit, formatDate, isMine, isValidDate, overdueDays, STATUS_LABEL, STATUS_ORDER, TODAY, viewerId, type Post, type Status} from '../domain'
import {dateText} from '../components/PostRow'
import {useStore} from '../store'
import {useDemoState, useQuery} from '../url'
import {NotFoundPage} from './NotFoundPage'

/** V4 投稿予定の詳細。主役は投稿の全項目と状態。編集・状態の変更・削除は、できる人にだけ出す（patterns/edit.md:82）。 */
export function PostDetailPage() {
  const {id} = useParams()
  const {posts, viewer, memberName, updatePost, deletePost} = useStore()
  const {get, update} = useQuery()
  const demo = useDemoState()
  const navigate = useNavigate()
  const post = posts.find(p => String(p.id) === id)
  const statusButtonRef = useRef<HTMLButtonElement>(null)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  if (demo !== 'loading' && demo !== 'error' && !post) return <NotFoundPage what="投稿予定" />

  const editable = post ? canEdit(viewer, post) : false
  const deletable = canDelete(viewer)
  const dialog = get('dialog')

  const changeStatus = (s: Status) => {
    if (!post || s === post.status) return
    if (s === 'published') {
      update({dialog: 'publish', result: null}, {push: true})
      return
    }
    updatePost({...post, status: s})
    update({result: 'status'})
  }

  return (
    <PageLayout containerWidth="large" padding="normal" rowGap="condensed">
      <PageLayout.Header>
        <PageHeader role="banner" aria-label="投稿予定の詳細">
          <PageHeader.ContextArea>
            <PageHeader.ParentLink as={RouterLink} to="/" hidden={false}>
              計画に戻る
            </PageHeader.ParentLink>
          </PageHeader.ContextArea>
          <PageHeader.TitleArea variant="medium">
            <PageHeader.Title as="h1">{post ? post.title : '投稿予定'}</PageHeader.Title>
          </PageHeader.TitleArea>
          {post && (editable || deletable) && !demo ? (
            <PageHeader.Actions>
              <Stack direction="horizontal" gap="condensed" wrap="wrap">
                {editable ? (
                  <>
                    <Button as={RouterLink} to={`/posts/${post.id}/edit`} leadingVisual={PencilIcon}>
                      編集
                    </Button>
                    <ActionMenu anchorRef={statusButtonRef}>
                      <ActionMenu.Button ref={statusButtonRef} trailingAction={ChevronDownIcon}>
                        状態を変更
                      </ActionMenu.Button>
                      <ActionMenu.Overlay width="small">
                        <ActionList selectionVariant="single" role="menu" aria-label="状態">
                          {STATUS_ORDER.map(s => (
                            <ActionList.Item key={s} role="menuitemradio" selected={post.status === s} aria-checked={post.status === s} onSelect={() => changeStatus(s)}>
                              {STATUS_LABEL[s]}
                              {s === 'published' && post.status !== 'published' ? <ActionList.Description variant="block">公開日と記事 URL を記録します</ActionList.Description> : null}
                            </ActionList.Item>
                          ))}
                        </ActionList>
                      </ActionMenu.Overlay>
                    </ActionMenu>
                  </>
                ) : null}
                {deletable ? (
                  <Button ref={deleteButtonRef} variant="danger" leadingVisual={TrashIcon} onClick={() => update({dialog: 'delete'}, {push: true})}>
                    削除
                  </Button>
                ) : null}
              </Stack>
            </PageHeader.Actions>
          ) : null}
        </PageHeader>
      </PageLayout.Header>
      <PageLayout.Content as="main" aria-label="本文">
        <Stack gap="normal">
          <ResultBanner />
          {demo === 'loading' ? (
            <div aria-busy="true">
              <div role="status">
                <VisuallyHidden>投稿予定を読み込んでいます</VisuallyHidden>
              </div>
              <Stack gap="normal" aria-hidden="true">
                <SkeletonText lines={2} maxWidth="50%" />
                <SkeletonText lines={4} />
              </Stack>
            </div>
          ) : demo === 'error' ? (
            <LoadError what="投稿予定" />
          ) : post ? (
            <>
              <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
                <StatusLabel status={post.status} />
                {overdueDays(post) > 0 ? <Label variant="danger">{overdueDays(post)} 日遅れ</Label> : null}
                {isMine(post, viewerId(viewer)) ? <Label variant="primary">あなたの担当</Label> : null}
                <Text size="small">{dateText(post)}</Text>
              </Stack>
              <dl className={classes.Fields}>
                <Field label="カテゴリ">{post.category}</Field>
                <Field label="書く人">{post.authorIds.map(memberName).join('、')}</Field>
                <Field label="公開予定日">{post.plannedDate ? formatDate(post.plannedDate, true) : '未定'}</Field>
                <Field label="状態">{STATUS_LABEL[post.status]}</Field>
                {post.status === 'published' ? (
                  <>
                    <Field label="公開日">{post.publishedDate ? formatDate(post.publishedDate, true) : '記録されていません'}</Field>
                    <Field label="記事 URL">
                      {post.url ? (
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                          {post.url} <LinkExternalIcon aria-label="（新しいタブで開きます）" />
                        </Link>
                      ) : (
                        '記録されていません'
                      )}
                    </Field>
                  </>
                ) : null}
                <Field label="メモ">{post.note || 'なし'}</Field>
              </dl>
              {!editable ? (
                <Stack direction="horizontal" gap="condensed" align="center">
                  <InfoIcon />
                  <Text size="small">
                    {viewer.kind === 'guest'
                      ? '編集や状態の変更をするには、右上の「Slack でログイン」からログインしてください。'
                      : 'この投稿予定を編集できるのは、書く人と編集担当です。変更が必要なときは書く人か編集担当に Slack で伝えてください。'}
                  </Text>
                </Stack>
              ) : null}
            </>
          ) : null}
        </Stack>

        {post && editable && dialog === 'publish' ? (
          <PublishDialog
            post={post}
            onClose={() => update({dialog: null})}
            onSave={(publishedDate, url) => {
              updatePost({...post, status: 'published', publishedDate, url})
              update({dialog: null, result: 'published'})
            }}
            returnFocusRef={statusButtonRef}
          />
        ) : null}
        {post && deletable && dialog === 'delete' ? (
          <DeleteDialog
            post={post}
            failInitially={get('error') === 'delete'}
            shouldFail={get('fail') === 'delete'}
            onCancel={() => update({dialog: null, error: null})}
            onDeleted={() => {
              deletePost(post.id)
              navigate(`/?result=deleted&title=${encodeURIComponent(post.title)}`)
            }}
          />
        ) : null}
      </PageLayout.Content>
    </PageLayout>
  )
}

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className={classes.Field}>
      <dt className={classes.Term}>{label}</dt>
      <dd className={classes.Desc}>{children}</dd>
    </div>
  )
}

/** D1 公開を記録：2 項目なのでダイアログ（patterns/create.md:69） */
function PublishDialog({
  post,
  onClose,
  onSave,
  returnFocusRef,
}: {
  post: Post
  onClose: () => void
  onSave: (date: string, url: string) => void
  returnFocusRef: React.RefObject<HTMLButtonElement>
}) {
  const [date, setDate] = useState(post.publishedDate ?? TODAY)
  const [url, setUrl] = useState(post.url ?? '')
  const [errors, setErrors] = useState<{date?: string; url?: string}>({})
  const dateRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    const e: typeof errors = {}
    if (!isValidDate(date)) e.date = '公開日を入力してください。'
    if (!/^https?:\/\/\S+$/.test(url.trim())) e.url = '記事の URL を https:// から入力してください。'
    setErrors(e)
    if (e.date) dateRef.current?.focus()
    else if (e.url) urlRef.current?.focus()
    else onSave(date, url.trim())
  }

  return (
    <Dialog
      title="公開を記録"
      subtitle={`「${post.title}」を公開済みにします。`}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      position={{narrow: 'fullscreen', regular: 'center', wide: 'center'}}
      footerButtons={[
        {buttonType: 'default', content: 'キャンセル', onClick: onClose},
        {buttonType: 'primary', content: '公開を記録', onClick: submit},
      ]}
    >
      <Stack gap="normal">
        <FormControl required>
          <FormControl.Label>公開日</FormControl.Label>
          <TextInput ref={dateRef} type="date" value={date} onChange={e => setDate(e.target.value)} block />
          {errors.date ? <FormControl.Validation variant="error">{errors.date}</FormControl.Validation> : null}
        </FormControl>
        <FormControl required>
          <FormControl.Label>記事 URL</FormControl.Label>
          <TextInput ref={urlRef} type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/blog/..." block />
          {errors.url ? <FormControl.Validation variant="error">{errors.url}</FormControl.Validation> : null}
        </FormControl>
      </Stack>
    </Dialog>
  )
}

/** D2 削除の確認。失敗したらダイアログを閉じずに中に Banner（patterns/delete.md:27,41） */
function DeleteDialog({
  post,
  failInitially,
  shouldFail,
  onCancel,
  onDeleted,
}: {
  post: Post
  failInitially: boolean
  shouldFail: boolean
  onCancel: () => void
  onDeleted: () => void
}) {
  const [failed, setFailed] = useState(failInitially)
  return (
    <ConfirmationDialog
      title="投稿予定を削除しますか？"
      confirmButtonContent="投稿予定を削除"
      confirmButtonType="danger"
      cancelButtonContent="キャンセル"
      onClose={gesture => {
        if (gesture !== 'confirm') return onCancel()
        if (shouldFail || failInitially) setFailed(true)
        else onDeleted()
      }}
    >
      <Stack gap="normal">
        {failed ? (
          <div role="alert">
            <Banner
              variant="critical"
              title="削除できませんでした"
              description="通信が一時的に切れた可能性があります。投稿予定は削除されていません。もう一度「投稿予定を削除」を押してください。"
              flush
            />
          </div>
        ) : null}
        <Text as="p">
          「{post.title}」を削除します。削除すると元に戻せません。予定をやめるだけなら、削除せずに状態を「取りやめ」にすると記録が残ります。
        </Text>
      </Stack>
    </ConfirmationDialog>
  )
}
