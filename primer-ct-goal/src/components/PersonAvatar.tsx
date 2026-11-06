import { Avatar } from '@primer/react'
import type { Member } from '../data/model'
import styles from './PersonAvatar.module.css'

type Size = 20 | 32 | 48

const sizeClass: Record<Size, string> = { 20: styles.Size20, 32: styles.Size32, 48: styles.Size48 }
const colorClass: Record<string, string> = {
  blue: styles.Blue,
  green: styles.Green,
  purple: styles.Purple,
  orange: styles.Orange,
}

/**
 * 人のアイコン。画像があれば Primer の Avatar、無ければ名前の頭文字（姓の 1 文字目）。
 * 名前と並べて使う前提なので、読み上げでは装飾扱い（alt は空、頭文字は aria-hidden）。
 */
export function PersonAvatar({ member, size = 20 }: { member: Member; size?: Size }) {
  if (member.image) return <Avatar src={member.image} size={size} alt="" />
  return (
    <span aria-hidden="true" className={`${styles.Initial} ${sizeClass[size]} ${colorClass[member.color] ?? styles.Blue}`}>
      {member.name.slice(0, 1)}
    </span>
  )
}
