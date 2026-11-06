import { Container, PageHeading, Stack } from 'smarthr-ui'

import { Layout } from '../components/Layout'

/** 未ログインで自分の設定を開いたとき */
export const SignInRequired = () => (
  <Layout title="自分の設定">
    <Container size="NARROW">
      <Stack gap={1.5}>
        <PageHeading>自分の設定</PageHeading>
        <p>自分の設定を変えるには、画面右上の「Slackでログイン」からログインしてください。</p>
      </Stack>
    </Container>
  </Layout>
)
