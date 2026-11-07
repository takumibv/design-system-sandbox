import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AutoDismissFlag, default as Flag } from "@atlaskit/flag";
import FlagGroup from "@atlaskit/flag/flag-group";
import StatusSuccessIcon from "@atlaskit/icon/core/status-success";
import StatusErrorIcon from "@atlaskit/icon/core/status-error";
import StatusInformationIcon from "@atlaskit/icon/core/status-information";
import { token } from "@atlaskit/tokens";
import { useStore, useViewParams, type FlagItem } from "../store";

// 保存・削除などの成否は Flag で知らせる（ADS Messaging「If you want to tell someone they've accomplished a task, consider a flag」）。
// 成功は自動で消す。失敗は自動で消さない（Flag usage「Never use auto dismiss flags for any critical warning or error messages」）。

/** URL の ?flag= で直接開ける知らせ（撮影・確認用）。文言は実際の操作で出るものと同じ */
export const PRESET_FLAGS: Record<string, Omit<FlagItem, "id">> = {
	created: { kind: "success", title: "投稿予定を登録しました", description: "計画の一覧にも表示されます。" },
	saved: { kind: "success", title: "変更を保存しました" },
	status: { kind: "success", title: "状態を「レビュー中」に変更しました" },
	published: { kind: "success", title: "公開済みにしました", description: "公開日と記事 URL を記録しました。" },
	deleted: { kind: "success", title: "投稿予定を削除しました" },
	"save-error": {
		kind: "error",
		title: "保存できませんでした",
		description: "通信が途中で切れた可能性があります。入力内容は残っているので、もう一度保存してください。",
	},
	"delete-error": {
		kind: "error",
		title: "削除できませんでした",
		description: "通信が途中で切れた可能性があります。時間をおいて、もう一度削除してください。",
	},
	login: {
		kind: "info",
		title: "Slack でログインしました",
		description: "デモのため、実際の Slack 認証は行っていません。佐藤 美咲としてログインしています。",
	},
	logout: { kind: "info", title: "ログアウトしました", description: "ログインしなくても計画は閲覧できます。" },
};

const icon = (kind: FlagItem["kind"]) =>
	kind === "success" ? (
		<StatusSuccessIcon label="成功" color={token("color.icon.success")} />
	) : kind === "error" ? (
		<StatusErrorIcon label="エラー" color={token("color.icon.danger")} />
	) : (
		<StatusInformationIcon label="お知らせ" color={token("color.icon.information")} />
	);

export function FlagHost() {
	const { flags, dismissFlag, showFlag } = useStore();
	const { flag } = useViewParams();
	const location = useLocation();
	const shownFor = useRef<string | null>(null);

	useEffect(() => {
		const key = `${location.key}:${flag}`;
		if (flag && PRESET_FLAGS[flag] && shownFor.current !== key) {
			shownFor.current = key;
			showFlag(PRESET_FLAGS[flag]);
		}
	}, [flag, location.key, showFlag]);

	return (
		<FlagGroup onDismissed={(id) => dismissFlag(Number(id))} label="お知らせ">
			{flags.map((f) => {
				const props = {
					id: f.id,
					key: f.id,
					icon: icon(f.kind),
					title: f.title,
					description: f.description,
					actions: f.actions,
				};
				return f.kind === "error" ? <Flag {...props} /> : <AutoDismissFlag {...props} />;
			})}
		</FlagGroup>
	);
}
