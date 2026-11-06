import { Avatar, Flex, Typography, theme } from "antd";
import type { Member } from "./data";

/**
 * fixtures の color（blue/green/purple/orange）を antd のプリセット色の濃い段に対応させる。
 * 白い頭文字とのコントラスト比 4.5:1 以上になる段を選んだ（green と orange は 7 だと足りないため 8）。
 */
const shade: Record<string, "blue7" | "green8" | "purple7" | "orange8"> = {
  blue: "blue7",
  green: "green8",
  purple: "purple7",
  orange: "orange8",
};

export function PersonAvatar({ member, size }: { member: Member; size?: number | "small" | "large" }) {
  const { token } = theme.useToken();
  const bg = token[shade[member.color] ?? "blue7"];
  return (
    <Avatar
      size={size}
      src={member.image}
      // 名前は隣に文字で出すので、アバターは読み上げない
      aria-hidden
      // 人ごとの固定色はブリーフの要件。Avatar に色指定の props が無いため style で渡す
      style={member.image ? undefined : { backgroundColor: bg, flexShrink: 0 }}
    >
      {member.name.slice(0, 1)}
    </Avatar>
  );
}

export function Person({
  member,
  size,
  strong,
  suffix,
}: {
  member: Member;
  size?: number | "small" | "large";
  strong?: boolean;
  suffix?: React.ReactNode;
}) {
  return (
    <Flex align="center" gap="small" wrap>
      <PersonAvatar member={member} size={size} />
      <Typography.Text strong={strong}>{member.name}</Typography.Text>
      {suffix}
    </Flex>
  );
}
