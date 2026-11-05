import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Button,
  Center,
  Cluster,
  Container,
  ControlledActionDialog,
  DefinitionList,
  DefinitionListItem,
  EmptyTableBody,
  FaRightToBracketIcon,
  FaTrashCanIcon,
  Heading,
  PageHeading,
  Panel,
  Section,
  Stack,
  StatusLabel,
  Table,
  Td,
  Text,
  TextLink,
  Th,
  WarningIcon,
  useEnvironment,
} from 'smarthr-ui'

import { Layout } from '../components/Layout'
import { Person } from '../components/Person'
import { empCode, isIncomplete, type Member } from '../data/model'
import { useAppState } from '../state'

const RouterTextLink = ({ to, children }: { to: string; children: string }) => {
  const { search } = useLocation()
  return (
    <TextLink elementAs={Link} to={`${to}${search}`}>
      {children}
    </TextLink>
  )
}

/** 参加／不参加。色だけでなく文字で区別する [H:StatusLabel] */
const ActiveLabel = ({ member }: { member: Member }) =>
  member.active ? <StatusLabel type="blue">参加</StatusLabel> : <StatusLabel type="grey">不参加</StatusLabel>

const IncompleteNote = ({ member }: { member: Member }) =>
  isIncomplete(member) ? (
    <Text size="S" icon={<WarningIcon />}>
      初回設定が未完了
    </Text>
  ) : null

const DeleteButton = ({ member, onClick, iconOnly }: { member: Member; onClick: () => void; iconOnly?: boolean }) =>
  iconOnly ? (
    <Button onClick={onClick} aria-label={`${member.name}さんを削除`}>
      <FaTrashCanIcon alt={`${member.name}さんを削除`} />
    </Button>
  ) : (
    <Button size="S" prefix={<FaTrashCanIcon />} onClick={onClick} aria-label={`${member.name}さんを削除`}>
      削除
    </Button>
  )

