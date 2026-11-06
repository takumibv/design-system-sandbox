import Button from '@atlaskit/button/default/button';
import EmptyState from '@atlaskit/empty-state';
import { useApp } from '../app-context';

export function NotFoundPage() {
	const { navigate, path } = useApp();
	return (
		<EmptyState
			header="ページが見つかりません"
			headingLevel={1}
			description={`「${path}」というページはありません。URL が間違っているか、ページが移動した可能性があります。`}
			primaryAction={
				<Button appearance="primary" onClick={() => navigate('/')}>
					組み合わせに戻る
				</Button>
			}
		/>
	);
}
