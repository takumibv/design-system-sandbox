import { useEffect, useRef, useState } from 'react';
import Button from '@atlaskit/button/default/button';
import EmptyState from '@atlaskit/empty-state';
import { ErrorMessage, HelperMessage, Label, RequiredAsterisk } from '@atlaskit/form';
import Heading from '@atlaskit/heading';
import { RadioGroup } from '@atlaskit/radio';
import SectionMessage from '@atlaskit/section-message';
import Select from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import { Box, Stack, Text, xcss } from '@atlaskit/primitives';
import { useApp } from '../app-context';
import { slackChannels, weeks, withWeekday } from '../model';

type Values = { name: string; employeeNo: string; channel: string | null; active: 'yes' | 'no' };
type Errors = Partial<Record<'name' | 'employeeNo' | 'channel', string>>;

const formBox = xcss({
	backgroundColor: 'elevation.surface.raised',
	boxShadow: 'elevation.shadow.raised',
	borderRadius: 'radius.large',
	padding: 'space.300',
	maxWidth: '560px',
});

const fieldset = xcss({ borderStyle: 'none', margin: 'space.0', padding: 'space.0' });

const errorList = xcss({ margin: 'space.0', paddingInlineStart: 'space.250' });

const fieldLabels = { name: '名前', employeeNo: '社員番号', channel: 'uチャンネル' } as const;

function validate(v: Values): Errors {
	const e: Errors = {};
	if (!v.name.trim()) e.name = '名前を入力してください。';
	if (!v.employeeNo.trim()) e.employeeNo = '社員番号を入力してください。';
	else if (!/^[0-9]+$/.test(v.employeeNo.trim())) e.employeeNo = '社員番号は半角数字で入力してください（例：1012）。';
	if (!v.channel) e.channel = 'uチャンネルを選んでください。';
	return e;
}

