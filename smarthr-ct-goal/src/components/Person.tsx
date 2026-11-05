import { Cluster, Text } from 'smarthr-ui'

import type { Member } from '../data/model'

import './person.css'

type Props = {
  member: Member
  size?: 'M' | 'L'
  /** 名前の後ろに添える補足（「あなた」など） */
  note?: string
}

/** 頭文字。姓の 1 文字目を使う。 */
const initial = (name: string) => name.trim().charAt(0)

/** アイコン（無い人は頭文字と固定色）＋名前。アイコンは名前と重複するので読み上げない。 */
export const Avatar = ({ member, size = 'M' }: Pick<Props, 'member' | 'size'>) => (
  <span className="ct-avatar" data-size={size} data-color={member.color} aria-hidden="true">
    {member.image ? <img src={member.image} alt={member.name} /> : initial(member.name)}
  </span>
)

export const Person = ({ member, size = 'M', note }: Props) => (
  <Cluster align="center" inline>
    <Avatar member={member} size={size} />
    <Text size={size === 'L' ? 'XL' : 'M'} weight={size === 'L' ? 'bold' : undefined}>
      {member.name}
      {note && (
        <Text size="S" color="TEXT_GREY">
          （{note}）
        </Text>
      )}
    </Text>
  </Cluster>
)
