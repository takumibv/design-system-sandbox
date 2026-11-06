import { useState } from 'react'
import {
  Base,
  Button,
  Cluster,
  ControlledActionDialog,
  FaTrashCanIcon,
  PageHeading,
  Stack,
  StatusLabel,
  Table,
  Td,
  Text,
  Th,
  VisuallyHiddenText,
  useEnvironment,
} from 'smarthr-ui'
import type { AppApi } from '../App'
import type { Member } from '../fixtures'
import { empNo, Person } from '../Person'

type Props = { api: AppApi }

type DialogState = { target: Member; status?: { status: 'error'; text: string } | { status: 'processing' } } | null

const initialDialog = (api: AppApi): DialogState => {
  const t = api.scenario.members.find((m) => m.id === 10)
  if (!t) return null
  if (api.scenario.state === 'delete-confirm') return { target: t }
  if (api.scenario.state === 'delete-error')
    return {
      target: t,
      status: {
        status: 'error',
        text: '削除できませんでした。通信状態を確かめて、もう一度「削除」を押してください。',
      },
    }
  return null
}

export const MembersPage = ({ api }: Props) => {
  const { scenario, me } = api
  const env = useEnvironment()
  const [dialog, setDialog] = useState<DialogState>(() => initialDialog(api))
  const members = [...scenario.members].sort((a, b) => a.id - b.id)
  const active = members.filter((m) => m.active).length
  const inactive = members.length - active

  const actionFor = (m: Member) =>
    m.id === me?.id ? (
      <Button size="S" onClick={() => api.navigate('/settings')}>
        自分の設定を変える
      </Button>
    ) : (
      <Button size="S" prefix={<FaTrashCanIcon />} onClick={() => setDialog({ target: m })}>
        削除<VisuallyHiddenText>（{m.name}さん）</VisuallyHiddenText>
      </Button>
    )

  const doDelete = () => {
    if (!dialog) return
    const target = dialog.target
    setDialog({ target, status: { status: 'processing' } })
    window.setTimeout(() => {
      api.setScenario((s) => ({ ...s, members: s.members.filter((m) => m.id !== target.id) }))
      setDialog(null)
      api.notify({ type: 'success', text: `${target.name}さんをメンバーから削除しました。今週以降の組み合わせは組み直されます。` })
    }, 400)
  }

  return (
    <Stack gap={1.5}>
      <Stack gap={0.5}>
        <PageHeading>メンバー</PageHeading>
        <Text as="p" color="TEXT_GREY">
          ログインしたことのある全員です。社員番号順に並んでいます。組み合わせに入るのは「参加」の人だけです。
        </Text>
      </Stack>

      {members.length > 0 && (
        <Cluster gap={1}>
          <Text>
            参加 <Text weight="bold" size="L">{active}</Text> 人
          </Text>
          <Text>
            不参加 <Text weight="bold" size="L">{inactive}</Text> 人
          </Text>
        </Cluster>
      )}

      {members.length === 0 ? (
        <Base padding={2}>
          <Stack gap={1} align="center">
            <Text as="p" weight="bold">
              まだメンバーがいません
            </Text>
            <Text as="p" color="TEXT_GREY">
              Slack アカウントでログインした人が、ここにメンバーとして追加されます。
            </Text>
            {!me && (
              <Button variant="primary" onClick={api.login}>
                Slack でログイン
              </Button>
            )}
          </Stack>
        </Base>
      ) : env.mobile ? (
        <Stack gap={0.5} role="list">
          {members.map((m) => (
            <Base key={m.id} role="listitem" padding={1}>
              <Stack gap={0.5}>
                <Cluster gap={0.5} align="center" justify="space-between">
                  <Person member={m} isMe={m.id === me?.id} />
                  <StatusLabels m={m} />
                </Cluster>
                <Text size="S" color="TEXT_GREY">
                  社員番号 {m.incomplete ? '未設定' : empNo(m)}・uチャンネル {m.channel ? `#${m.channel}` : '未設定'}
                </Text>
                {me && <div>{actionFor(m)}</div>}
              </Stack>
            </Base>
          ))}
        </Stack>
      ) : (
        <Base overflow="hidden">
          <Table>
            <thead>
              <tr>
                <Th>社員番号</Th>
                <Th>メンバー</Th>
                <Th>uチャンネル</Th>
                <Th>参加</Th>
                {me && <Th>操作</Th>}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <Td nullable>{m.incomplete ? null : empNo(m)}</Td>
                  <Td>
                    <Person member={m} isMe={m.id === me?.id} />
                  </Td>
                  <Td nullable>{m.channel ? `#${m.channel}` : null}</Td>
                  <Td>
                    <StatusLabels m={m} />
                  </Td>
                  {me && <Td>{actionFor(m)}</Td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Base>
      )}

      {dialog && (
        <ControlledActionDialog
          isOpen
          heading={`${dialog.target.name}さんを削除しますか？`}
          actionButton={{ text: '削除', theme: 'danger' }}
          closeButton={{ text: 'キャンセル' }}
          onClickAction={doDelete}
          onClickClose={() => setDialog(null)}
          responseStatus={dialog.status}
        >
          <Stack gap={0.5}>
            <Text as="p">
              {dialog.target.name}さんをメンバーから削除します。この操作は取り消せません。
            </Text>
            <Text as="p">
              {dialog.target.active
                ? '参加中の人を削除すると、今週以降の全員の組み合わせが組み直されます。'
                : 'この人は今は不参加なので、組み合わせは変わりません。'}
              もう一度ログインすると、新しいメンバーとして追加されます。
            </Text>
          </Stack>
        </ControlledActionDialog>
      )}
    </Stack>
  )
}

const StatusLabels = ({ m }: { m: Member }) => (
  <Cluster gap={0.5}>
    {m.active ? <StatusLabel type="green">参加</StatusLabel> : <StatusLabel type="grey">不参加</StatusLabel>}
    {m.incomplete && <StatusLabel type="warning">初回設定が未完了</StatusLabel>}
  </Cluster>
)
