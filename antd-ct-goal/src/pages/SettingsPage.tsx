import { useEffect, useState } from 'react';
import { Alert, App, Button, Card, Col, Flex, Form, Input, Radio, Result, Row, Select, Typography } from 'antd';
import { SlackOutlined } from '@ant-design/icons';
import { members as allMembers } from '../fixtures';
import { useActions } from '../actions';
import { navigate, routes } from '../router';
import { findMember, isIncomplete, useScenario } from '../scenario';

const { Title, Text } = Typography;

type Values = {
  name: string;
  employeeNumber: string;
  channel?: string;
  active: boolean;
};

// Slack に既にある u- で始まるチャンネル（デモ用の固定一覧）
const channelOptions = [...allMembers.map((member) => member.channel).filter(Boolean), 'u-mao']
  .sort()
  .map((channel) => ({ value: channel as string, label: `#${channel}` }));

export const SettingsPage = ({ mode }: { mode: 'settings' | 'setup' }) => {
  const { scenario, update } = useScenario();
  const { login } = useActions();
  const { message } = App.useApp();
  const [form] = Form.useForm<Values>();
  const [saving, setSaving] = useState(false);
  const user = findMember(scenario.members, scenario.userId);
  const setup = mode === 'setup' || Boolean(user && isIncomplete(user));
  const activeValue = Form.useWatch('active', form);

  // S10：保存に成功した直後。撮影のため、message を自動で消さずに出しておく
  useEffect(() => {
    if (scenario.justSaved) message.success({ content: '設定を保存しました', key: 'saved', duration: 0 });
  }, [scenario.justSaved, message]);

  // S16：未入力のまま送信した直後
  useEffect(() => {
    if (scenario.submittedEmpty) form.validateFields().catch(() => undefined);
  }, [scenario.submittedEmpty, form]);

  if (!user) {
    return (
      <Card>
        <Result
          status="info"
          title={
            <Title level={1} style={{ margin: 0 }}>
              ログインすると自分の設定を変えられます
            </Title>
          }
          subTitle="名前、社員番号、uチャンネル、CT に参加するかどうかを設定できます。変えられるのは自分の設定だけです。"
          extra={
            <Button type="primary" icon={<SlackOutlined />} onClick={login}>
              Slack でログイン
            </Button>
          }
        />
      </Card>
    );
  }

  const initialValues: Values = {
    name: user.name,
    employeeNumber: user.incomplete ? '' : String(user.id),
    channel: user.channel,
    active: setup ? true : user.active,
  };
  const participationChanged = !setup && activeValue !== undefined && activeValue !== user.active;

  const onFinish = (values: Values) => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      update((current) => ({
        saveError: false,
        submittedEmpty: false,
        members: current.members.map((member) =>
          member.id === user.id
            ? { ...member, name: values.name, channel: values.channel, active: values.active, incomplete: false }
            : member,
        ),
      }));
      if (setup) {
        message.success({ content: '設定が完了しました。組み合わせの画面に戻ります', key: 'save' });
        navigate(routes.home);
      } else {
        message.success({ content: '設定を保存しました', key: 'save' });
      }
    }, 500);
  };

  return (
    <Flex vertical gap="large">
      <Flex vertical>
        <Title level={1} style={{ margin: 0 }}>
          {setup ? 'はじめての設定' : '自分の設定'}
        </Title>
        <Text type="secondary">
          {setup
            ? 'CT（毎週月曜 14:00 の 2 人 1 組の雑談）の組み合わせに入るために、次の項目を設定してください'
            : `${user.name}さんの設定です。変えられるのは自分の設定だけです`}
        </Text>
      </Flex>
      <Row>
        <Col xs={24} lg={16} xl={12}>
          <Flex vertical gap="large">
            {scenario.saveError && (
              <Alert
                type="error"
                showIcon
                title="設定を保存できませんでした"
                description="入力した内容はそのまま残っています。通信状況を確かめて、もう一度「保存する」を押してください。"
              />
            )}
            <Card>
              <Form<Values>
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={onFinish}
                scrollToFirstError
                requiredMark={(label, { required }) => (
                  <Flex gap="small" align="center">
                    {label}
                    {required && <Text type="danger">必須</Text>}
                  </Flex>
                )}
              >
                <Form.Item
                  name="name"
                  label="名前"
                  extra="組み合わせの表示に使います。初めは Slack の表示名が入っています"
                  rules={[{ required: true, whitespace: true, message: '名前を入力してください' }]}
                >
                  <Input autoComplete="name" />
                </Form.Item>
                <Form.Item
                  name="employeeNumber"
                  label="社員番号"
                  extra="組み合わせの並び順に使います。半角数字で入力します（例：12）"
                  rules={[
                    { required: true, message: '社員番号を入力してください' },
                    { pattern: /^\d+$/, message: '社員番号は半角数字で入力してください' },
                  ]}
                >
                  <Input inputMode="numeric" />
                </Form.Item>
                <Form.Item
                  name="channel"
                  label="uチャンネル"
                  extra="ペアの相手があなたとハドルを始める場所です。u- で始まる自分用のチャンネルを選びます"
                  rules={[{ required: true, message: 'uチャンネルを選んでください' }]}
                >
                  <Select showSearch options={channelOptions} />
                </Form.Item>
                <Form.Item name="active" label="CT に参加する">
                  <Radio.Group
                    options={[
                      { value: true, label: '参加する' },
                      { value: false, label: '参加しない（休職・繁忙期など）' },
                    ]}
                  />
                </Form.Item>
                {participationChanged && (
                  <Form.Item>
                    <Alert
                      type="warning"
                      showIcon
                      title={activeValue ? '保存すると、組み合わせに戻ります' : '保存すると、組み合わせから外れます'}
                      description="今週以降の組み合わせが全員分組み直しになり、他の人の相手も変わります。Slack に投稿済みの今週のペアとずれることがあるので、必要ならチャンネルで知らせてください。"
                    />
                  </Form.Item>
                )}
                <Flex gap="small" wrap>
                  <Button type="primary" htmlType="submit" loading={saving}>
                    {setup ? '設定を完了する' : '保存する'}
                  </Button>
                  {!setup && <Button onClick={() => form.resetFields()}>変更を取り消す</Button>}
                </Flex>
              </Form>
            </Card>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};
