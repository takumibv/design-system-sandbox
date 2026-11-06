import Avatar, { AvatarContent } from "@atlaskit/avatar";
import { cssMap } from "@atlaskit/css";
import { Flex, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import type { Member } from "../model";

// ADS の Avatar は src が無いと汎用の人型アイコンになり、頭文字を出す仕組みがない
// （ガイドラインには "Provide fallback initials" とあるが API が無い）。
// そこで AvatarContent の中身を差し替え、頭文字と人ごとの accent 色を出す。
// accent 色は「意味を持たない識別用の色」（ads_get_guidelines: color roles）。
const tone = cssMap({
	blue: { width: "100%", height: "100%", backgroundColor: token("color.background.accent.blue.subtler"), color: token("color.text.accent.blue.bolder") },
	green: { width: "100%", height: "100%", backgroundColor: token("color.background.accent.green.subtler"), color: token("color.text.accent.green.bolder") },
	purple: { width: "100%", height: "100%", backgroundColor: token("color.background.accent.purple.subtler"), color: token("color.text.accent.purple.bolder") },
	orange: { width: "100%", height: "100%", backgroundColor: token("color.background.accent.orange.subtler"), color: token("color.text.accent.orange.bolder") },
	gray: { width: "100%", height: "100%", backgroundColor: token("color.background.accent.gray.subtler"), color: token("color.text.accent.gray.bolder") },
});

type Size = "small" | "medium" | "large" | "xlarge";

export function PersonAvatar({ member, size = "medium", decorative = false }: { member: Member; size?: Size; decorative?: boolean }) {
	const key = (member.color in tone ? member.color : "gray") as keyof typeof tone;
	const initial = Array.from(member.name)[0] ?? "?";
	return (
		<Avatar size={size} name={decorative ? undefined : member.name} src={member.image}>
			{member.image ? undefined : (
				<AvatarContent>
					<Flex xcss={tone[key]} alignItems="center" justifyContent="center" aria-hidden>
						<Text as="span" weight="bold" size={size === "xlarge" ? "large" : size === "small" ? "small" : "medium"} color="inherit">
							{initial}
						</Text>
					</Flex>
				</AvatarContent>
			)}
		</Avatar>
	);
}
