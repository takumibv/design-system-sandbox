import { Avatar, Stack, Text } from "@primer/react";
import type { Member } from "../model";

/** 人のアイコン。画像があれば Primer の Avatar、なければ頭文字（人ごとの固定色） */
export function PersonAvatar({ member, size = 24 }: { member: Member; size?: number }) {
	if (member.image) return <Avatar src={member.image} size={size} alt="" />;
	// 姓の 1 文字目を頭文字にする（「佐藤 美咲」→「佐」）
	const initial = member.name.trim().charAt(0);
	return (
		<span
			className="initials"
			data-color={member.color}
			aria-hidden="true"
			style={{ width: size, height: size, fontSize: Math.round(size * 0.45) }}
		>
			{initial}
		</span>
	);
}

/** アイコン＋名前 */
export function Person({ member, size = 24, suffix }: { member: Member; size?: number; suffix?: string }) {
	return (
		<Stack direction="horizontal" gap="condensed" align="center" wrap="nowrap">
			<PersonAvatar member={member} size={size} />
			<Text>
				{member.name}
				{suffix}
			</Text>
		</Stack>
	);
}
