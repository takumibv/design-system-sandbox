import { useEffect, useRef, useState } from 'react'
import { Banner, Button, Checkbox, FormControl, Heading, Link, PageLayout, Select, Stack, Text, TextInput } from '@primer/react'
import { InlineMessage } from '@primer/react/experimental'
import { channelOptions, isIncomplete } from '../data/model'
import { useLinkHandler, useRouter } from '../router'
import { useAppState } from '../state'
import listStyles from './SchedulePage.module.css'

type Values = { name: string; employeeNo: string; channel: string; active: boolean }
type Errors = Partial<Record<'name' | 'employeeNo' | 'channel', string>>

const FIELD_LABEL = { name: '名前', employeeNo: '社員番号', channel: 'uチャンネル' } as const

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = '名前を入力してください'
  if (!v.employeeNo.trim()) e.employeeNo = '社員番号を入力してください'
  else if (!/^[0-9]+$/.test(v.employeeNo.trim())) e.employeeNo = '社員番号は半角数字で入力してください（例：12）'
  if (!v.channel) e.channel = 'uチャンネルを選んでください'
  return e
}

/**
 * 自分の設定。初回設定も同じフォームで、見出しと説明だけを変える。
 * 明示的に保存するフォームなので、参加の切り替えは ToggleSwitch ではなく Checkbox（Saving パターン）。
 */
