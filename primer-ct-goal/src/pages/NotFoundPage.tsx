import { Heading, PageLayout, Stack } from '@primer/react'
import { Blankslate } from '@primer/react/experimental'
import { AlertIcon } from '@primer/octicons-react'
import { useRouter } from '../router'
import styles from './SchedulePage.module.css'

export function NotFoundPage() {
  const { href } = useRouter()
  return (
    <PageLayout containerWidth="medium">
      <PageLayout.Content as="div">
        <Stack gap="normal">
          <Heading as="h1" variant="medium">
            ページが見つかりません
          </Heading>
          <Blankslate border>
            <Blankslate.Visual>
              <AlertIcon size="medium" className={styles.MutedIcon} />
            </Blankslate.Visual>
            <Blankslate.Heading as="h2">このアドレスのページはありません</Blankslate.Heading>
            <Blankslate.Description>
              アドレスが間違っているか、ページが移動した可能性があります。今週の相手は「組み合わせ」で確かめられます。
            </Blankslate.Description>
            <Blankslate.PrimaryAction href={href('/')}>
              組み合わせに戻る
            </Blankslate.PrimaryAction>
          </Blankslate>
        </Stack>
      </PageLayout.Content>
    </PageLayout>
  )
}