export function SettingsPage({ setup }: { setup: boolean }) {
	const { me, setMembers, scenario, notify, navigate, logIn } = useApp();
	const isSetup = setup || !!me?.incomplete;
	const [values, setValues] = useState<Values>(() => ({
		name: me?.name ?? '',
		employeeNo: me?.employeeNo ?? '',
		channel: me?.channel ?? null,
		// 初回設定の初期値は「参加する」（ブリーフ）
		active: me?.incomplete || me?.active ? 'yes' : 'no',
	}));
	const [submitted, setSubmitted] = useState(scenario.state === 'invalid');
	const [saveError, setSaveError] = useState(scenario.state === 'save-error');
	const [saving, setSaving] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const shownSaved = useRef(false);

	useEffect(() => {
		// S10：保存に成功した直後の状態を直接開く
		if (scenario.state === 'saved' && !shownSaved.current) {
			shownSaved.current = true;
			notify('success', '設定を保存しました', '組み合わせの表示に反映されています。');
		}
	}, [scenario.state, notify]);

	if (!me) {
		return (
			<EmptyState
				header="自分の設定を変えるには、ログインしてください"
				headingLevel={1}
				description="Slack でログインすると、名前・社員番号・uチャンネル・CT への参加を設定できます。"
				primaryAction={
					<Button appearance="primary" onClick={logIn}>
						Slack でログイン
					</Button>
				}
			/>
		);
	}

	const errors = submitted ? validate(values) : {};
	const errorKeys = Object.keys(errors) as (keyof Errors)[];
	const wasActive = me.incomplete ? null : me.active;
	const willBeActive = values.active === 'yes';
	const participationChanged = wasActive !== null && wasActive !== willBeActive;

	const set = <K extends keyof Values>(k: K, v: Values[K]) => setValues((p) => ({ ...p, [k]: v }));

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setSaveError(false);
		const errs = validate(values);
		if (Object.keys(errs).length > 0) {
			window.setTimeout(() => summaryRef.current?.focus(), 0);
			return;
		}
		setSaving(true);
		window.setTimeout(() => {
			setSaving(false);
			// デモ：?state=save-error のときは必ず失敗させる
			if (scenario.state === 'save-error') {
				setSaveError(true);
				window.setTimeout(() => summaryRef.current?.focus(), 0);
				return;
			}
			setMembers((list) =>
				list.map((m) =>
					m.id === me.id
						? {
								...m,
								name: values.name.trim(),
								employeeNo: values.employeeNo.trim(),
								channel: values.channel ?? undefined,
								active: willBeActive,
								incomplete: false,
							}
						: m,
				),
			);
			if (isSetup) {
				notify('success', '設定が終わりました', 'CT の組み合わせに入るのは、次に組み直されたときからです。');
				navigate('/');
			} else {
				notify(
					'success',
					'設定を保存しました',
					participationChanged
						? `CT に${willBeActive ? '戻りました' : '参加しないようにしました'}。全員の組み合わせが組み直されます。`
						: undefined,
				);
			}
		}, 600);
	};

	const options = slackChannels.map((c) => ({ label: `#${c}`, value: c }));

	return (
		<Stack space="space.400">
			<Stack space="space.100">
				<Heading size="xlarge" as="h1">
					{isSetup ? 'はじめての設定' : '自分の設定'}
				</Heading>
				<Text color="color.text.subtle">
					{isSetup
						? 'CT の組み合わせに入るために、3 つの項目を設定してください。あとからいつでも変えられます。'
						: '変えられるのは自分の設定だけです。'}
				</Text>
			</Stack>

			<Box xcss={formBox}>
				<form onSubmit={onSubmit} noValidate>
					<Stack space="space.300">
						<Text size="small" color="color.text.subtle">
							<RequiredAsterisk /> は必須の項目です。
						</Text>

						{(errorKeys.length > 0 || saveError) && (
							<Box ref={summaryRef} tabIndex={-1}>
								{saveError ? (
									<SectionMessage appearance="error" title="保存できませんでした">
										<Text as="p">
											通信が途切れた可能性があります。入力した内容は残っているので、もう一度「保存する」を押してください。
										</Text>
									</SectionMessage>
								) : (
									<SectionMessage appearance="error" title={`入力されていない項目が ${errorKeys.length} つあります`}>
										<Box as="ul" xcss={errorList}>
											{errorKeys.map((k) => (
												<li key={k}>
													<Text>
														{fieldLabels[k]}：{errors[k]}
													</Text>
												</li>
											))}
										</Box>
									</SectionMessage>
								)}
							</Box>
						)}

						<Stack space="space.050">
							<Label htmlFor="name">
								名前
								<RequiredAsterisk />
							</Label>
							<Textfield
								id="name"
								name="name"
								value={values.name}
								isRequired
								isInvalid={!!errors.name}
								onChange={(e) => set('name', e.currentTarget.value)}
							/>
							{errors.name ? (
								<ErrorMessage>{errors.name}</ErrorMessage>
							) : (
								<HelperMessage>組み合わせの表示に使います。Slack の表示名が初期値です。</HelperMessage>
							)}
						</Stack>

						<Stack space="space.050">
							<Label htmlFor="employeeNo">
								社員番号
								<RequiredAsterisk />
							</Label>
							<Textfield
								id="employeeNo"
								name="employeeNo"
								inputMode="numeric"
								width="small"
								value={values.employeeNo}
								isRequired
								isInvalid={!!errors.employeeNo}
								onChange={(e) => set('employeeNo', e.currentTarget.value)}
							/>
							{errors.employeeNo ? (
								<ErrorMessage>{errors.employeeNo}</ErrorMessage>
							) : (
								<HelperMessage>半角数字。組み合わせの並び順に使います。</HelperMessage>
							)}
						</Stack>

						<Stack space="space.050">
							<Label htmlFor="channel-select">
								uチャンネル
								<RequiredAsterisk />
							</Label>
							<Select
								inputId="channel-select"
								options={options}
								value={options.find((o) => o.value === values.channel) ?? null}
								onChange={(o) => set('channel', o?.value ?? null)}
								placeholder="u- で始まるチャンネルを選ぶ"
								isInvalid={!!errors.channel}
								isClearable={false}
							/>
							{errors.channel ? (
								<ErrorMessage>{errors.channel}</ErrorMessage>
							) : (
								<HelperMessage>あなたとペアになった人が、このチャンネルでハドルを始めます。</HelperMessage>
							)}
						</Stack>

						<Stack space="space.100">
							<Box as="fieldset" xcss={fieldset}>
								<Stack space="space.050">
									<Box as="legend">
										<Text weight="bold">CT への参加</Text>
									</Box>
									<RadioGroup
										name="active"
										value={values.active}
										onChange={(e) => set('active', e.currentTarget.value as 'yes' | 'no')}
										options={[
											{ name: 'active', value: 'yes', label: '参加する' },
											{ name: 'active', value: 'no', label: '参加しない（休職・繁忙期など）' },
										]}
									/>
								</Stack>
							</Box>
							{participationChanged ? (
								<SectionMessage appearance="warning" title="保存すると、全員の組み合わせが組み直されます">
									<Text as="p">
										{willBeActive
											? `あなたが組み合わせに戻るため、${withWeekday(weeks[0].short)}の週以降の全員のペアとお休みの人が変わります。`
											: `あなたが組み合わせから抜けるため、${withWeekday(weeks[0].short)}の週以降の全員のペアとお休みの人が変わります。`}
									</Text>
								</SectionMessage>
							) : (
								<HelperMessage>参加をやめる・戻ると、全員の組み合わせが組み直されます。</HelperMessage>
							)}
						</Stack>

						<Box>
							<Button type="submit" appearance="primary" isLoading={saving}>
								{isSetup ? '設定を終える' : '保存する'}
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Stack>
	);
}
