import { Base, Button, PageHeading, Stack, Text } from 'smarthr-ui'
import type { AppApi } from '../App'

export const NotFoundPage = ({ api }: { api: AppApi }) => (
  <Base padding={2}>
    <Stack gap={1} align="flex-start">
      <PageHeading>ページが見つかりません</PageHeading>
      <Text as="p">お探しのページは、削除されたか URL が間違っている可能性があります。</Text>
      <Button variant="primary" onClick={() => api.navigate('/')}>
        組み合わせへ戻る
      </Button>
    </Stack>
  </Base>
)
