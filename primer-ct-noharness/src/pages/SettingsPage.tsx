import { useEffect, useRef, useState, type FormEvent } from "react";
import { Banner, Button, Checkbox, FormControl, Heading, Select, Stack, Text, TextInput } from "@primer/react";
import { Blankslate, InlineMessage } from "@primer/react/experimental";
import { PersonIcon } from "@primer/octicons-react";
import { useApp } from "../App";
import { Layout } from "../components/Layout";
import { channelOptions, employeeNumber, type Member } from "../model";
import { InternalLink } from "./SchedulePage";

type Errors = Partial<Record<"name" | "number" | "channel", string>>;
type Status = { kind: "saved"; participationChanged: boolean; joined: boolean } | { kind: "failed" } | null;

function validate(name: string, number: string, channel: string): Errors {
	const errors: Errors = {};
	if (!name.trim()) errors.name = "名前を入力してください。";
	if (!number.trim()) errors.number = "社員番号を入力してください。";
	else if (!/^[0-9]+$/.test(number.trim())) errors.number = "社員番号は半角数字だけで入力してください（例：1012）。";
	if (!channel) errors.channel = "uチャンネルを選んでください。";
	return errors;
}

export function SettingsPage({ mode }: { mode: "settings" | "setup" }) {
	const { user, members, login } = useApp();
	const setup = mode === "setup";
	const title = setup ? "初回設定" : "自分の設定";

	if (!user) {
		return (
			<Layout title={title} contentWidth="medium">
				<Heading as="h1">{title}</Heading>
				<Blankslate border>
					<Blankslate.Visual>
						<PersonIcon size={24} />
					</Blankslate.Visual>
					<Blankslate.Heading as="h2">ログインすると、自分の設定を変えられます</Blankslate.Heading>
					<Blankslate.Description>名前・社員番号・uチャンネル・CT への参加を設定できます。変えられるのは自分の設定だけです。</Blankslate.Description>
					<Blankslate.PrimaryAction onClick={login}>Slack でログイン</Blankslate.PrimaryAction>
				</Blankslate>
			</Layout>
		);
	}
	return <SettingsForm key={user.id} user={user} setup={setup} title={title} members={members} />;
}

