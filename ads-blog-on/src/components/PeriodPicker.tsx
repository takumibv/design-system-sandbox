import { useId } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@atlaskit/datetime-picker";
import { Label } from "@atlaskit/form";
import { ErrorMessage } from "@atlaskit/form";
import Button from "@atlaskit/button/new";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import { addDays, formatRange, isValidISODate, startOfWeek } from "../lib/date";
import { useStore, useViewParams } from "../store";

/** 既定の期間：今週の 4 週前の月曜から、8 週後の日曜まで（12 週間）。自分で決めた値 */
export function defaultPeriod(today: string) {
	const monday = startOfWeek(today);
	return { from: addDays(monday, -28), to: addDays(monday, 8 * 7 - 1) };
}

export function usePeriod() {
	const { today } = useStore();
	const { from, to } = useViewParams();
	const def = defaultPeriod(today);
	const f = isValidISODate(from) ? from : def.from;
	const t = isValidISODate(to) ? to : def.to;
	return { from: f, to: t, isDefault: f === def.from && t === def.to, isValid: f <= t, def };
}

export function PeriodPicker() {
	const navigate = useNavigate();
	const location = useLocation();
	const { from, to, isDefault, isValid } = usePeriod();
	const fromId = useId();
	const toId = useId();
	const errorId = useId();

	const set = (key: "from" | "to", value: string | null) => {
		const p = new URLSearchParams(location.search);
		if (value) p.set(key, value);
		else p.delete(key);
		navigate({ pathname: location.pathname, search: p.toString() }, { replace: true });
	};
	const reset = () => {
		const p = new URLSearchParams(location.search);
		p.delete("from");
		p.delete("to");
		navigate({ pathname: location.pathname, search: p.toString() }, { replace: true });
	};

	return (
		<Stack space="space.100">
			<Inline space="space.200" shouldWrap alignBlock="end">
				<Box>
					<Label htmlFor={fromId}>期間の開始</Label>
					<DatePicker
						id={fromId}
						value={from}
						onChange={(v) => set("from", v)}
						locale="ja-JP"
						weekStartDay={1}
						dateFormat="YYYY/MM/DD"
						shouldShowCalendarButton
						openCalendarLabel="カレンダーを開く"
						isInvalid={!isValid}
						aria-describedby={!isValid ? errorId : undefined}
					/>
				</Box>
				<Box>
					<Label htmlFor={toId}>期間の終了</Label>
					<DatePicker
						id={toId}
						value={to}
						onChange={(v) => set("to", v)}
						locale="ja-JP"
						weekStartDay={1}
						dateFormat="YYYY/MM/DD"
						shouldShowCalendarButton
						openCalendarLabel="カレンダーを開く"
						isInvalid={!isValid}
					/>
				</Box>
				{!isDefault && (
					<Button appearance="subtle" onClick={reset}>
						既定の期間に戻す
					</Button>
				)}
			</Inline>
			{isValid ? (
				<Text color="color.text.subtle" size="small">
					{formatRange(from, to)}を表示しています。日付は「2026/11/09」の形で入力するか、カレンダーから選んでください。
				</Text>
			) : (
				<Box id={errorId}>
					<ErrorMessage>期間の終了は開始より後の日付にしてください。</ErrorMessage>
				</Box>
			)}
		</Stack>
	);
}
