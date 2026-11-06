import { useState } from "react";
import {
  App as AntApp, Alert, Button, Card, Empty, Flex, List, Modal, Result, Skeleton, Statistic, Tag, Typography,
} from "antd";
import {
  CheckCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, SlackOutlined,
} from "@ant-design/icons";
import type { Member } from "./data";
import { PersonAvatar } from "./Person";
import { useStore } from "./store";
import { AppLink } from "./AppLink";

const { Title, Text, Paragraph } = Typography;

export function MembersPage() {
  const store = useStore();
  const { members, loggedIn, me, loading, loadError, scenario, login } = store;
  const { message } = AntApp.useApp();
  const [target, setTarget] = useState<Member | undefined>(
    () => members.find((m) => m.id === scenario.deleteTargetId),
  );
  const [failNext, setFailNext] = useState(scenario.deleteError);
  const [deleteError, setDeleteError] = useState(scenario.deleteError);
  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <Flex vertical gap="large" aria-busy="true">
        <Title level={1}>メンバー</Title>
        <Card><Skeleton avatar active paragraph={{ rows: 6 }} /></Card>
      </Flex>
    );
  }
  if (loadError) {
    return (
      <Result
        status="error"
        title="メンバーを読み込めませんでした"
        subTitle="通信が不安定か、サーバーが応答していません。少し待ってから再読み込みしてください。"
        extra={<Button type="primary" onClick={store.reload}>再読み込み</Button>}
      />
    );
  }

  const sorted = [...members].sort((a, b) => a.id - b.id);
  const active = sorted.filter((m) => m.active).length;

  const close = () => {
    setTarget(undefined);
    setDeleteError(false);
  };
  const doDelete = () => {
    if (!target) return;
    setDeleting(true);
    // デモ：失敗の状態（S14）から開いた場合は 1 回目を失敗させ、やり直しで成功させる
    window.setTimeout(() => {
      setDeleting(false);
      if (failNext && !deleteError) {
        setDeleteError(true);
        return;
      }
      setFailNext(false);
      store.removeMember(target.id);
      message.success(`${target.name}さんをメンバーから削除しました`);
      close();
    }, scenario.deleteError ? 0 : 400);
  };

  return (
    <Flex vertical gap="large">
      <div>
        <Title level={1}>メンバー</Title>
        <Text type="secondary">ログインしたことのある全員を、社員番号順に並べています。</Text>
      </div>

      {!loggedIn && members.length > 0 && (
        <Alert
          type="info"
          showIcon
          title="ログインすると、自分の参加設定の変更と、退職者などのメンバー削除ができます"
          action={<Button icon={<SlackOutlined aria-hidden />} onClick={login}>Slack でログイン</Button>}
        />
      )}

      {members.length === 0 ? (
        <Card>
          <Empty
            description={
              <Flex vertical gap={4}>
                <Text>まだメンバーがいません</Text>
                <Text type="secondary">Slack でログインした人が、メンバーとしてここに並びます。最初の 1 人になるには、ログインして自分の設定を済ませてください。</Text>
              </Flex>
            }
          >
            {!loggedIn && (
              <Button type="primary" icon={<SlackOutlined aria-hidden />} onClick={login}>Slack でログイン</Button>
            )}
          </Empty>
        </Card>
      ) : (
        <>
          <Card>
            <Flex gap="large" wrap>
              <Statistic title="参加している" value={active} suffix="人" />
              <Statistic title="参加していない" value={sorted.length - active} suffix="人" />
              <Statistic title="全メンバー" value={sorted.length} suffix="人" />
            </Flex>
          </Card>
          <Card title="メンバー一覧">
            <List
              itemLayout="horizontal"
              dataSource={sorted}
              rowKey="id"
              renderItem={(m) => {
                const isMe = loggedIn && me?.id === m.id;
                const actions = isMe
                  ? [<AppLink key="edit" to={m.incomplete ? "/setup" : "/settings"}>自分の設定を変える</AppLink>]
                  : loggedIn
                    ? [
                        <Button key="del" danger type="link" onClick={() => setTarget(m)} aria-label={`${m.name}さんを削除`}>
                          削除
                        </Button>,
                      ]
                    : [];
                return (
                  <List.Item actions={actions}>
                    <List.Item.Meta
                      avatar={<PersonAvatar member={m} />}
                      title={
                        <Flex gap="small" align="center" wrap>
                          <Text strong={isMe}>{m.name}</Text>
                          {isMe && <Tag color="blue">あなた</Tag>}
                        </Flex>
                      }
                      description={
                        <Flex gap="small" wrap>
                          {m.active ? (
                            <Tag color="success" icon={<CheckCircleOutlined aria-hidden />}>参加</Tag>
                          ) : (
                            <Tag icon={<MinusCircleOutlined aria-hidden />}>不参加</Tag>
                          )}
                          {m.incomplete && (
                            <Tag color="warning" icon={<ExclamationCircleOutlined aria-hidden />}>
                              初回設定が未完了
                            </Tag>
                          )}
                          {!m.incomplete && !m.channel && (
                            <Tag color="warning" icon={<ExclamationCircleOutlined aria-hidden />}>uチャンネル未設定</Tag>
                          )}
                        </Flex>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </>
      )}

      <Modal
        open={!!target}
        title="メンバーを削除しますか？"
        onCancel={close}
        mask={{ closable: !deleting }}
        footer={[
          <Button key="cancel" onClick={close} autoFocus disabled={deleting}>
            キャンセル
          </Button>,
          <Button key="ok" type="primary" danger loading={deleting} onClick={doDelete}>
            {deleteError ? "もう一度削除する" : "削除する"}
          </Button>,
        ]}
      >
        {target && (
          <Flex vertical gap="middle">
            <Flex align="center" gap="small">
              <PersonAvatar member={target} />
              <Text strong>{target.name}</Text>
            </Flex>
            <Paragraph>
              {target.name}さんをメンバーから削除します。組み合わせから外れ、今週以降の全員の組み合わせが組み直されます。
              <Text strong>この操作は取り消せません。</Text>
            </Paragraph>
            {deleteError && (
              <Alert
                type="error"
                showIcon
                title="削除できませんでした"
                description="通信が不安定か、サーバーが応答していません。メンバーはまだ削除されていません。もう一度お試しください。"
              />
            )}
          </Flex>
        )}
      </Modal>
    </Flex>
  );
}
