import {AlertIcon, LockIcon, NoteIcon} from '@primer/octicons-react'
import {Stack, VisuallyHidden} from '@primer/react'
import {Blankslate, SkeletonText} from '@primer/react/experimental'
import type {ReactNode} from 'react'
import {useQuery} from '../url'
import classes from './PostList.module.css'

/** 読み込み中：一覧が出る場所に骨組みを出す（patterns/view.md:97「Show a placeholder where it will appear」、ページ全体のスピナーにはしない） */
export function ListSkeleton({label, rows = 4}: {label: string; rows?: number}) {
  return (
    <div aria-busy="true">
      <div role="status">
        <VisuallyHidden>{label}</VisuallyHidden>
      </div>
      <ul className={`${classes.List} ${classes.Box}`} aria-hidden="true">
        {Array.from({length: rows}, (_, i) => (
          <li key={i} className={classes.Row}>
            <Stack gap="condensed">
              <SkeletonText size="bodyLarge" maxWidth="60%" />
              <SkeletonText size="bodySmall" maxWidth="40%" />
            </Stack>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** 読み込みの失敗：内容が出る場所で、何が起きたかと次にできることを伝える（patterns/empty-states.md:35,43,105） */
export function LoadError({what}: {what: string}) {
  const {update} = useQuery()
  return (
    <div role="alert">
      <Blankslate border>
        <Blankslate.Visual>
          <AlertIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading as="h2">{what}を読み込めませんでした</Blankslate.Heading>
        <Blankslate.Description>
          通信が一時的に切れた可能性があります。もう一度読み込んでください。続くときは、取りまとめ役（編集担当）に Slack で知らせてください。
        </Blankslate.Description>
        <Blankslate.PrimaryAction onClick={() => update({state: null})}>もう一度読み込む</Blankslate.PrimaryAction>
      </Blankslate>
    </div>
  )
}

/** データが無い */
export function EmptyState({heading, description, action}: {heading: string; description: ReactNode; action?: ReactNode}) {
  return (
    <Blankslate border>
      <Blankslate.Visual>
        <NoteIcon size="medium" />
      </Blankslate.Visual>
      <Blankslate.Heading as="h2">{heading}</Blankslate.Heading>
      <Blankslate.Description>{description}</Blankslate.Description>
      {action}
    </Blankslate>
  )
}

/** 権限が無い（ログインが要る／担当外）。Blankslate＋次にできること */
export function NoPermission({heading, description, action}: {heading: string; description: ReactNode; action?: ReactNode}) {
  return (
    <Blankslate border>
      <Blankslate.Visual>
        <LockIcon size="medium" />
      </Blankslate.Visual>
      <Blankslate.Heading as="h2">{heading}</Blankslate.Heading>
      <Blankslate.Description>{description}</Blankslate.Description>
      {action}
    </Blankslate>
  )
}