/** デスクトップ：コレクション（テーブル）[H:page-layout][H:smarthr-table] */
const MemberTable = ({ members, onDelete }: { members: Member[]; onDelete: (m: Member) => void }) => {
  const { me } = useAppState()
  return (
    <Table>
      <thead>
        <tr>
          <Th>社員番号</Th>
          <Th>名前</Th>
          <Th>参加状況</Th>
          <Th>uチャンネル</Th>
          {me && <Th>操作</Th>}
        </tr>
      </thead>
      {members.length === 0 ? (
        <EmptyTableBody>
          <EmptyMessage />
        </EmptyTableBody>
      ) : (
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <Td>{empCode(m)}</Td>
              <Td>
                <Stack gap={0.25}>
                  <Person member={m} note={me?.id === m.id ? 'あなた' : undefined} />
                  <IncompleteNote member={m} />
                </Stack>
              </Td>
              <Td contentWidth="1px">
                <ActiveLabel member={m} />
              </Td>
              <Td>{m.channel ? `#${m.channel}` : ''}</Td>
              {me && (
                <Td contentWidth="1px">
                  {me.id === m.id ? (
                    <RouterTextLink to="/settings">設定を変更</RouterTextLink>
                  ) : (
                    <DeleteButton member={m} onClick={() => onDelete(m)} />
                  )}
                </Td>
              )}
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  )
}

/** モバイル：コレクション（リスト）。詳細ビューを持たないので、操作はアイコンボタン 1 つ [H:smarthr-list] */
const MemberList = ({ members, onDelete }: { members: Member[]; onDelete: (m: Member) => void }) => {
  const { me } = useAppState()
  if (members.length === 0)
    return (
      <Panel padding={1}>
        <EmptyMessage />
      </Panel>
    )
  return (
    <Panel>
      <Stack as="ul" gap={0} className="shr-list-none shr-ps-0">
        {members.map((m, i) => (
          <li key={m.id} className={i > 0 ? 'shr-border-t-shorthand' : undefined}>
            <Cluster justify="space-between" align="center" className="shr-p-1">
              <Stack gap={0.25}>
                <Person member={m} note={me?.id === m.id ? 'あなた' : undefined} />
                <Cluster gap={0.5} align="center">
                  <ActiveLabel member={m} />
                  <Text size="S" color="TEXT_GREY" leading="TIGHT">
                    社員番号：{empCode(m)}
                  </Text>
                </Cluster>
                <IncompleteNote member={m} />
              </Stack>
              {me &&
                (me.id === m.id ? (
                  <RouterTextLink to="/settings">設定を変更</RouterTextLink>
                ) : (
                  <DeleteButton member={m} onClick={() => onDelete(m)} iconOnly />
                ))}
            </Cluster>
          </li>
        ))}
      </Stack>
    </Panel>
  )
}

const EmptyMessage = () => {
  const { me, login } = useAppState()
  return (
    <Center padding={1.5}>
      <Stack gap={1} align="center">
        <Text as="p">表示するデータはありません。</Text>
        <Text as="p" size="S" color="TEXT_GREY">
          メンバーは Slack でログインすると追加されます。
        </Text>
        {!me && (
          <Button size="S" variant="secondary" prefix={<FaRightToBracketIcon />} onClick={login}>
            Slack でログイン
          </Button>
        )}
      </Stack>
    </Center>
  )
}

export const Members = () => {
  const { members, me, deleteTargetId, failDelete, deleteMember, setNotice } = useAppState()
  const { mobile } = useEnvironment()
  const [target, setTarget] = useState<Member | null>(
    () => (deleteTargetId && members.find((m) => m.id === deleteTargetId)) || null,
  )
  const [status, setStatus] = useState<
    { status: 'processing' } | { status: 'error'; text: string } | undefined
  >(() =>
    deleteTargetId && failDelete
      ? { status: 'error', text: '削除できませんでした。通信状況を確認して、もう一度「削除」を押してください。' }
      : undefined,
  )

  const sorted = [...members].sort((a, b) => a.id - b.id)
  const activeCount = members.filter((m) => m.active).length
  const inactiveCount = members.length - activeCount

  const open = (m: Member) => {
    setStatus(undefined)
    setTarget(m)
  }
  const close = () => {
    setTarget(null)
    setStatus(undefined)
  }

  return (
    <Layout title="メンバー">
      <Container>
        <Stack gap={2}>
          <Stack gap={0.5}>
            <PageHeading>メンバー</PageHeading>
            <Text as="p">
              一度でもログインしたことのある人を、社員番号順に表示しています。「参加」の人だけが組み合わせに入ります。
            </Text>
          </Stack>
          <Section>
            <Stack gap={1}>
              <Cluster justify="space-between" align="center" gap={1}>
                <Heading>参加状況</Heading>
                <Text>
                  参加 {activeCount} 人・不参加 {inactiveCount} 人（全 {members.length} 人）
                </Text>
              </Cluster>
              {mobile ? (
                <MemberList members={sorted} onDelete={open} />
              ) : (
                <Panel>
                  <MemberTable members={sorted} onDelete={open} />
                </Panel>
              )}
              {!me && members.length > 0 && (
                <Text as="p" size="S" color="TEXT_GREY">
                  ログインすると、退職した人などをメンバーから削除できます。
                </Text>
              )}
            </Stack>
          </Section>
        </Stack>
      </Container>

      {/* 削除ダイアログ [H:delete-dialog] */}
      <ControlledActionDialog
        isOpen={target !== null}
        heading="メンバーの削除"
        size="S"
        actionButton={{ text: '削除', theme: 'danger' }}
        responseStatus={status}
        onClickClose={close}
        onClickAction={async () => {
          if (!target) return
          setStatus({ status: 'processing' })
          try {
            await deleteMember(target.id)
            setNotice({ type: 'success', text: `${target.name}さんをメンバーから削除しました。` })
            close()
          } catch {
            setStatus({
              status: 'error',
              text: '削除できませんでした。通信状況を確認して、もう一度「削除」を押してください。',
            })
          }
        }}
      >
        {target && (
          <Stack gap={1.5}>
            <Text as="p">以下のメンバーを削除しますか？　この操作は元に戻せません。</Text>
            <DefinitionList>
              <DefinitionListItem term={{ text: '削除するメンバー', styleType: 'blockTitle' }}>
                {target.name}（社員番号 {empCode(target)}）
              </DefinitionListItem>
            </DefinitionList>
            {target.active && (
              <Text as="p" icon={<WarningIcon />}>
                このメンバーは CT に参加中です。削除すると、今週以降の全員の組み合わせが組み直されます。
              </Text>
            )}
          </Stack>
        )}
      </ControlledActionDialog>
    </Layout>
  )
}
