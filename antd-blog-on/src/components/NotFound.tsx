import { Button, Result } from "antd";
import { linkProps } from "../lib/router";

export function NotFound({ title = "ページが見つかりません", subTitle = "URL が間違っているか、ページが移動した可能性があります。" }: { title?: string; subTitle?: string }) {
	return (
		<Result
			status="404"
			title={title}
			subTitle={subTitle}
			extra={
				<Button type="primary" {...linkProps("/")}>
					計画に戻る
				</Button>
			}
		/>
	);
}

