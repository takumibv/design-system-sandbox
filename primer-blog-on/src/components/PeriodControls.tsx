import {ChevronLeftIcon, ChevronRightIcon} from '@primer/octicons-react'
import {Button, Heading, SegmentedControl, Stack} from '@primer/react'
import {addDays, defaultFrom, formatDate, WEEK_SPANS, type Period} from '../domain'
import {useQuery} from '../url'

/** 期間の切り替え：前後へ移動・既定に戻す・週数（4/8/12）。状態は URL の from / weeks（patterns/filter.md:72）。 */
export function PeriodControls({period, headingId}: {period: Period; headingId: string}) {
  const {update} = useQuery()
  const shift = (weeks: number) => update({from: addDays(period.from, weeks * 7)}, {push: true})
  const isDefault = period.from === defaultFrom()
  return (
    <Stack gap="condensed">
      <Heading as="h2" variant="medium" id={headingId}>
        {formatDate(period.from, true)}〜{formatDate(period.to)}（{period.weeks} 週）
      </Heading>
      <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center">
        <Button leadingVisual={ChevronLeftIcon} onClick={() => shift(-period.weeks)}>
          前の {period.weeks} 週
        </Button>
        <Button trailingVisual={ChevronRightIcon} onClick={() => shift(period.weeks)}>
          次の {period.weeks} 週
        </Button>
        {!isDefault ? (
          <Button variant="invisible" onClick={() => update({from: null}, {push: true})}>
            今週の周辺に戻る
          </Button>
        ) : null}
        <SegmentedControl aria-label="表示する週の数" onChange={i => update({weeks: String(WEEK_SPANS[i])}, {push: true})}>
          {WEEK_SPANS.map(w => (
            <SegmentedControl.Button key={w} selected={period.weeks === w}>
              {`${w} 週`}
            </SegmentedControl.Button>
          ))}
        </SegmentedControl>
      </Stack>
    </Stack>
  )
}
