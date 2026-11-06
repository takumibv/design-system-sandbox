import { FlagsProvider } from '@atlaskit/flag';
import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';
import { Box, Text, xcss } from '@atlaskit/primitives';
import { AppProvider, useApp } from './app-context';
import { Shell } from './components/Shell';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';

const setupNotice = xcss({ marginBlockEnd: 'space.300' });

function Routes() {
	const { path, me, navigate } = useApp();
	const page =
		path === '/' ? (
			<HomePage />
		) : path === '/members' ? (
			<MembersPage />
		) : path === '/settings' || path === '/setup' ? (
			<SettingsPage key={path} setup={path === '/setup'} />
		) : (
			<NotFoundPage />
		);
	const onSettings = path === '/settings' || path === '/setup';
	return (
		<Shell>
			{me?.incomplete && !onSettings && (
				<Box xcss={setupNotice}>
					<SectionMessage
						appearance="warning"
						title="はじめての設定が終わっていません"
						actions={<SectionMessageAction onClick={() => navigate('/setup')}>設定を始める</SectionMessageAction>}
					>
						<Text as="p">社員番号と uチャンネルを設定すると、CT の組み合わせに入れます。</Text>
					</SectionMessage>
				</Box>
			)}
			{page}
		</Shell>
	);
}

export default function App() {
	return (
		<FlagsProvider>
			<AppProvider>
				<Routes />
			</AppProvider>
		</FlagsProvider>
	);
}
