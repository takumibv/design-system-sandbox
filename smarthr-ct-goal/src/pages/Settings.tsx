import { type FormEvent, type InvalidEvent, useState } from 'react'
import {
  Button,
  Cluster,
  Container,
  Fieldset,
  FormControl,
  Input,
  PageHeading,
  Panel,
  RadioButton,
  ResponseMessage,
  Select,
  Stack,
  Text,
  WarningIcon,
} from 'smarthr-ui'

import { Layout } from '../components/Layout'
import { RouterTextLink } from '../components/RouterTextLink'
import { channelOptions, empCode, isIncomplete } from '../data/model'
import { useAppState } from '../state'

import { SignInRequired } from './SignInRequired'

type Field = 'name' | 'code' | 'channel'
type Errors = Partial<Record<Field, string>>
type Result = 'success' | 'error' | 'invalid' | undefined

const REQUIRED_MESSAGE: Record<Field, string> = {
  name: '名前を入力してください。',
  code: '社員番号を入力してください。',
  channel: 'uチャンネルを選択してください。',
}

const messageFor = (field: Field, el: HTMLInputElement | HTMLSelectElement) => {
  if (el.validity.valueMissing) return REQUIRED_MESSAGE[field]
  if (field === 'code' && el.validity.patternMismatch) return '社員番号は半角数字で入力してください。'
  return undefined
}