export function SettingsPage({ onboarding }: { onboarding: boolean }) {
  const { me, members, scenario, saveMe, login } = useAppState()
  const { navigate } = useRouter()
  const link = useLinkHandler()
  const { href } = useRouter()

  const initial: Values = {
    name: me?.name ?? '',
    employeeNo: me && !me.incomplete ? String(me.id) : '',
    channel: me?.channel ?? '',
    // 初回は「参加する」が初期値（ブリーフ）
    active: onboarding ? true : (me?.active ?? true),
  }
  const [values, setValues] = useState<Values>(initial)
  const [errors, setErrors] = useState<Errors>(() => (scenario.submitted ? validate(initial) : {}))
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<'saved' | 'failed' | undefined>(
    scenario.result === 'saved' ? 'saved' : scenario.result === 'save-failed' ? 'failed' : undefined,
  )
  const errorBannerRef = useRef<HTMLDivElement>(null)
  const firstFocus = useRef(false)

  useEffect(() => {
    // 送信後のエラーは Banner へフォーカスを移す（読み上げとキーボードで気づけるように）
    if (firstFocus.current && (Object.keys(errors).length > 0 || result === 'failed')) {
      errorBannerRef.current?.focus()
    }
  }, [errors, result])

  if (!me) {
    return (
      <PageLayout containerWidth="medium">
        <PageLayout.Content as="div">
          <Stack gap="normal">
            <Heading as="h1" variant="medium">
              自分の設定
            </Heading>
            <Banner
              variant="info"
              title="設定を変えるには、Slack でログインしてください"
              description="変えられるのは自分の設定だけです。組み合わせとメンバーはログインしなくても見られます。"
              primaryAction={<Banner.PrimaryAction onClick={login}>Slack でログイン</Banner.PrimaryAction>}
            />
          </Stack>
        </PageLayout.Content>
      </PageLayout>
    )
  }

  const activeNow = members.filter((m) => m.active).length
  const participationChanged = values.active !== me.active
  const nextCount = activeNow + (values.active ? 1 : -1)
  const errorKeys = Object.keys(errors) as (keyof Errors)[]

  const set = <K extends keyof Values>(key: K, v: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    setResult(undefined)
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    firstFocus.current = true
    const e = validate(values)
    setErrors(e)
    setResult(undefined)
    if (Object.keys(e).length > 0) return
    setSaving(true)
    try {
      await saveMe({ name: values.name.trim(), channel: values.channel, active: values.active, employeeNo: values.employeeNo })
      if (onboarding) {
        // 初回設定の完了：組み合わせへ移り、そこで完了を伝える（Feature onboarding「Celebrate the finish」）
        navigate('/', { result: 'onboarded' })
        return
      }
      setResult('saved')
    } catch {
      setResult('failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageLayout containerWidth="medium">
      <PageLayout.Content as="div">
        <Stack gap="normal">
          <Stack gap="condensed">
            <Heading as="h1" variant="medium">
              {onboarding ? 'CTスケジュールへようこそ' : '自分の設定'}
            </Heading>
            <Text as="p">
              {onboarding
                ? `${me.name} さん、組み合わせに入るために、次の 3 つを設定してください。1 分ほどで終わります。設定はあとからいつでも変えられます。`
                : '変えられるのは自分の設定だけです。保存するまで変更は反映されません。'}
            </Text>
          </Stack>

          <div ref={errorBannerRef} tabIndex={-1}>
            {errorKeys.length > 0 ? (
              <Banner
                variant="critical"
                title={`${errorKeys.length} つの項目を確認してください`}
                description={
                  <ul className={listStyles.CompactPairs}>
                    {errorKeys.map((k) => (
                      <li key={k}>
                        <Link href={`#field-${k}`} inline>
                          {FIELD_LABEL[k]}
                        </Link>
                        ：{errors[k]}
                      </li>
                    ))}
                  </ul>
                }
              />
            ) : result === 'failed' ? (
              <Banner
                variant="critical"
                title="設定を保存できませんでした"
                description="通信が途切れたか、サーバーで問題が起きた可能性があります。入力した内容はそのまま残っています。少し待ってから、もう一度「保存する」を押してください。"
              />
            ) : null}
          </div>

          <form onSubmit={onSubmit} noValidate aria-label={onboarding ? '初回設定' : '自分の設定'}>
            <Stack gap="normal">
              <FormControl required id="field-name">
                <FormControl.Label>名前</FormControl.Label>
                <TextInput
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoComplete="name"
                  validationStatus={errors.name ? 'error' : undefined}
                  block
                />
                {errors.name ? (
                  <FormControl.Validation variant="error">{errors.name}</FormControl.Validation>
                ) : (
                  <FormControl.Caption>組み合わせに表示する名前です。初期値は Slack の表示名です。</FormControl.Caption>
                )}
              </FormControl>

              <FormControl required id="field-employeeNo">
                <FormControl.Label>社員番号</FormControl.Label>
                <TextInput
                  value={values.employeeNo}
                  onChange={(e) => set('employeeNo', e.target.value)}
                  inputMode="numeric"
                  validationStatus={errors.employeeNo ? 'error' : undefined}
                />
                {errors.employeeNo ? (
                  <FormControl.Validation variant="error">{errors.employeeNo}</FormControl.Validation>
                ) : (
                  <FormControl.Caption>半角数字。組み合わせとメンバーの並び順に使います。</FormControl.Caption>
                )}
              </FormControl>

              <FormControl required id="field-channel">
                <FormControl.Label>uチャンネル</FormControl.Label>
                <Select
                  value={values.channel}
                  onChange={(e) => set('channel', e.target.value)}
                  validationStatus={errors.channel ? 'error' : undefined}
                >
                  <Select.Option value="" disabled>
                    選んでください
                  </Select.Option>
                  {channelOptions.map((c) => (
                    <Select.Option key={c} value={c}>
                      #{c}
                    </Select.Option>
                  ))}
                </Select>
                {errors.channel ? (
                  <FormControl.Validation variant="error">{errors.channel}</FormControl.Validation>
                ) : (
                  <FormControl.Caption>
                    あなた専用の Slack チャンネル（u- で始まるもの）。ペアの相手とハドルを始める場所になります。
                  </FormControl.Caption>
                )}
              </FormControl>

              <Stack gap="condensed">
                <FormControl>
                  <Checkbox checked={values.active} onChange={(e) => set('active', e.target.checked)} />
                  <FormControl.Label>CT に参加する</FormControl.Label>
                  <FormControl.Caption>毎週月曜 14:00 からの CT の組み合わせに入ります。休職や繁忙期は外せます。</FormControl.Caption>
                </FormControl>
                {participationChanged ? (
                  <InlineMessage variant="warning">
                    保存すると、今週以降の全員の組み合わせが組み直されます（参加者 {activeNow} 人 → {nextCount} 人
                    {nextCount % 2 === 1 ? '。奇数のため毎週 1 人がお休みになります' : ''}）。
                  </InlineMessage>
                ) : null}
              </Stack>

              <Stack direction="horizontal" align="center" gap="normal" wrap="wrap">
                <Button type="submit" variant="primary" loading={saving} loadingAnnouncement="保存しています">
                  {onboarding ? '設定を保存して始める' : '保存する'}
                </Button>
                {!onboarding ? (
                  <Link href={href('/')} onClick={link('/')}>
                    組み合わせに戻る
                  </Link>
                ) : null}
                {result === 'saved' ? <InlineMessage variant="success">保存しました</InlineMessage> : null}
              </Stack>
              {result === 'saved' && !isIncomplete(me) ? (
                <Text size="small" className={listStyles.Muted}>
                  {me.active ? '今週以降の組み合わせに入っています。' : '今は組み合わせに入っていません。'}
                </Text>
              ) : null}
            </Stack>
          </form>
        </Stack>
      </PageLayout.Content>
    </PageLayout>
  )
}
