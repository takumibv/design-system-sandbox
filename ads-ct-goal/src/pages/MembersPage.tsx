import Button from "@atlaskit/button/default/button";
import LinkButton from "@atlaskit/button/link";
import { cssMap } from "@atlaskit/css";
import EmptyState from "@atlaskit/empty-state";
import Heading from "@atlaskit/heading";
import Lozenge from "@atlaskit/lozenge";
import ModalDialog, { CloseButton, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from "@atlaskit/modal-dialog";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import { PersonAvatar } from "../components/PersonAvatar";
import { isSetupComplete, type Member } from "../model";
import { linkTo } from "../router";

const styles = cssMap({
	list: {
		listStyle: "none",
		margin: token("space.0"),
		padding: token("space.0"),
		borderWidth: token("border.width"),
		borderStyle: "solid",
		borderColor: token("color.border"),
		borderRadius: token("radius.large"),
	},
	row: {
		borderBlockStartWidth: token("border.width"),
		borderBlockStartStyle: "solid",
		borderBlockStartColor: token("color.border"),
	},
	// 名前の列は伸び、操作の列は右に寄せる。390px では操作を名前の下に折り返す
	main: { flexGrow: 1, flexBasis: "16rem", minWidth: "0" },
	actions: { marginInlineStart: "auto", "@media not all and (min-width: 48rem)": { marginInlineStart: token("space.0") } },
});

type Props = {
	members: Member[];
	me: Member | undefined;
	confirmDeleteId: number | null;
	onAskDelete: (id: number) => void;
	onCancelDelete: () => void;
	onConfirmDelete: (id: number) => void;
	onLogin: () => void;
};

export function MembersPage({ members, me, confirmDeleteId, onAskDelete, onCancelDelete, onConfirmDelete, onLogin }: Props) {
	const active = members.filter((m) => m.active).length;
	const inactive = members.length - active;
	const target = members.find((m) => m.id === confirmDeleteId);

	return (
		<Stack space="space.300">
			<Stack space="space.100">
				<Heading size="large" as="h1">
					メンバー
				</Heading>
				{members.length > 0 && (
					<Text as="p" color="color.text.subtle">
						ログインしたことのある {members.length} 人（社員番号順）。参加 {active} 人・不参加 {inactive} 人。組み合わせに入るのは「参加」の人だけです。
					</Text>
				)}
			</Stack>

			{members.length === 0 ? (
				<EmptyState
					header="まだメンバーがいません"
					headingLevel={2}
					description="Slack でログインした人が、ここにメンバーとして表示されます。最初の 1 人になって、CT の組み合わせを始めましょう。"
					primaryAction={
						me ? undefined : (
							<Button appearance="primary" onClick={onLogin}>
								Slack でログイン
							</Button>
						)
					}
				/>
			) : (
				<Box as="ul" xcss={styles.list}>
					{members.map((m, i) => (
						<Box as="li" key={m.id} paddingInline="space.200" paddingBlock="space.150" xcss={i > 0 ? styles.row : undefined}>
							<Inline space="space.150" alignBlock="center" shouldWrap rowSpace="space.100">
								<Inline space="space.150" alignBlock="center" xcss={styles.main}>
									<PersonAvatar member={m} size="medium" decorative />
									<Stack space="space.025">
										<Inline space="space.100" alignBlock="center" shouldWrap>
											<Text weight="medium">{m.name}</Text>
											{me?.id === m.id && <Text color="color.text.subtle">（あなた）</Text>}
										</Inline>
										<Text size="small" color="color.text.subtle">
											{m.channel ? `#${m.channel}` : "uチャンネル未設定"}
										</Text>
									</Stack>
								</Inline>
								<Inline space="space.100" alignBlock="center" shouldWrap xcss={styles.actions}>
									{m.active ? <Lozenge appearance="success">参加</Lozenge> : <Lozenge appearance="default">不参加</Lozenge>}
									{!isSetupComplete(m) && <Lozenge appearance="moved">初回設定が未完了</Lozenge>}
									{me && me.id === m.id && <LinkButton {...linkTo("settings")}>設定を変更</LinkButton>}
									{me && me.id !== m.id && (
										<Button appearance="subtle" onClick={() => onAskDelete(m.id)} aria-label={`${m.name}さんを削除`}>
											削除
										</Button>
									)}
								</Inline>
							</Inline>
						</Box>
					))}
				</Box>
			)}

			{!me && members.length > 0 && (
				<Text as="p" color="color.text.subtle">
					ログインすると、自分の設定の変更と、退職した人などの削除ができます。
				</Text>
			)}

			<ModalTransition>
				{target && (
					<ModalDialog onClose={onCancelDelete} width="small">
						<ModalHeader>
							<ModalTitle appearance="danger">{target.name}さんを削除しますか？</ModalTitle>
							<CloseButton onClick={onCancelDelete} label="閉じる" />
						</ModalHeader>
						<ModalBody>
							<Stack space="space.150">
								<Inline space="space.100" alignBlock="center">
									<PersonAvatar member={target} size="medium" decorative />
									<Text weight="medium">{target.name}</Text>
									{target.channel && <Text color="color.text.subtle">#{target.channel}</Text>}
								</Inline>
								<Text as="p">
									メンバー一覧と組み合わせから外れます。{target.active ? "参加者が減るため、今週以降の全員の組み合わせが組み直されます。" : "現在は不参加のため、組み合わせは変わりません。"}
								</Text>
								<Text as="p" weight="bold">
									この操作は取り消せません。
								</Text>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button appearance="subtle" onClick={onCancelDelete}>
								キャンセル
							</Button>
							<Button appearance="danger" onClick={() => onConfirmDelete(target.id)}>
								削除する
							</Button>
						</ModalFooter>
					</ModalDialog>
				)}
			</ModalTransition>
		</Stack>
	);
}
