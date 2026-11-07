import {Label, type LabelProps} from '@primer/react'
import {STATUS_LABEL, type Status} from '../domain'

// StateLabel は issue / pull request 専用の意味とアイコンを持つため使わず、Label の variant で表す（docs/design-decisions.md）
const VARIANT: Record<Status, LabelProps['variant']> = {
  idea: 'secondary',
  writing: 'accent',
  review: 'attention',
  published: 'done',
  cancelled: 'default',
}

export function StatusLabel({status}: {status: Status}) {
  return <Label variant={VARIANT[status]}>{STATUS_LABEL[status]}</Label>
}