export const Settings = () => {
  const { me, saveMe, initialSettingsResult } = useAppState()
  const firstTime = me ? isIncomplete(me) : false
  // 初回設定かどうかは画面を開いた時点で決める（保存しても見出しが変わらないように）
  const [isSetup] = useState(firstTime)

  const [name, setName] = useState(me?.name ?? '')
  const [code, setCode] = useState(me && !me.incomplete ? empCode(me) : '')
  const [channel, setChannel] = useState(me?.channel ?? '')
  // 初回設定では「参加する」が初期値（ブリーフ）
  const [active, setActive] = useState(firstTime ? true : (me?.active ?? true))
  const [savedActive, setSavedActive] = useState(firstTime ? true : (me?.active ?? true))
  const [errors, setErrors] = useState<Errors>(() =>
    initialSettingsResult === 'invalid'
      ? {
          ...(name ? {} : { name: REQUIRED_MESSAGE.name }),
          ...(code ? {} : { code: REQUIRED_MESSAGE.code }),
          ...(channel ? {} : { channel: REQUIRED_MESSAGE.channel }),
        }
      : {},
  )
  const [result, setResult] = useState<Result>(initialSettingsResult)
  const [activeChangedOnSave, setActiveChangedOnSave] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (!me) return <SignInRequired />

  const title = isSetup ? '初回設定' : '自分の設定'

  /** [H:FormControl] required を付け、onInvalid で標準ツールチップを抑えて errorMessages で表示する */
  const handleInvalid = (field: Field) => (e: InvalidEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    const message = messageFor(field, e.currentTarget)
    setErrors((prev) => ({ ...prev, [field]: message }))
    setResult('invalid')
  }
  /** エラーの原因が解消されたらメッセージを消す [H:FormControl] */
  const clearIfValid = (field: Field, el: HTMLInputElement | HTMLSelectElement) => {
    if (errors[field] && el.checkValidity()) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setProcessing(true)
    setResult(undefined)
    try {
      await saveMe({ name, code, channel, active })
      setActiveChangedOnSave(active !== savedActive)
      setSavedActive(active)
      setResult('success')
    } catch {
      setResult('error')
    } finally {
      setProcessing(false)
    }
  }

  const activeWillChange = active !== savedActive

  return (
    <Layout title={title}>
      <Container size="NARROW">
        <Stack gap={1.5}>
          <Stack gap={0.5}>
            <PageHeading>{title}</PageHeading>
            <p>
              {isSetup
                ? 'はじめに、CT の組み合わせに使う情報を設定してください。3 つの項目を入力して保存すると、組み合わせに入ります。'
                : 'CT の組み合わせに使う、あなたの情報です。変えられるのは自分の設定だけです。'}
            </p>
          </Stack>
          <Panel padding={1.5}>
            <form onSubmit={onSubmit}>
              <Stack gap={1.5}>
                <FormControl
                  label="名前"
                  helpMessage="組み合わせやメンバーに表示されます。最初は Slack の表示名が入っています。"
                  errorMessages={errors.name}
                >
                  <Input
                    name="name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value)
                      clearIfValid('name', e.currentTarget)
                    }}
                    onInvalid={handleInvalid('name')}
                  />
                </FormControl>
                <FormControl
                  label="社員番号"
                  helpMessage="組み合わせの並び順に使います。半角数字で入力してください。"
                  exampleMessage="例：0123"
                  errorMessages={errors.code}
                >
                  <Input
                    name="code"
                    required
                    inputMode="numeric"
                    pattern="[0-9]+"
                    width="10em"
                    value={code}
                    onChange={(e) => {
                      setCode(e.currentTarget.value)
                      clearIfValid('code', e.currentTarget)
                    }}
                    onInvalid={handleInvalid('code')}
                  />
                </FormControl>
                <FormControl
                  label="uチャンネル"
                  helpMessage="相手とのハドルに使う、あなた個人の Slack チャンネルです（u- で始まるもの）。"
                  errorMessages={errors.channel}
                >
                  <Select
                    name="channel"
                    required
                    hasBlank
                    blankLabel="選択してください"
                    value={channel}
                    options={channelOptions.map((c) => ({ value: c, label: `#${c}` }))}
                    onChange={(e) => {
                      setChannel(e.currentTarget.value)
                      clearIfValid('channel', e.currentTarget)
                    }}
                    onInvalid={handleInvalid('channel')}
                  />
                </FormControl>
                <Fieldset
                  legend="CT への参加"
                  helpMessage="休職や繁忙期で抜けるときは「参加しない」にしてください。変えると、今週以降の全員の組み合わせが組み直されます。"
                >
                  <Stack>
                    <Cluster gap={1.5}>
                      <RadioButton name="active" value="yes" checked={active} onChange={() => setActive(true)}>
                        参加する
                      </RadioButton>
                      <RadioButton name="active" value="no" checked={!active} onChange={() => setActive(false)}>
                        参加しない
                      </RadioButton>
                    </Cluster>
                    {activeWillChange && !isSetup && (
                      <Text as="p" size="S" icon={<WarningIcon />}>
                        {active
                          ? '保存すると、今週以降の組み合わせにあなたが入り、全員の組み合わせが組み直されます。'
                          : '保存すると、今週以降の組み合わせからあなたが外れ、全員の組み合わせが組み直されます。'}
                      </Text>
                    )}
                  </Stack>
                </Fieldset>
                <Stack gap={0.5}>
                  <div>
                    <Button type="submit" variant="primary" loading={processing}>
                      保存
                    </Button>
                  </div>
                  {result === 'success' && (
                    <>
                      <ResponseMessage status="success" role="status">
                        {isSetup ? '設定が完了しました。' : '保存しました。'}
                        {activeChangedOnSave && '今週以降の組み合わせを組み直しました。'}
                      </ResponseMessage>
                      {/* ResponseMessage（LiveRegion）の中にリンクを置くと aria-hidden の複製にフォーカス可能要素が入るため外に出す */}
                      <RouterTextLink href="/">組み合わせを見る</RouterTextLink>
                    </>
                  )}
                  {result === 'error' && (
                    <ResponseMessage status="error" role="alert">
                      保存できませんでした。通信状況を確認して、もう一度「保存」を押してください。
                    </ResponseMessage>
                  )}
                  {result === 'invalid' && (
                    <ResponseMessage status="error" role="alert">
                      入力内容に不足や誤りがあります。赤く表示された項目を直してから、もう一度「保存」を押してください。
                    </ResponseMessage>
                  )}
                </Stack>
              </Stack>
            </form>
          </Panel>
        </Stack>
      </Container>
    </Layout>
  )
}
