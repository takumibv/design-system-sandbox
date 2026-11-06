import { Avatar, Flex, Typography, theme } from 'antd';
import type { GlobalToken } from 'antd';
import type { Member } from '../fixtures';

type PresetName = 'blue' | 'green' | 'purple' | 'orange';

/**
 * 頭文字アバター。fixtures の color をプリセット色として使う。
 * 背景は 1 段目、文字は 8 段目（白文字だと green/orange で 4.5:1 を満たさないため）。
 * 色は token から読み、16 進数を直接書かない（DESIGN.md の Do's and Don'ts）。
 */
const avatarColors = (token: GlobalToken, color: string) => {
  const name = (['blue', 'green', 'purple', 'orange'].includes(color) ? color : 'blue') as PresetName;
  return {
    backgroundColor: token[`${name}1`],
    color: token[`${name}8`],
  };
};

export const PersonAvatar = ({ member, size }: { member: Member; size?: number | 'small' | 'large' }) => {
  const { token } = theme.useToken();
  return (
    <Avatar
      size={size}
      src={member.image}
      alt={member.image ? member.name : undefined}
      // 公式デモ（antd demo Listy rich / Avatar の demo）と同じく style で背景色を渡す
      style={{ ...avatarColors(token, member.color), flex: 'none' }}
      aria-hidden
    >
      {member.name.slice(0, 1)}
    </Avatar>
  );
};

export const PersonName = ({
  member,
  strong,
  size,
}: {
  member: Member;
  strong?: boolean;
  size?: number | 'small' | 'large';
}) => (
  <Flex gap="small" align="center">
    <PersonAvatar member={member} size={size} />
    <Typography.Text strong={strong}>{member.name}</Typography.Text>
  </Flex>
);
