// smarthr-ui 公式の Tailwind プリセット（デザイントークン）だけを使う。
// プリセットが prefix "shr-"・色・余白・角丸・影をトークンに限定し、preflight を無効にする。
import smarthrPreset from "smarthr-ui/lib/smarthr-ui-preset";

export default {
	presets: [smarthrPreset],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
};
