// 投稿の追加・編集、公開済みにする、削除のダイアログ。開閉は URL の ?dialog= で決まる。
import { type ChangeEvent, type FC, type FormEvent, useCallback, useState } from 'react'
import {
  Cluster,
  ControlledActionDialog,
  ControlledFormDialog,
  DefinitionList,
  DefinitionListItem,
  Fieldset,
  FormControl,
  Input,
  MultiCombobox,
  RadioButton,
  RequiredLabel,
  Stack,
  Text,
  Textarea,
} from 'smarthr-ui'

import { CATEGORIES, MEMBERS, type Post, STATUSES, STATUS_LABEL, type Status, TODAY, isValidDate } from '../domain'
import { useRouter } from '../router'
import { useStore } from '../store'

type Item = { label: string; value: string }
const MEMBER_ITEMS: Item[] = MEMBERS.map((m) => ({ label: m.name, value: String(m.id) }))

const SAVE_ERROR = '保存できませんでした。時間をおいて、もう一度保存してください。入力した内容は残っています。'
const DELETE_ERROR = '削除できませんでした。時間をおいて、もう一度削除してください。'

/** ?result=save-error / delete-error のとき、操作を失敗させる（状態の確認用） */
const useForcedFailure = (kind: 'save' | 'delete') => {
  const { params } = useRouter()
  return params.get('result') === `${kind}-error`
}

type FormState = {
  title: string
  category: Post['category']
  authors: Item[]
  plannedDate: string
  status: Status
  publishedDate: string
  url: string
  note: string
}

const toFormState = (post: Post | null, viewerId: number | null): FormState => ({
  title: post?.title ?? '',
  category: post?.category ?? '技術',
  // 追加のときは、ログイン中の自分を書く人の初期値にする
  authors: MEMBER_ITEMS.filter((i) => (post ? post.authorIds : [viewerId]).includes(Number(i.value))),
  plannedDate: post?.plannedDate ?? '',
  status: post?.status ?? 'idea',
  publishedDate: post?.publishedDate ?? '',
  url: post?.url ?? '',
  note: post?.note ?? '',
})

type Errors = Partial<Record<'title' | 'authors' | 'publishedDate' | 'url', string>>

