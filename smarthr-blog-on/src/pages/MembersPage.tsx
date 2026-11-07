// V3 書く人：メンバーごとの予定と実績を比べる（目標 O2）。デスクトップはテーブル、モバイルはリスト。
import { type FC, useMemo } from 'react'
import { Cluster, Heading, PageHeading, Panel, Section, Stack, Table, Td, Text, Th, useEnvironment } from 'smarthr-ui'

import { DataState } from '../components/DataState'
import { type MemberStats, formatDate, memberStats } from '../domain'
import { AppLink, useRouter } from '../router'
import { useStore } from '../store'

const ROLE_LABEL = { member: '一般メンバー', editor: '編集担当' } as const

const Upcoming: FC<{ stats: MemberStats }> = ({ stats }) =>
  stats.upcoming === 0 ? (
    <Text color="TEXT_GREY">予定なし</Text>
  ) : (
    <>{stats.upcoming}本</>
  )

const DesktopTable: FC<{ rows: MemberStats[] }> = ({ rows }) => {
  const { href } = useRouter()
  return (
    <Table>
      <thead>
        <tr>
          <Th>名前</Th>
          <Th>役割</Th>
          <Th align="right">公開済み</Th>
          <Th align="right">これからの予定</Th>
          <Th>最後に公開した日</Th>
          <Th>次の公開予定日</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => (
          <tr key={s.member.id}>
            <Td>
              <AppLink href={href('/', { author: String(s.member.id) })}>{s.member.name}</AppLink>
            </Td>
            <Td>{ROLE_LABEL[s.member.role]}</Td>
            <Td align="right">{s.published}本</Td>
            <Td align="right">
              <Upcoming stats={s} />
            </Td>
            <Td>{s.lastPublished ? formatDate(s.lastPublished, true) : ''}</Td>
            <Td>{s.nextPlanned ? formatDate(s.nextPlanned, true) : ''}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const MobileList: FC<{ rows: MemberStats[] }> = ({ rows }) => {
  const { href } = useRouter()
  return (
    <ul className="shr-m-0 shr-list-none shr-p-0">
      {rows.map((s) => (
        <li key={s.member.id} className="[&_+_&]:shr-border-t-shorthand shr-p-1">
          <Stack gap={0.25}>
            <Cluster align="center">
              <AppLink href={href('/', { author: String(s.member.id) })}>{s.member.name}</AppLink>
              <Text size="S" color="TEXT_GREY">
                {ROLE_LABEL[s.member.role]}
              </Text>
            </Cluster>
            <Text size="S" color="TEXT_GREY" leading="TIGHT">
              公開済み：{s.published}本／これからの予定：{s.upcoming === 0 ? '予定なし' : `${s.upcoming}本`}
              <br />
              最後に公開した日：{s.lastPublished ? formatDate(s.lastPublished) : 'なし'}／次の公開予定日：
              {s.nextPlanned ? formatDate(s.nextPlanned) : 'なし'}
            </Text>
          </Stack>
        </li>
      ))}
    </ul>
  )
}

export const MembersPage: FC = () => {
  const { posts } = useStore()
  const { mobile } = useEnvironment()
  const rows = useMemo(() => memberStats(posts), [posts])
  const noPlan = rows.filter((s) => s.upcoming === 0)

  return (
    <Stack gap={2}>
      <Stack gap={0.5}>
        <PageHeading>書く人</PageHeading>
        <p>
          メンバーごとの、公開済みの本数とこれからの予定です。これからの予定が少ない順に並べています。名前を押すと、その人の投稿計画を表示します。
        </p>
      </Stack>
      <DataState what="書く人">
        <Section>
          <Stack>
            <Heading>メンバー</Heading>
            {noPlan.length > 0 && (
              <Text as="p" size="S">
                これからの予定がない人：{noPlan.map((s) => s.member.name).join('、')}（{noPlan.length}人）
              </Text>
            )}
            <Panel>{mobile ? <MobileList rows={rows} /> : <DesktopTable rows={rows} />}</Panel>
          </Stack>
        </Section>
      </DataState>
    </Stack>
  )
}
