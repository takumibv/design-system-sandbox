import { useEffect, useRef, useState } from "react";
import { Banner, Button, ConfirmationDialog, Heading, Label, Spinner, Stack, Text, useResponsiveValue } from "@primer/react";
import { Blankslate, DataTable, Table, type Column } from "@primer/react/experimental";
import { PeopleIcon, TrashIcon } from "@primer/octicons-react";
import { useApp } from "../App";
import { Layout } from "../components/Layout";
import { Person } from "../components/PersonAvatar";
import { isParticipant, type Member } from "../model";
import { InternalLink } from "./SchedulePage";

type Result = { ok: boolean; member: Member } | null;

export function MembersPage() {
	const { members, user, userId, scenario, removeMember, load, retryLoad, login } = useApp();
	const [confirmId, setConfirmId] = useState<number | undefined>(scenario.confirmDeleteId);
	const [deleting, setDeleting] = useState(false);
	const [result, setResult] = useState<Result>(null);
	const resultRef = useRef<HTMLElement>(null);
	const target = members.find((m) => m.id === confirmId);

	useEffect(() => {
		if (result) resultRef.current?.focus();
	}, [result]);

	// S14：失敗の状態は、確認のあと「削除する」を押して失敗した直後として開く
	useEffect(() => {
		if (scenario.deleteFails && scenario.confirmDeleteId) {
			const member = members.find((m) => m.id === scenario.confirmDeleteId);
			if (member) {
				setConfirmId(undefined);
				setResult({ ok: false, member });
			}
		}
		// 最初の表示のときだけ
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const runDelete = (member: Member) => {
		setDeleting(true);
		window.setTimeout(() => {
			setDeleting(false);
			setConfirmId(undefined);
			if (scenario.deleteFails) {
				setResult({ ok: false, member });
			} else {
				removeMember(member.id);
				setResult({ ok: true, member });
			}
		}, 600);
	};

	const participants = members.filter(isParticipant).length;
	const others = members.length - participants;

	// 390px など狭い幅では「参加状況」を名前の下にまとめ、操作の列が切れないようにする
	const narrow = useResponsiveValue({ narrow: true, regular: false, wide: false }, false);
	const status = (m: Member) =>
				m.incomplete ? (
					<Stack direction="horizontal" gap="condensed" wrap="wrap">
						<Label variant="secondary">不参加</Label>
						<Label variant="attention">初回設定が未完了</Label>
					</Stack>
				) : m.active ? (
					<Label variant="success">参加</Label>
				) : (
					<Label variant="secondary">不参加</Label>
				);
	const nameCell = (m: Member) => (
		<Stack direction="horizontal" align="center" gap="condensed" wrap="wrap">
			<Person member={m} />
			{m.id === userId && <Label variant="accent">あなた</Label>}
		</Stack>
	);
	const columns: Column<Member>[] = narrow
		? [
				{
					header: "メンバー・参加状況",
					field: "name",
					rowHeader: true,
					renderCell: (m) => (
						<Stack gap="condensed" align="start">
							{nameCell(m)}
							{status(m)}
						</Stack>
					),
				},
			]
		: [
				{ header: "メンバー", field: "name", rowHeader: true, renderCell: nameCell },
				{ header: "参加状況", id: "status", renderCell: status },
			];
	if (user) {
		columns.push({
			header: "操作",
			id: "actions",
			align: "end",
			renderCell: (m) =>
				m.id === userId ? (
					<InternalLink to={user.incomplete ? "/setup" : "/settings"}>{narrow ? "設定" : "自分の設定を変える"}</InternalLink>
				) : (
					<Button size="small" leadingVisual={TrashIcon} aria-label={`${m.name} さんを削除`} onClick={() => setConfirmId(m.id)}>
						削除
					</Button>
				),
		});
	}

	return (
		<Layout title="メンバー">
			<Stack gap="condensed">
				<Heading as="h1">メンバー</Heading>
				<Text as="p">
					Slack でログインしたことのある人の一覧です（社員番号順）。「参加」の人が毎週の組み合わせに入ります。
					{!user && " ログインすると、自分の参加状況を変えたり、退職した人を削除したりできます。"}
				</Text>
			</Stack>

			{result &&
				(result.ok ? (
					<Banner
						ref={resultRef}
						tabIndex={-1}
						variant="success"
						title={`${result.member.name} さんを削除しました`}
						description="メンバーの一覧と、これからの組み合わせから外れました。組み合わせは組み直されます。"
						onDismiss={() => setResult(null)}
					/>
				) : (
					<Banner
						ref={resultRef}
						tabIndex={-1}
						variant="critical"
						title={`${result.member.name} さんを削除できませんでした`}
						description="通信が不安定な可能性があります。メンバーの一覧は変わっていません。もう一度お試しください。"
						primaryAction={
							<Banner.PrimaryAction onClick={() => setConfirmId(result.member.id)}>もう一度削除する</Banner.PrimaryAction>
						}
						onDismiss={() => setResult(null)}
					/>
				))}

			{load === "loading" ? (
				<Stack direction="horizontal" align="center" gap="condensed" role="status">
					<Spinner size="small" srText={null} />
					<Text>メンバーを読み込んでいます…</Text>
				</Stack>
			) : load === "error" ? (
				<Banner
					variant="critical"
					title="メンバーを読み込めませんでした"
					description="通信が不安定な可能性があります。もう一度読み込んでください。"
					primaryAction={<Banner.PrimaryAction onClick={retryLoad}>もう一度読み込む</Banner.PrimaryAction>}
				/>
			) : members.length === 0 ? (
				<Blankslate border>
					<Blankslate.Visual>
						<PeopleIcon size={24} />
					</Blankslate.Visual>
					<Blankslate.Heading as="h2">まだメンバーがいません</Blankslate.Heading>
					<Blankslate.Description>
						Slack でログインした人が、ここにメンバーとして並びます。ログインして初回設定を終えると、組み合わせに入ります。
					</Blankslate.Description>
					{!user && <Blankslate.PrimaryAction onClick={login}>Slack でログイン</Blankslate.PrimaryAction>}
				</Blankslate>
			) : (
				<Table.Container>
					<Table.Title as="h2" id="members-title">
						メンバーの一覧
					</Table.Title>
					<Table.Subtitle as="p" id="members-subtitle">
						参加 {participants} 人・不参加 {others} 人（全 {members.length} 人）
					</Table.Subtitle>
					<DataTable
						aria-labelledby="members-title"
						aria-describedby="members-subtitle"
						data={members}
						columns={columns}
						cellPadding="condensed"
					/>
				</Table.Container>
			)}

			{target && (
				<ConfirmationDialog
					title={`${target.name} さんを削除しますか？`}
					onClose={(gesture) => {
						if (gesture === "confirm") runDelete(target);
						else setConfirmId(undefined);
					}}
					confirmButtonContent="削除する"
					cancelButtonContent="キャンセル"
					confirmButtonType="danger"
					confirmButtonLoading={deleting}
				>
					{target.name} さんをメンバーの一覧と、これからの組み合わせから外します。この操作は取り消せません。退職などで CT に参加しなくなった人だけを削除してください。一時的に抜けるだけなら、本人が「自分の設定」で参加をやめられます。
				</ConfirmationDialog>
			)}
		</Layout>
	);
}