const validate = (form: FormState): Errors => {
  const errors: Errors = {}
  if (!form.title.trim()) errors.title = 'タイトルを入力してください。仮のタイトルでもかまいません。'
  if (form.authors.length === 0) errors.authors = '書く人を1人以上選んでください。'
  if (form.status === 'published' && !isValidDate(form.publishedDate))
    errors.publishedDate = '公開済みにする場合は、公開日を入力してください。'
  if (form.url && !/^https?:\/\//.test(form.url)) errors.url = '記事のURLはhttps://から入力してください。'
  return errors
}

export const PostFormDialog: FC<{ post: Post | null; isOpen: boolean; onClose: () => void }> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { viewer, savePost } = useStore()
  const { navigate, href } = useRouter()
  const forcedFailure = useForcedFailure('save')
  const [form, setForm] = useState(() => toFormState(post, viewer?.id ?? null))
  const [errors, setErrors] = useState<Errors>({})
  const [failed, setFailed] = useState(false)

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }, [])

  const handleChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      update(e.currentTarget.name as 'title' | 'plannedDate' | 'publishedDate' | 'url' | 'note', e.currentTarget.value)
    },
    [update],
  )
  const handleChangeCategory = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => update('category', e.currentTarget.value as Post['category']),
    [update],
  )
  const handleChangeStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.value as Status
      update('status', status)
      // 公開済みにしたら、公開日の初期値に今日を入れる
      if (status === 'published') setForm((current) => ({ ...current, publishedDate: current.publishedDate || TODAY }))
    },
    [update],
  )
  const handleSelectAuthor = useCallback((item: { value: string }) => {
    const found = MEMBER_ITEMS.find((i) => i.value === item.value)
    if (found) setForm((current) => ({ ...current, authors: [...current.authors, found] }))
  }, [])
  const handleDeleteAuthor = useCallback(
    (item: { value: string }) =>
      setForm((current) => ({ ...current, authors: current.authors.filter((a) => a.value !== item.value) })),
    [],
  )

  // 必須の未入力はブラウザ標準のツールチップではなく FormControl の errorMessages で伝える（FormControl のチェックリスト）
  const handleInvalid = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault()
      setErrors(validate(form))
    },
    [form],
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const nextErrors = validate(form)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return
      if (forcedFailure) {
        setFailed(true)
        return
      }
      const saved = savePost({
        id: post?.id,
        title: form.title.trim(),
        category: form.category,
        authorIds: form.authors.map((a) => Number(a.value)),
        plannedDate: form.plannedDate || null,
        status: form.status,
        publishedDate: form.status === 'published' ? form.publishedDate : undefined,
        url: form.url || undefined,
        note: form.note || undefined,
      })
      navigate(href(`/posts/${saved.id}`, { result: post ? 'saved' : 'added' }), { replace: !!post })
    },
    [form, forcedFailure, href, navigate, post, savePost],
  )

  const isPublished = form.status === 'published'

  return (
    <ControlledFormDialog
      isOpen={isOpen}
      heading={post ? '投稿の編集' : '投稿の追加'}
      actionButton={{ text: post ? '保存' : '追加', theme: 'primary' }}
      onSubmit={handleSubmit}
      onClickClose={onClose}
      responseStatus={failed || forcedFailure ? { status: 'error', text: SAVE_ERROR } : undefined}
      size="M"
    >
      <Stack gap={1.5}>
        <FormControl label="タイトル" statusLabels={[<RequiredLabel key="required" />]} errorMessages={errors.title}>
          <Input name="title" value={form.title} onChange={handleChangeText} onInvalid={handleInvalid} required width="100%" />
        </FormControl>
        <Fieldset legend="カテゴリ">
          <Cluster gap={1.25}>
            {CATEGORIES.map((c) => (
              <RadioButton key={c} name="category" value={c} checked={form.category === c} onChange={handleChangeCategory}>
                {c}
              </RadioButton>
            ))}
          </Cluster>
        </Fieldset>
        <FormControl
          label="書く人"
          statusLabels={[<RequiredLabel key="required" />]}
          helpMessage="共著の場合は全員を選んでください。"
          errorMessages={errors.authors}
        >
          <MultiCombobox
            name="authors"
            items={MEMBER_ITEMS}
            selectedItems={form.authors}
            onSelect={handleSelectAuthor}
            onDelete={handleDeleteAuthor}
            width="100%"
          />
        </FormControl>
        <FormControl label="公開予定日" helpMessage="決まっていない場合は空欄にしてください。">
          <Input type="date" name="plannedDate" value={form.plannedDate} onChange={handleChangeText} />
        </FormControl>
        <Fieldset legend="ステータス">
          <Cluster gap={1.25}>
            {STATUSES.map((s) => (
              <RadioButton key={s} name="status" value={s} checked={form.status === s} onChange={handleChangeStatus}>
                {STATUS_LABEL[s]}
              </RadioButton>
            ))}
          </Cluster>
        </Fieldset>
        {isPublished && (
          <>
            <FormControl label="公開日" statusLabels={[<RequiredLabel key="required" />]} errorMessages={errors.publishedDate}>
              <Input
                type="date"
                name="publishedDate"
                value={form.publishedDate}
                onChange={handleChangeText}
                onInvalid={handleInvalid}
                required
              />
            </FormControl>
            <FormControl label="記事のURL" exampleMessage="https://example.com/blog/16" errorMessages={errors.url}>
              <Input type="url" name="url" value={form.url} onChange={handleChangeText} width="100%" />
            </FormControl>
          </>
        )}
        <FormControl label="メモ">
          <Textarea name="note" value={form.note} onChange={handleChangeText} rows={3} width="100%" />
        </FormControl>
      </Stack>
    </ControlledFormDialog>
  )
}

