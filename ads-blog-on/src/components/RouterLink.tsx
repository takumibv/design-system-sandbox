import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { RouterLinkComponentProps } from "@atlaskit/app-provider";

// ADS の部品（LinkButton・Link・LinkMenuItem など）が内部のリンクを react-router で開けるようにする。
// 外部リンク（http で始まる）は通常の <a> にする。
export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkComponentProps<Record<string, unknown>>>(function RouterLink(
	{ href, children, ...rest },
	ref,
) {
	const to = typeof href === "string" ? href : String(href ?? "");
	if (/^https?:\/\//.test(to)) {
		return (
			<a ref={ref} href={to} {...rest}>
				{children}
			</a>
		);
	}
	return (
		<Link ref={ref} to={to} {...rest}>
			{children}
		</Link>
	);
});
