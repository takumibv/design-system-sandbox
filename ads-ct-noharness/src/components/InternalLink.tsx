import Link from '@atlaskit/link';
import { useApp } from '../app-context';

/** 画面内の移動に使うリンク。履歴に積んで再読み込みせずに移動する */
export function InternalLink({ to, children }: { to: string; children: React.ReactNode }) {
	const { navigate } = useApp();
	return (
		<Link
			href={to}
			onClick={(e) => {
				e.preventDefault();
				navigate(to);
			}}
		>
			{children}
		</Link>
	);
}