export const PublishDialog: FC<{ post: Post; isOpen: boolean; onClose: () => void }> = ({ post, isOpen, onClose }) => {
  const { savePost } = useStore()
  const { setParams } = useRouter()
  const forcedFailure = useForcedFailure('save')
  const [publishedDate, setPublishedDate] = useState(post.publishedDate ?? TODAY)
  const [url, setUrl] = useState(post.url ?? '')
  const [errors, setErrors] = useState<Errors>({})

  const handleChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>) => setPublishedDate(e.currentTarget.value), [])
  const handleChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => setUrl(e.currentTarget.value), [])
  const handleInvalid = useCallback((e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setErrors({ publishedDate: '公開日を入力してください。' })
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const nextErrors: Errors = {}
      if (!isValidDate(publishedDate)) nextErrors.publishedDate = '公開日を入力してください。'
      if (url && !/^https?:\/\//.test(url)) nextErrors.url = '記事のURLはhttps://から入力してください。'
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0 || forcedFailure) return
      savePost({ ...post, status: 'published', publishedDate, url: url || undefined })
      setParams({ dialog: null, result: 'published' })
    },
    [forcedFailure, post, publishedDate, savePost, setParams, url],
  )

  return (
    <ControlledFormDialog
      isOpen={isOpen}
      heading="公開済みにする"
      actionButton={{ text: '公開済みにする', theme: 'primary' }}
      onSubmit={handleSubmit}
      onClickClose={onClose}
      responseStatus={forcedFailure ? { status: 'error', text: SAVE_ERROR } : undefined}
      size="S"
    >
      <Stack gap={1.5}>
        <p>「{post.title}」を公開済みにします。公開日と記事のURL を記録してください。</p>
        <FormControl label="公開日" statusLabels={[<RequiredLabel key="required" />]} errorMessages={errors.publishedDate}>
          <Input
            type="date"
            name="publishedDate"
            value={publishedDate}
            onChange={handleChangeDate}
            onInvalid={handleInvalid}
            required
          />
        </FormControl>
        <FormControl label="記事のURL" exampleMessage="https://example.com/blog/16" errorMessages={errors.url}>
          <Input type="url" name="url" value={url} onChange={handleChangeUrl} width="100%" />
        </FormControl>
      </Stack>
    </ControlledFormDialog>
  )
}

export const DeleteDialog: FC<{ post: Post; isOpen: boolean; onClose: () => void }> = ({ post, isOpen, onClose }) => {
  const { deletePost } = useStore()
  const { navigate, href } = useRouter()
  const forcedFailure = useForcedFailure('delete')
  const [failed, setFailed] = useState(false)

  const handleAction = useCallback(() => {
    if (forcedFailure) {
      setFailed(true)
      return
    }
    deletePost(post.id)
    navigate(href('/', { result: 'deleted' }), { replace: true })
  }, [deletePost, forcedFailure, href, navigate, post.id])

  return (
    <ControlledActionDialog
      isOpen={isOpen}
      heading="投稿の削除"
      actionButton={{ text: '削除', theme: 'danger' }}
      onClickAction={handleAction}
      onClickClose={onClose}
      responseStatus={failed || forcedFailure ? { status: 'error', text: DELETE_ERROR } : undefined}
      size="S"
    >
      <Stack>
        <p>{'以下の投稿を削除しますか？　この操作は元に戻せません。'}</p>
        <DefinitionList>
          <DefinitionListItem term="タイトル" fullWidth>
            {post.title}
          </DefinitionListItem>
        </DefinitionList>
        <Text as="p" size="S" color="TEXT_GREY">
          書くのをやめただけの場合は、削除せずにステータスを「取りやめ」にすると、記録として残せます。
        </Text>
      </Stack>
    </ControlledActionDialog>
  )
}
