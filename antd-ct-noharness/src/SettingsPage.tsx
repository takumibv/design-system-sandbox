import { useEffect, useState } from "react";
import { App as AntApp, Alert, Button, Card, Flex, Form, Input, Radio, Select, Typography } from "antd";
import { SlackOutlined } from "@ant-design/icons";
import { employeeNo, uChannels } from "./data";
import { useStore } from "./store";
import { AppLink } from "./AppLink";

const { Title, Text, Paragraph } = Typography;

type Values = { name: string; employeeNo: string; channel?: string; active: boolean };

/** 自分の設定（mode="settings"）と初回設定（mode="setup"）で同じフォームを使う */
export function SettingsPage({ mode }: { mode: "settings" | "setup" }) {
  const store = useStore();
  const { me, loggedIn, scenario, login, navigate } = store;
  const { message } = AntApp.useApp();
  const [form] = Form.useForm<Values>();
  const [result, setResult] = useState<"success" | "error" | undefined>(scenario.saveResult);
  const [saving, setSaving] = useState(false);
  const [failNext, setFailNext] = useState(scenario.saveResult === "error");
  const activeValue = Form.useWatch("active", form);

  useEffect(() => {
    if (scenario.validateOnOpen) form.validateFields().catch(() => undefined);
  }, [scenario.validateOnOpen, form]);

  if (!loggedIn || !me) {
    return (
      <Flex vertical gap="large">
        <Title level={1}>自分の設定</Title>
        <Card>
          <Flex vertical gap="middle" align="start">
            <Text>自分の設定を見る・変えるには、Slack でログインしてください。</Text>
            <Button type="primary" icon={<SlackOutlined aria-hidden />} onClick={login}>Slack でログイン</Button>
          </Flex>
        </Card>
      </Flex>
    );
  }

  const setup = mode === "setup";
  const initial: Values = {
    name: me.name, // Slack の表示名が初期値
    employeeNo: me.incomplete ? "" : employeeNo(me.id),
    channel: me.incomplete ? undefined : me.channel,
    active: me.incomplete ? true : me.active, // 初期値は「参加する」
  };
  const participationChanged = activeValue !== undefined && activeValue !== (me.incomplete ? false : me.active);

  const onFinish = (v: Values) => {
    setSaving(true);
    setResult(undefined);
    window.setTimeout(() => {
      setSaving(false);
      if (failNext) {
        setFailNext(false);
        setResult("error");
        return;
      }
      store.updateMe({ name: v.name, channel: v.channel, active: v.active, incomplete: false });
      if (setup) {
        message.success("設定を保存しました。組み合わせに参加しています");
        navigate("/");
        return;
      }
      setResult("success");
    }, 400);
  };

  return (
    <Flex vertical gap="large">
      <div>
        <Title level={1}>{setup ? "はじめに、CT の設定をしてください" : "自分の設定"}</Title>
        <Text type="secondary">
          {setup
            ? "3 つの必須項目を入力して保存すると、組み合わせに入ります。設定はあとからいつでも変えられます。"
            : "ここで変えられるのは、あなた自身の設定だけです。"}
        </Text>
      </div>

      {result === "success" && (
        <Alert
          type="success"
          showIcon
          title="設定を保存しました"
          description={me.active ? "今週以降の組み合わせに反映されます。" : "CT への参加をやめました。今週以降の組み合わせから外れます。"}
          action={<Button onClick={() => navigate("/")}>組み合わせを見る</Button>}
        />
      )}
      {result === "error" && (
        <Alert
          type="error"
          showIcon
          title="設定を保存できませんでした"
          description="通信が不安定か、サーバーが応答していません。入力した内容はそのまま残っています。もう一度「保存する」を押してください。"
        />
      )}

      <Card>
        <Form<Values>
          form={form}
          layout="vertical"
          initialValues={initial}
          onFinish={onFinish}
          onValuesChange={() => result === "success" && setResult(undefined)}
          scrollToFirstError
          requiredMark
        >
          <Paragraph type="secondary">＊ は必須項目です。</Paragraph>
          <Form.Item
            label="名前"
            name="name"
            extra="組み合わせやメンバー一覧に出る名前です。Slack の表示名が入っています。"
            rules={[{ required: true, whitespace: true, message: "名前を入力してください" }]}
          >
            <Input autoComplete="name" />
          </Form.Item>
          <Form.Item
            label="社員番号"
            name="employeeNo"
            extra="半角数字で入力してください。組み合わせの並び順に使います。"
            rules={[
              { required: true, message: "社員番号を入力してください" },
              { pattern: /^[0-9]+$/, message: "社員番号は半角数字だけで入力してください（例：1012）" },
            ]}
          >
            <Input inputMode="numeric" placeholder="例：1012" />
          </Form.Item>
          <Form.Item
            label="uチャンネル"
            name="channel"
            extra="あなたとのハドルを始める個人用チャンネルです。u- で始まるチャンネルから選んでください。"
            rules={[{ required: true, message: "uチャンネルを選んでください" }]}
          >
            <Select
              showSearch
              placeholder="u- で始まるチャンネルを選ぶ"
              options={uChannels.map((c) => ({ value: c, label: `#${c}` }))}
            />
          </Form.Item>
          <Form.Item
            label="CT への参加"
            name="active"
            extra="休職や繁忙期で抜けるときは「参加しない」にします。戻るときは「参加する」にします。"
          >
            <Radio.Group
              options={[
                { value: true, label: "参加する" },
                { value: false, label: "参加しない（休止する）" },
              ]}
            />
          </Form.Item>
          {participationChanged && !setup && (
            <Form.Item>
              <Alert
                type="warning"
                showIcon
                title={activeValue ? "参加に戻すと、全員の組み合わせが変わります" : "参加をやめると、全員の組み合わせが変わります"}
                description="保存すると、今週以降の組み合わせが組み直され、ほかのメンバーの相手も変わります。保存するまでは何も変わりません。"
              />
            </Form.Item>
          )}
          <Flex gap="middle" wrap align="center">
            <Button type="primary" htmlType="submit" loading={saving}>
              {setup ? "保存して始める" : "保存する"}
            </Button>
            {!setup && <AppLink to="/">組み合わせに戻る</AppLink>}
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}
