import { useState } from 'react';
import { Alert, App, Button, Card, Empty, Flex, Listy, Modal, Statistic, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SettingOutlined,
  SlackOutlined,
} from '@ant-design/icons';
import type { Member } from '../fixtures';
import { useActions } from '../actions';
import { navigate, routes } from '../router';
import { findMember, isIncomplete, useScenario } from '../scenario';
import { PersonAvatar } from '../components/Person';
import { LoadError } from '../components/LoadError';

const { Title, Text, Paragraph } = Typography;

const StatusTags = ({ member }: { member: Member }) => (
  <Flex gap="small" wrap>
    {member.active ? (
      <Tag color="success" icon={<CheckCircleOutlined />}>
        参加
      </Tag>
    ) : (
      <Tag icon={<MinusCircleOutlined />}>不参加</Tag>
    )}
    {isIncomplete(member) && (
      <Tag color="warning" icon={<ExclamationCircleOutlined />}>
        初回設定が未完了
      </Tag>
    )}
  </Flex>
);

const MemberRow = ({ member, canDelete, isMe, onDelete }: {
  member: Member;
  canDelete: boolean;
  isMe: boolean;
  onDelete: (member: Member) => void;
}) => (
  <Flex justify="space-between" align="center" gap="small">
    <Flex gap="middle" align="center" flex="auto">
      <PersonAvatar member={member} size="large" />
      <Flex vertical gap={4}>
        <Flex gap="small" align="center" wrap>
          <Text strong>{member.name}</Text>
          {isMe && <Tag color="processing">あなた</Tag>}
        </Flex>
        <Text type="secondary">
          社員番号 {member.incomplete ? '未設定' : member.id}・{member.channel ? `#${member.channel}` : 'uチャンネル未設定'}
        </Text>
        <StatusTags member={member} />
      </Flex>
    </Flex>
    {isMe ? (
      <Button icon={<SettingOutlined />} onClick={() => navigate(routes.settings)}>
        設定を変える
      </Button>
    ) : (
      canDelete && (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(member)}
          aria-label={`${member.name}さんを削除`}
        >
          削除
        </Button>
      )
    )}
  </Flex>
);

const DeleteModal = () => {
  const { scenario, update } = useScenario();
  const { message } = App.useApp();
  const [deleting, setDeleting] = useState(false);
  const target = findMember(scenario.members, scenario.deleteTargetId);

  const close = () => update({ deleteTargetId: null, deleteError: false });

  const remove = () => {
    if (!target) return;
    setDeleting(true);
    window.setTimeout(() => {
      setDeleting(false);
      if (scenario.failNextDelete) {
        update({ deleteError: true });
        return;
      }
      update((current) => ({
        members: current.members.filter((member) => member.id !== target.id),
        weeks: current.weeks.map((week) => ({
          ...week,
          pairs: week.pairs.filter((pair) => !pair.includes(target.id)),
          rest: week.rest === target.id ? 0 : week.rest,
        })),
        deleteTargetId: null,
        deleteError: false,
      }));
      message.success(`${target.name}さんを削除しました`);
    }, 500);
  };

  return (
    <Modal
      open={Boolean(target)}
      title={target ? `${target.name}さんをメンバーから削除しますか？` : ''}
      okText={scenario.deleteError ? 'もう一度削除する' : '削除する'}
      okButtonProps={{ danger: true, loading: deleting }}
      cancelText="キャンセル"
      onOk={remove}
      onCancel={close}
    >
      {target && (
        <Flex vertical gap="middle">
          {scenario.deleteError && (
            <Alert
              type="error"
              showIcon
              title="削除できませんでした"
              description="通信が途切れた可能性があります。「もう一度削除する」を押してください。続く場合は、時間をおいてからお試しください。"
            />
          )}
          <Flex gap="small" align="center">
            <PersonAvatar member={target} size="large" />
            <Flex vertical>
              <Text strong>{target.name}</Text>
              <StatusTags member={target} />
            </Flex>
          </Flex>
          <Paragraph style={{ margin: 0 }}>
            削除すると元に戻せません。メンバー一覧から消え、組み合わせにも入らなくなります。
            {target.active && '参加中の人なので、今週以降の組み合わせが組み直しになります。'}
          </Paragraph>
          <Text type="secondary">退職した人など、もう CT に参加しない人だけを削除してください。休職中の人は本人が「参加しない」に変えられます。</Text>
        </Flex>
      )}
    </Modal>
  );
};

export const MembersPage = () => {
  const { scenario, update } = useScenario();
  const { login } = useActions();
  const { members, userId } = scenario;
  const sorted = [...members].sort((a, b) => a.id - b.id);
  const active = members.filter((member) => member.active).length;
  const incomplete = members.filter(isIncomplete).length;

  return (
    <Flex vertical gap="large">
      <Flex vertical>
        <Title level={1} style={{ margin: 0 }}>
          メンバー
        </Title>
        <Text type="secondary">一度でもログインしたことのある人を、社員番号順に並べています</Text>
      </Flex>

      {scenario.load === 'error' && <LoadError what="メンバー" />}
      {scenario.load === 'loading' && <Card loading title="メンバー一覧" />}
      {scenario.load === 'ready' && (
        <>
          {!userId && members.length > 0 && (
            <Alert
              type="info"
              showIcon
              title="ログインすると、自分の参加状況を変えたり、退職した人を外したりできます"
              action={
                <Button icon={<SlackOutlined />} onClick={login}>
                  Slack でログイン
                </Button>
              }
            />
          )}
          <Card>
            <Flex gap="large" wrap>
              <Statistic title="参加" value={active} suffix="人" />
              <Statistic title="不参加" value={members.length - active} suffix="人" />
              <Statistic title="初回設定が未完了" value={incomplete} suffix="人" />
            </Flex>
          </Card>
          <Card title={`メンバー一覧（${members.length} 人）`}>
            {members.length === 0 ? (
              <Empty
                description={
                  <Flex vertical gap="small">
                    <Text>まだ誰もログインしていません</Text>
                    <Text type="secondary">Slack でログインした人が、ここに表示されます。最初の 1 人になってください。</Text>
                  </Flex>
                }
              >
                <Button type="primary" icon={<SlackOutlined />} onClick={login}>
                  Slack でログイン
                </Button>
              </Empty>
            ) : (
              <Listy<Member>
                items={sorted}
                rowKey="id"
                rowHoverable={false}
                itemRender={(member) => (
                  <MemberRow
                    member={member}
                    isMe={member.id === userId}
                    canDelete={Boolean(userId)}
                    onDelete={(target) => update({ deleteTargetId: target.id, deleteError: false })}
                  />
                )}
              />
            )}
          </Card>
        </>
      )}
      <DeleteModal />
    </Flex>
  );
};