function SettingsForm({ user, setup, title, members }: { user: Member; setup: boolean; title: string; members: Member[] }) {
	const { scenario, updateMember } = useApp();
	const [name, setName] = useState(user.name);
	const [number, setNumber] = useState(employeeNumber(user));
	const [channel, setChannel] = useState(user.channel ?? "");
	// 初回設定では初期値を「参加する」にする
	const [active, setActive] = useState(user.incomplete ? true : user.active);
	const [errors, setErrors] = useState<Errors>(() =>
		scenario.submittedEmpty ? validate(user.name, employeeNumber(user), user.channel ?? "") : {},
	);
	const [status, setStatus] = useState<Status>(() =>
		scenario.saved
			? { kind: "saved", participationChanged: false, joined: false }
			: scenario.saveFails
				? { kind: "failed" }
				: null,
	);
	const [saving, setSaving] = useState(false);
	const summaryRef = useRef<HTMLElement>(null);
	const statusRef = useRef<HTMLElement>(null);
	const numberRef = useRef<HTMLInputElement>(null);
	const channelRef = useRef<HTMLSelectElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const savedActive = user.incomplete ? false : user.active;
	const participationChanged = active !== savedActive;
	const errorCount = Object.keys(errors).length;

	useEffect(() => {
		if (status) statusRef.current?.focus();
	}, [status]);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		const next = validate(name, number, channel);
		setErrors(next);
		setStatus(null);
		if (Object.keys(next).length > 0) {
			// 最初の誤りの項目へフォーカスを移す
			(next.name ? nameRef : next.number ? numberRef : channelRef).current?.focus();
			return;
		}
		setSaving(true);
		window.setTimeout(() => {
			setSaving(false);
			if (scenario.saveFails) {
				setStatus({ kind: "failed" });
				return;
			}
			updateMember({ ...user, name: name.trim(), channel, active, incomplete: false });
			setStatus({ kind: "saved", participationChanged, joined: active });
		}, 600);
	};

	// S16：未入力のまま送信した直後は、エラーの要約を読ませる
	useEffect(() => {
		if (scenario.submittedEmpty) summaryRef.current?.focus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const options = channelOptions(members);

	return (
		<Layout title={title} contentWidth="medium">
			<Stack gap="condensed">
				<Heading as="h1">{setup ? "はじめに、3 つの項目を設定してください" : "自分の設定"}</Heading>
				<Text as="p">
					{setup
						? "CTスケジュールへようこそ。名前・社員番号・uチャンネルを設定すると、毎週の組み合わせに入ります。あとから「自分の設定」でいつでも変えられます。"
						: "変えられるのは自分の設定だけです。"}
				</Text>
			</Stack>

			{status?.kind === "saved" && (
				<Banner
					ref={statusRef}
					tabIndex={-1}
					variant="success"
					title={setup ? "初回設定が終わりました" : "設定を保存しました"}
					description={
						setup
							? status.joined
								? "今週以降の全員の組み合わせが組み直され、あなたも入ります。"
								: "「CT に参加する」を外したため、組み合わせには入りません。参加するときは「自分の設定」で変えてください。"
							: status.participationChanged
							? status.joined
								? "CT への参加に戻りました。今週以降の全員の組み合わせが組み直されます。"
								: "CT への参加をやめました。今週以降の全員の組み合わせが組み直され、あなたは入りません。"
							: "保存した内容は、次に組み合わせを表示したときから使われます。"
					}
					primaryAction={<BannerLink to="/">組み合わせを見る</BannerLink>}
				/>
			)}
			{status?.kind === "failed" && (
				<Banner
					ref={statusRef}
					tabIndex={-1}
					variant="critical"
					title="設定を保存できませんでした"
					description="通信が不安定な可能性があります。入力した内容はそのまま残っています。もう一度保存してください。"
					primaryAction={
						<Banner.PrimaryAction onClick={() => formRef.current?.requestSubmit()} loading={saving}>
							もう一度保存する
						</Banner.PrimaryAction>
					}
				/>
			)}
			{errorCount > 0 && (
				<Banner
					ref={summaryRef}
					tabIndex={-1}
					variant="critical"
					title={`${errorCount} つの項目を確かめてください`}
					description="各項目の下に出ている説明に沿って入力し、もう一度保存してください。"
				/>
			)}

			<form ref={formRef} onSubmit={onSubmit} noValidate aria-label={title}>
				<Stack gap="normal">
					<Text size="small" className="muted">
						* の項目は必須です。
					</Text>
					<FormControl required>
						<FormControl.Label>名前</FormControl.Label>
						<TextInput
							ref={nameRef}
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete="name"
							block
							validationStatus={errors.name ? "error" : undefined}
						/>
						{errors.name ? (
							<FormControl.Validation variant="error">{errors.name}</FormControl.Validation>
						) : (
							<FormControl.Caption>組み合わせに表示する名前です。Slack の表示名が初期値です。</FormControl.Caption>
						)}
					</FormControl>

					<FormControl required>
						<FormControl.Label>社員番号</FormControl.Label>
						<TextInput
							ref={numberRef}
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							inputMode="numeric"
							autoComplete="off"
							validationStatus={errors.number ? "error" : undefined}
						/>
						{errors.number ? (
							<FormControl.Validation variant="error">{errors.number}</FormControl.Validation>
						) : (
							<FormControl.Caption>半角数字。組み合わせの並び順に使います。</FormControl.Caption>
						)}
					</FormControl>

					<FormControl required>
						<FormControl.Label>uチャンネル</FormControl.Label>
						<Select
							ref={channelRef}
							value={channel}
							onChange={(e) => setChannel(e.target.value)}
							validationStatus={errors.channel ? "error" : undefined}
						>
							<Select.Option value="" disabled>
								選んでください
							</Select.Option>
							{options.map((c) => (
								<Select.Option key={c} value={c}>
									#{c}
								</Select.Option>
							))}
						</Select>
						{errors.channel ? (
							<FormControl.Validation variant="error">{errors.channel}</FormControl.Validation>
						) : (
							<FormControl.Caption>あなたの個人用 Slack チャンネル（u- で始まる）です。ペアの相手とのハドルに使います。</FormControl.Caption>
						)}
					</FormControl>

					<Stack gap="condensed">
						<FormControl>
							<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />
							<FormControl.Label>CT に参加する</FormControl.Label>
							<FormControl.Caption>休職中や繁忙期は外してください。戻るときはもう一度チェックします。</FormControl.Caption>
						</FormControl>
						{participationChanged && !setup && (
							<InlineMessage variant="warning">
								保存すると、今週以降の全員の組み合わせが組み直されます（{active ? "あなたが入ります" : "あなたは外れます"}）。
							</InlineMessage>
						)}
					</Stack>

					<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
						<Button type="submit" variant="primary" loading={saving}>
							{setup ? "保存して始める" : "保存する"}
						</Button>
						{!setup && <InternalLink to="/">保存せずに組み合わせへ戻る</InternalLink>}
					</Stack>
				</Stack>
			</form>
		</Layout>
	);
}

function BannerLink({ to, children }: { to: string; children: string }) {
	const { navigate } = useApp();
	return <Banner.PrimaryAction onClick={() => navigate(to)}>{children}</Banner.PrimaryAction>;
}
