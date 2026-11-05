import { Heading, PageLayout, Stack } from '@primer/react'
import { SkeletonAvatar, SkeletonText } from '@primer/react/experimental'
import { AriaStatus } from '@primer/react'
import styles from '../pages/SchedulePage.module.css'

/**
 * 読み込み中：内容が出る場所に骨組み（Skeleton）を置き、読み上げは 1 回だけ（Loading パターン）。
 * ページ全体のスピナーにはしない（View パターン「Keep slow or failed content in place」）。
 */
export function LoadingSchedule() {
  return (
    <PageLayout containerWidth="xlarge">
      <PageLayout.Content as="div">
        <Stack gap="spacious">
          <Heading as="h1" variant="medium">
            組み合わせ
          </Heading>
          <AriaStatus>組み合わせを読み込んでいます</AriaStatus>
          <div aria-hidden="true">
            <Stack gap="normal">
              <SkeletonText size="titleSmall" maxWidth="12em" />
              <Stack direction="horizontal" align="center" gap="normal">
                <SkeletonAvatar size={48} />
                <SkeletonText size="titleLarge" maxWidth="10em" />
              </Stack>
              <SkeletonText lines={2} />
            </Stack>
          </div>
          <div aria-hidden="true">
            <ul className={styles.pairList}>
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className={styles.pairRow}>
                  <SkeletonText maxWidth="20em" />
                </li>
              ))}
            </ul>
          </div>
        </Stack>
      </PageLayout.Content>
      <PageLayout.Pane position="end" width="medium" aria-label="これからの予定（読み込み中）" divider={{ narrow: 'line' }}>
        <div aria-hidden="true">
          <SkeletonText lines={6} />
        </div>
      </PageLayout.Pane>
    </PageLayout>
  )
}
