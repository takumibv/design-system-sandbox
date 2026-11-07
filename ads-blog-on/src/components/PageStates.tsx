import { useLocation, useNavigate } from "react-router-dom";
import EmptyState from "@atlaskit/empty-state";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import Skeleton from "@atlaskit/skeleton";
import Spinner from "@atlaskit/spinner";
import { LinkButton } from "@atlaskit/button/new";
import Button from "@atlaskit/button/new";
import { Box, Inline, Stack } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import VisuallyHidden from "@atlaskit/visually-hidden";
import { useStore } from "../store";
import { PRESET_FLAGS } from "./Flags";

/** 一覧の読み込み中：実際の行の形に合わせた Skeleton */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
	return (
		<Box role="status" aria-live="polite">
			<VisuallyHidden>読み込み中です</VisuallyHidden>
			<Stack space="space.300">
				{Array.from({ length: rows }, (_, i) => (
					<Stack key={i} space="space.100">
						<Skeleton width="40%" height="20px" borderRadius={token("radius.small")} />
						<Skeleton width="70%" height="16px" borderRadius={token("radius.small")} />
						<Skeleton width="30%" height="12px" borderRadius={token("radius.small")} />
					</Stack>
				))}
			</Stack>
		</Box>
	);
}

/** 詳細の読み込み中 */
export function DetailSpinner() {
	return (
		<Inline alignInline="center">
			<Box role="status" aria-live="polite">
				<Spinner size="large" label="読み込み中です" />
			</Box>
		</Inline>
	);
}

/** 読み込みの失敗：何が起きたかと次の手（もう一度読み込む） */
export function LoadError({ what }: { what: string }) {
	const navigate = useNavigate();
	const location = useLocation();
	const retry = () => {
		const p = new URLSearchParams(location.search);
		p.delete("state");
		navigate({ pathname: location.pathname, search: p.toString() });
	};
	return (
		<SectionMessage
			appearance="error"
			title={`${what}を読み込めませんでした`}
			actions={[<SectionMessageAction key="retry" onClick={retry}>もう一度読み込む</SectionMessageAction>]}
		>
			通信が途中で切れた可能性があります。もう一度読み込んでも表示されないときは、時間をおいて開き直してください。
		</SectionMessage>
	);
}

/** 権限の無い操作：理由と、できること（ログイン・戻る）を示す。ボタンを無効にして並べることはしない */
export function NoPermission({ action, backHref }: { action: string; backHref: string }) {
	const { user, setRole, showFlag } = useStore();
	return (
		<EmptyState
			header={`${action}権限がありません`}
			headingLevel={1}
			description={
				user
					? "投稿予定を編集できるのは、その投稿の書く人と編集担当です。変更が必要なときは、書く人か編集担当に Slack で相談してください。"
					: "ログインしていないため、閲覧だけできます。Slack でログインすると、投稿予定の登録と、自分が書く投稿の編集ができます。"
			}
			primaryAction={
				user ? undefined : (
					<Button
						appearance="primary"
						onClick={() => {
							setRole("member");
							showFlag(PRESET_FLAGS.login);
						}}
					>
						Slack でログイン
					</Button>
				)
			}
			secondaryAction={<LinkButton href={backHref}>戻る</LinkButton>}
		/>
	);
}

export function NotFound({ what = "ページ" }: { what?: string }) {
	return (
		<EmptyState
			header={`${what}が見つかりません`}
			headingLevel={1}
			description="URL が間違っているか、削除された可能性があります。投稿計画から探してください。"
			primaryAction={
				<LinkButton appearance="primary" href="/">
					投稿計画へ戻る
				</LinkButton>
			}
		/>
	);
}
