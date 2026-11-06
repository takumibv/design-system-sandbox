import { CHART_COLORS, Cluster, StatusLabel, Text } from 'smarthr-ui'
import type { Member } from './fixtures'

// smarthr-ui にはアバター部品が無いため、ここだけ自前のスタイルを書く（docs/design-decisions.md「自前のスタイル」）。
// 色はテーマに紫・緑・橙の汎用色が無いので、smarthr-ui の CHART_COLORS のうち
// 白文字とのコントラスト比 4.5:1 以上を満たす濃い色を fixtures の color に対応させる。
const AVATAR_COLORS: Record<string, string> = {
  blue: CHART_COLORS[25], // #1b4b90
  green: CHART_COLORS[27], // #2d6c4b
  purple: CHART_COLORS[24], // #1b2d5d（紫が無いので最も離れた濃紺を当てる）
  orange: CHART_COLORS[22], // #995700
}

export const empNo = (m: Member) => String(1000 + m.id)

type AvatarProps = { member: Member; size?: 'S' | 'M' | 'L' }
const PX = { S: 24, M: 32, L: 56 } as const

export const Avatar = ({ member, size = 'M' }: AvatarProps) => {
  const px = PX[size]
  if (member.image) {
    return <img src={member.image} alt="" width={px} height={px} style={{ borderRadius: '50%', flexShrink: 0 }} />
  }
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: px,
        height: px,
        borderRadius: '50%',
        backgroundColor: AVATAR_COLORS[member.color] ?? CHART_COLORS[25],
        color: '#fff',
        fontWeight: 'bold',
        fontSize: Math.round(px * 0.45),
        lineHeight: 1,
      }}
    >
      {member.name.slice(0, 1)}
    </span>
  )
}

type PersonProps = {
  member: Member
  size?: 'S' | 'M' | 'L'
  isMe?: boolean
}

export const Person = ({ member, size = 'M', isMe }: PersonProps) => (
  <Cluster gap={0.5} align="center" inline>
    <Avatar member={member} size={size} />
    <Text size={size === 'L' ? 'XXL' : size === 'S' ? 'S' : 'M'} weight={size === 'L' ? 'bold' : undefined}>
      {member.name}
      {size === 'L' ? <Text size="L"> さん</Text> : null}
    </Text>
    {isMe && <StatusLabel type="blue">あなた</StatusLabel>}
  </Cluster>
)
