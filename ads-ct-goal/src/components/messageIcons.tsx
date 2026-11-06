import StatusErrorIcon from "@atlaskit/icon/core/status-error";
import StatusWarningIcon from "@atlaskit/icon/core/status-warning";
import { token } from "@atlaskit/tokens";
import type { ComponentProps } from "react";

// SectionMessage は既定アイコンのラベルに appearance 名（"error" / "warning"）を英語のまま入れる。
// icon プロップで差し替えられるので、日本語ラベルのアイコンを渡す（スクリーンリーダー向け）。
type IconProps = Omit<ComponentProps<typeof StatusErrorIcon>, "label">;
export const ErrorIconJa = (props: IconProps) => <StatusErrorIcon {...props} color={props.color ?? token("color.icon.danger")} label="エラー" />;
export const WarningIconJa = (props: IconProps) => <StatusWarningIcon {...props} color={props.color ?? token("color.icon.warning")} label="注意" />;
