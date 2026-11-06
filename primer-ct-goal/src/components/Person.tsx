import { Label, Stack, Text } from '@primer/react'
import type { Member } from '../data/model'
import { PersonAvatar } from './PersonAvatar'

/** アイコン＋名前。自分なら Label「あなた」を添える（色だけに頼らず文字で示す） */
export function Person({ member, isMe, size = 20 }: { member: Member; isMe?: boolean; size?: 20 | 32 | 48 }) {
  return (
    <Stack direction="horizontal" align="center" gap="condensed" wrap="nowrap">
      <PersonAvatar member={member} size={size} />
      <Text weight={isMe ? 'semibold' : undefined}>{member.name}</Text>
      {isMe ? <Label variant="accent">あなた</Label> : null}
    </Stack>
  )
}
