import Button from "@atlaskit/button/default/button";
import LinkButton from "@atlaskit/button/link";
import { Checkbox } from "@atlaskit/checkbox";
import Form, { CheckboxField, ErrorMessage, Field, FormFooter, FormHeader, FormSection, HelperMessage, MessageWrapper, RequiredAsterisk } from "@atlaskit/form";
import Heading from "@atlaskit/heading";
import { Box, Stack, Text } from "@atlaskit/primitives/compiled";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import { ErrorIconJa, WarningIconJa } from "../components/messageIcons";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import { cssMap } from "@atlaskit/css";
import { useEffect, useRef, useState } from "react";
import type { Member } from "../model";
import { linkTo } from "../router";

const styles = cssMap({
	// フォームは読みやすい幅に制限する（ADS Form の例と同程度の幅）
	form: { maxWidth: "560px" },
});

export type SettingsValues = { name: string; employeeNo: string; channel: string; active: boolean };
type Option = { label: string; value: string };

type Props = {
	me: Member;
	firstTime: boolean;
	channels: string[];
	employeeNo: string;
	/** S16（未入力のまま送信）・S17（保存に失敗）を直接開くための初期表示 */
	preset: "none" | "submitted-empty" | "save-failed";
	onSave: (values: SettingsValues) => Promise<boolean>;
};

export function SettingsPage({ me, firstTime, channels, employeeNo, preset, onSave }: Props) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [saveFailed, setSaveFailed] = useState(preset === "save-failed");
	const [active, setActive] = useState(firstTime ? true : me.active);
	const options: Option[] = channels.map((c) => ({ label: `#${c}`, value: c }));

	// S16：初回設定を未入力のまま送信した直後の画面を再現する（実際に送信してエラーを出す）
	useEffect(() => {
		if (preset === "submitted-empty") formRef.current?.requestSubmit();
	}, [preset]);

	const changedParticipation = !firstTime && active !== me.active;

	return (
		<Box xcss={styles.form}>
			<Form<{ name: string; employeeNo: string; channel: Option | null; active: boolean }>
				onSubmit={async (data) => {
					const ok = await onSave({ name: data.name.trim(), employeeNo: data.employeeNo, channel: data.channel!.value, active: data.active });
					setSaveFailed(!ok);
					if (!ok) window.scrollTo(0, 0);
				}}
			>
				{({ formProps, submitting }) => (
					<form
						{...formProps}
						ref={(el) => {
							formRef.current = el;
							const r = formProps.ref;
							if (typeof r === "function") r(el);
							else if (r) (r as React.MutableRefObject<HTMLFormElement | null>).current = el;
						}}
						noValidate
					>
						<FormHeader>
							<Stack space="space.100">
								<Heading size="large" as="h1">
									{firstTime ? "はじめての設定" : "自分の設定"}
								</Heading>
								{firstTime ? (
									<Text as="p">
										CT の組み合わせに入るために、社員番号と uチャンネルを設定してください。設定が終わると、今週の相手と予定がすぐに表示されます。
									</Text>
								) : (
									<Text as="p">変えられるのは自分の設定だけです。</Text>
								)}
								<Text as="p" size="small" color="color.text.subtle">
									<RequiredAsterisk /> は必須項目です
								</Text>
							</Stack>
						</FormHeader>

						{saveFailed && (
							<Box paddingBlockStart="space.200">
								<SectionMessage
									appearance="error"
				icon={ErrorIconJa}
									title="設定を保存できませんでした"
									actions={[
										<SectionMessageAction key="retry" onClick={() => formRef.current?.requestSubmit()}>
											もう一度保存する
										</SectionMessageAction>,
									]}
								>
									<Text as="p">通信がうまくいかなかった可能性があります。入力した内容は残っているので、そのままもう一度保存してください。</Text>
								</SectionMessage>
							</Box>
						)}

						<FormSection>
							<Field<string> name="name" label="名前" isRequired defaultValue={me.name} validate={(v) => (!v?.trim() ? "名前を入力してください" : undefined)}>
								{({ fieldProps, error }) => (
									<>
										<Textfield {...fieldProps} autoComplete="name" />
										<MessageWrapper>{error ? <ErrorMessage>{error}</ErrorMessage> : <HelperMessage>Slack の表示名が入っています。組み合わせに表示される名前です。</HelperMessage>}</MessageWrapper>
									</>
								)}
							</Field>

							<Field<string>
								name="employeeNo"
								label="社員番号"
								isRequired
								defaultValue={employeeNo}
								validate={(v) => (!v ? "社員番号を入力してください" : /^[0-9]+$/.test(v) ? undefined : "社員番号は半角数字だけで入力してください")}
							>
								{({ fieldProps, error }) => (
									<>
										<Textfield {...fieldProps} inputMode="numeric" autoComplete="off" />
										<MessageWrapper>{error ? <ErrorMessage>{error}</ErrorMessage> : <HelperMessage>半角数字。メンバーの並び順に使います。</HelperMessage>}</MessageWrapper>
									</>
								)}
							</Field>

							<Field<Option | null>
								name="channel"
								label="uチャンネル"
								isRequired
								defaultValue={options.find((o) => o.value === me.channel) ?? null}
								validate={(v) => (!v ? "uチャンネルを選んでください" : undefined)}
							>
								{({ fieldProps: { id, ...rest }, error }) => (
									<>
										<Select<Option> inputId={id} {...rest} options={options} placeholder="選んでください" isClearable={false} />
										<MessageWrapper>
											{error ? <ErrorMessage>{error}</ErrorMessage> : <HelperMessage>ハドルを始める場所に使う、あなたの個人用チャンネル（u- で始まる）です。</HelperMessage>}
										</MessageWrapper>
									</>
								)}
							</Field>

							<CheckboxField name="active" defaultIsChecked={firstTime ? true : me.active}>
								{({ fieldProps }) => (
									<>
										<Checkbox
											{...fieldProps}
											label="CT に参加する"
											onChange={(e) => {
												fieldProps.onChange(e);
												setActive(e.currentTarget.checked);
											}}
										/>
										<MessageWrapper>
											<HelperMessage>参加をやめる・戻ると、今週以降の全員の組み合わせが組み直されます。休職や繁忙期で抜けるときに外してください。</HelperMessage>
										</MessageWrapper>
									</>
								)}
							</CheckboxField>

							{changedParticipation && (
								<Box paddingBlockStart="space.200">
									<SectionMessage appearance="warning" icon={WarningIconJa} title="保存すると組み合わせが組み直されます">
										<Text as="p">
											{active
												? "参加に戻ると、今週以降の組み合わせにあなたが入り、ほかのメンバーの相手も変わります。"
												: "参加をやめると、今週以降の組み合わせからあなたが外れ、ほかのメンバーの相手も変わります。"}
										</Text>
									</SectionMessage>
								</Box>
							)}
						</FormSection>

						<FormFooter>
							<Stack space="space.100">
								<Box>
									{!firstTime && (
										<LinkButton appearance="subtle" {...linkTo("home")}>
											キャンセル
										</LinkButton>
									)}
									<Button type="submit" appearance="primary" isLoading={submitting}>
										{firstTime ? "設定を完了する" : "保存する"}
									</Button>
								</Box>
							</Stack>
						</FormFooter>
					</form>
				)}
			</Form>
		</Box>
	);
}
