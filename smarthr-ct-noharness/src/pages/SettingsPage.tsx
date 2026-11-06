import { type FormEvent, useEffect, useRef, useState } from 'react'
import {
  Base,
  Button,
  Checkbox,
  Cluster,
  Fieldset,
  FormControl,
  InformationPanel,
  Input,
  PageHeading,
  RequiredLabel,
  Select,
  Stack,
  Text,
  TextLink,
} from 'smarthr-ui'
import type { AppApi } from '../App'
import { empNo } from '../Person'
import { allChannels } from '../scenario'

type Props = { api: AppApi; setup: boolean }

type Errors = Partial<Record<'name' | 'empNo' | 'channel', string>>

const validate = (v: { name: string; empNo: string; channel: string }): Errors => {
  const e: Errors = {}
  if (!v.name.trim()) e.name = '名前を入力してください。'
  if (!v.empNo.trim()) e.empNo = '社員番号を入力してください。'
  else if (!/^[0-9]+$/.test(v.empNo)) e.empNo = '社員番号は半角数字で入力してください。'
  if (!v.channel) e.channel = 'uチャンネルを選んでください。'
  return e
}

export const SettingsPage = ({ api, setup }: Props) => {
  const { me, scenario } = api
  const [name, setName] = useState(me?.name ?? '')
  const [no, setNo] = useState(me && !me.incomplete ? empNo(me) : '')
  const [channel, setChannel] = useState(me?.channel ?? '')
  const [active, setActive] = useState(me ? (me.incomplete ? true : me.active) : true)
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  // S16：必須項目が未入力のまま送信した直後の状態を直接開けるようにする。
  useEffect(() => {
    if (scenario.state === 'setup-error') setErrors(validate({ name: me?.name ?? '', empNo: '', channel: '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!me) {
    return (
      <Stack gap={1.5}>
        <PageHeading>自分の設定</PageHeading>
        <InformationPanel type="info" heading="ログインすると自分の設定を変えられます">
          <Stack gap={1} align="flex-start">
            <Text as="p">名前、社員番号、uチャンネル、CT に参加するかどうかを設定できます。変えられるのは自分の設定だけです。</Text>
            <Button variant="primary" onClick={api.login}>
              Slack でログイン
            </Button>
          </Stack>
        </InformationPanel>
      </Stack>
    )
  }

  const activeCount = scenario.members.filter((m) => m.active).length
  const originalActive = me.incomplete ? false : me.active
  const changedActive = active !== originalActive
  const nextCount = activeCount + (active ? 1 : -1)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate({ name, empNo: no, channel })
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      api.setScenario((s) => ({
        ...s,
        members: s.members.map((m) => (m.id === me.id ? { ...m, name, channel, active, incomplete: false } : m)),
      }))
      if (setup) {
        api.navigate('/')
        api.notify({ type: 'success', text: '初回設定が終わりました。来週の組み合わせから入ります。' })
      } else {
        api.notify({ type: 'success', text: '設定を保存しました。' })
        window.scrollTo(0, 0)
      }
    }, 400)
  }

  const errorList = Object.values(errors)

  return (
    <Stack gap={1.5}>
      <Stack gap={0.5}>
        <PageHeading>{setup ? '初回設定' : '自分の設定'}</PageHeading>
        <Text as="p" color="TEXT_GREY">
          {setup
            ? 'はじめに、組み合わせに必要な 3 つの項目を設定してください。あとから「自分の設定」でいつでも変えられます。'
            : 'ここで変えられるのは自分の設定だけです。'}
        </Text>
      </Stack>

      {errorList.length > 0 && (
        <div ref={errorSummaryRef} tabIndex={-1}>
          <InformationPanel type="error" heading={`入力内容を確かめてください（${errorList.length} 件）`}>
            <Stack gap={0.25} role="list">
              {errorList.map((m) => (
                <Text as="p" role="listitem" key={m}>
                  {m}
                </Text>
              ))}
            </Stack>
          </InformationPanel>
        </div>
      )}

      <Base padding={1.5}>
        <form onSubmit={submit} noValidate>
          <Stack gap={1.5}>
            <FormControl
              label="名前"
              statusLabels={<RequiredLabel />}
              helpMessage="組み合わせやメンバー一覧に表示される名前です。Slack の表示名が入っています。"
              errorMessages={errors.name}
            >
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} width="20em" error={!!errors.name} />
            </FormControl>

            <FormControl
              label="社員番号"
              statusLabels={<RequiredLabel />}
              helpMessage="組み合わせの並び順に使います。半角数字で入力してください。"
              exampleMessage="例：1012"
              errorMessages={errors.empNo}
            >
              <Input
                name="empNo"
                inputMode="numeric"
                value={no}
                onChange={(e) => setNo(e.target.value)}
                width="10em"
                error={!!errors.empNo}
              />
            </FormControl>

            <FormControl
              label="uチャンネル"
              statusLabels={<RequiredLabel />}
              helpMessage="ペアの相手があなたとハドルを始める、個人用の Slack チャンネルです（u- で始まるもの）。既にあるチャンネルから選んでください。"
              errorMessages={errors.channel}
            >
              <Select
                name="channel"
                hasBlank
                blankLabel="選んでください"
                value={channel}
                onChangeValue={(v) => setChannel(v)}
                options={allChannels.map((c) => ({ value: c, label: `#${c}` }))}
                error={!!errors.channel}
              />
            </FormControl>

            <Fieldset
              legend="CT への参加"
              helpMessage="参加をやめる・戻ると、その週以降の全員の組み合わせが組み直されます。休職や繁忙期で抜けるときに変えてください。"
            >
              <Stack gap={0.75}>
                <Checkbox name="active" checked={active} onChange={(e) => setActive(e.target.checked)}>
                  CT に参加する
                </Checkbox>
                {changedActive && !setup && (
                  <InformationPanel type="warning" heading="保存すると、全員の組み合わせが変わります">
                    <Text as="p">
                      {active
                        ? `参加者が ${activeCount} 人から ${nextCount} 人になり、今週以降の組み合わせが組み直されます。あなたは次の組み合わせから入ります。`
                        : `参加者が ${activeCount} 人から ${nextCount} 人になり、今週以降の組み合わせが組み直されます。あなたは組み合わせから外れ、相手だった人には新しい相手が割り当てられます。`}
                    </Text>
                  </InformationPanel>
                )}
              </Stack>
            </Fieldset>

            <Cluster gap={1} align="center">
              <Button type="submit" variant="primary" loading={saving}>
                {setup ? '設定して始める' : '保存'}
              </Button>
              {!setup && (
                <TextLink
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    api.navigate('/')
                  }}
                >
                  保存せずに組み合わせへ戻る
                </TextLink>
              )}
            </Cluster>
          </Stack>
        </form>
      </Base>
    </Stack>
  )
}
