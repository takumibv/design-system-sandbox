import { useEffect, useRef, useState } from 'react'
import { AriaStatus, Banner, Button, ConfirmationDialog, Heading, IconButton, Label, PageLayout, Stack, Text } from '@primer/react'
import { Blankslate, InlineMessage } from '@primer/react/experimental'
import { AlertIcon, PeopleIcon, TrashIcon } from '@primer/octicons-react'
import { isIncomplete, type Member } from '../data/model'
import { useLinkHandler, useRouter } from '../router'
import { useAppState } from '../state'
import { PersonAvatar } from '../components/PersonAvatar'
import listStyles from '../pages/SchedulePage.module.css'
import styles from './MembersPage.module.css'

export function MembersPage() {
  const { scenario, members, me, removeMember, login } = useAppState()
  const { navigate, href } = useRouter()
  const link = useLinkHandler()
  const [target, setTarget] = useState<Member | undefined>(() =>
    me ? members.find((m) => m.id === scenario.confirmDelete && m.id !== me.id) : undefined,
  )
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(scenario.result === 'delete-failed' && target !== undefined)
  const [deletedName, setDeletedName] = useState<string>()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (deletedName) headingRef.current?.focus()
  }, [deletedName])

  const pageTitle = (
    <Heading as="h1" variant="medium" ref={headingRef} tabIndex={-1}>
      メンバー
    </Heading>
  )

  if (scenario.data === 'loading' || scenario.data === 'error') {
    return (
      <PageLayout containerWidth="large">
        <PageLayout.Content as="div">
          <Stack gap="normal">
            {pageTitle}
            {scenario.data === 'loading' ? (
              <AriaStatus>メンバーを読み込んでいます</AriaStatus>
            ) : (
              <Blankslate border>
                <Blankslate.Visual>
                  <AlertIcon size="medium" className={listStyles.MutedIcon} />
                </Blankslate.Visual>
                <Blankslate.Heading as="h2">メンバーを読み込めませんでした</Blankslate.Heading>
                <Blankslate.Description>少し待ってから、もう一度読み込んでください。</Blankslate.Description>
                <Blankslate.PrimaryAction onClick={() => navigate('/members', { data: undefined })}>
                  もう一度読み込む
                </Blankslate.PrimaryAction>
              </Blankslate>
            )}
          </Stack>
        </PageLayout.Content>
      </PageLayout>
    )
  }

  const active = members.filter((m) => m.active)
  const inactive = members.filter((m) => !m.active)
  const incomplete = members.filter(isIncomplete)

  const close = async (gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => {
    if (!target) return
    if (gesture !== 'confirm') {
      setTarget(undefined)
      setDeleteError(false)
      return
    }
    setDeleting(true)
    setDeleteError(false)
    try {
      await removeMember(target.id)
      setDeletedName(target.name)
      setTarget(undefined)
    } catch {
      // 失敗したらダイアログを閉じず、中に Banner critical を出す（Delete パターン）
      setDeleteError(true)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <PageLayout containerWidth="large">
      <PageLayout.Content as="div">
        <Stack gap="normal">
          <Stack gap="condensed">
            {pageTitle}
            <Text as="p" className={listStyles.Muted}>
              Slack でログインしたことのある人を、社員番号順に並べています。組み合わせに入るのは「参加」の人だけです。
            </Text>
          </Stack>

          {!me ? (
            <Banner
              variant="info"
              title="ログインすると、自分の参加設定を変えられます"
              description="退職した人など、いなくなったメンバーの削除もログイン中の人だけができます。"
              primaryAction={<Banner.PrimaryAction onClick={login}>Slack でログイン</Banner.PrimaryAction>}
            />
          ) : null}

          {deletedName ? (
            <InlineMessage variant="success">
              {deletedName} さんを削除しました。今週以降の組み合わせは組み直されます。
            </InlineMessage>
          ) : null}
          <AriaStatus>{deletedName ? `${deletedName} さんを削除しました` : ''}</AriaStatus>

          {members.length === 0 ? (
            <Blankslate border>
              <Blankslate.Visual>
                <PeopleIcon size="medium" />
              </Blankslate.Visual>
              <Blankslate.Heading as="h2">まだメンバーがいません</Blankslate.Heading>
              <Blankslate.Description>
                Slack でログインした人が、ここに社員番号順で表示されます。最初の 1 人として、ログインして設定を始めましょう。
              </Blankslate.Description>
              {!me ? <Blankslate.PrimaryAction onClick={login}>Slack でログイン</Blankslate.PrimaryAction> : null}
            </Blankslate>
          ) : (
            <>
              <Stack direction="horizontal" gap="normal" wrap="wrap" aria-label="人数の内訳">
                <Text>
                  参加 <strong>{active.length}</strong> 人
                </Text>
                <Text>
                  不参加 <strong>{inactive.length}</strong> 人
                </Text>
                {incomplete.length > 0 ? (
                  <Text>
                    初回設定が未完了 <strong>{incomplete.length}</strong> 人
                  </Text>
                ) : null}
                <Text className={listStyles.Muted}>全 {members.length} 人</Text>
              </Stack>

              <ul className={listStyles.PairList} aria-label="メンバー一覧（社員番号順）">
                {[...members]
                  .sort((a, b) => a.id - b.id)
                  .map((m) => {
                    const mine = m.id === me?.id
                    return (
                      <li key={m.id} className={listStyles.PairRow}>
                        <div className={styles.Row}>
                          <PersonAvatar member={m} size={32} />
                          <Stack gap="none" className={styles.Who}>
                            <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
                              <Text weight="semibold">{m.name}</Text>
                              {mine ? <Label variant="accent">あなた</Label> : null}
                            </Stack>
                            <Text size="small" className={listStyles.Muted}>
                              社員番号 {m.incomplete ? '未設定' : m.id}・{m.channel ? `#${m.channel}` : 'uチャンネル未設定'}
                            </Text>
                          </Stack>
                          <Stack direction="horizontal" align="center" gap="condensed" wrap="wrap" className={styles.Status}>
                            {m.active ? <Label variant="success">参加</Label> : <Label variant="secondary">不参加</Label>}
                            {isIncomplete(m) ? <Label variant="attention">初回設定が未完了</Label> : null}
                          </Stack>
                          <div className={styles.Actions}>
                            {mine ? (
                              <Button as="a" href={href('/settings')} onClick={link('/settings')} size="small">
                                設定を変える
                              </Button>
                            ) : me ? (
                              <IconButton
                                icon={TrashIcon}
                                variant="invisible"
                                size="small"
                                aria-label={`${m.name} さんを削除`}
                                onClick={() => {
                                  setDeleteError(false)
                                  setTarget(m)
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </li>
                    )
                  })}
              </ul>
            </>
          )}
        </Stack>

        {target ? (
          <ConfirmationDialog
            title={`${target.name} さんを削除しますか？`}
            onClose={close}
            confirmButtonContent={deleting ? '削除しています…' : '削除する'}
            confirmButtonType="danger"
            cancelButtonContent="キャンセル"
            overrideButtonFocus="cancel"
          >
            <Stack gap="normal">
              {deleteError ? (
                <Banner
                  variant="critical"
                  title="削除できませんでした"
                  description="通信が途切れた可能性があります。メンバーはまだ削除されていません。もう一度「削除する」を押してください。"
                  flush
                />
              ) : null}
              <Text as="p">
                {target.name} さんをメンバーから削除します。この操作は取り消せません。
                {target.active ? '参加者が 1 人減るため、今週以降の全員の組み合わせが組み直されます。' : ''}
              </Text>
              <Text as="p" size="small" className={listStyles.Muted}>
                本人が再び Slack でログインすると、初回設定からやり直しになります。
              </Text>
            </Stack>
          </ConfirmationDialog>
        ) : null}
      </PageLayout.Content>
    </PageLayout>
  )
}
