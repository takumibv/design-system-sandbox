import { useRef, useState } from 'react';
import Button from '@atlaskit/button/default/button';
import EmptyState from '@atlaskit/empty-state';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import ModalDialog, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';
import { Box, Inline, Stack, Text, xcss } from '@atlaskit/primitives';
import { useApp } from '../app-context';
import { type AppMember, sortByEmployeeNo } from '../model';
import { PersonAvatar } from '../components/PersonAvatar';

const list = xcss({ listStyle: 'none', margin: 'space.0', padding: 'space.0' });

const row = xcss({
	paddingBlock: 'space.150',
	paddingInline: 'space.200',
	borderBlockEndWidth: 'border.width',
	borderBlockEndStyle: 'solid',
	borderBlockEndColor: 'color.border',
});

const meRow = xcss({ backgroundColor: 'color.background.selected' });

const panel = xcss({
	backgroundColor: 'elevation.surface.raised',
	boxShadow: 'elevation.shadow.raised',
	borderRadius: 'radius.large',
	overflow: 'hidden',
});

export function MembersPage() {
	const { members, setMembers, me, scenario, notify, navigate, logIn } = useApp();
	const [target, setTarget] = useState<AppMember | null>(() =>
		['confirm-delete', 'delete-error'].includes(scenario.state ?? '')
			? (members.find((m) => m.id === 10) ?? null)
			: null,
	);
	const [failed, setFailed] = useState(scenario.state === 'delete-error');
	const [deleting, setDeleting] = useState(false);
	const cancelRef = useRef<HTMLButtonElement>(null);

	const sorted = sortByEmployeeNo(members);
	const active = members.filter((m) => m.active).length;
	const inactive = members.length - active;

	const close = () => {
		setTarget(null);
		setFailed(false);
	};

	const confirmDelete = () => {
		if (!target) return;
		setDeleting(true);
		window.setTimeout(() => {
			setDeleting(false);
			// デモ：?state=delete-error のときは必ず失敗させる
			if (scenario.state === 'delete-error') {
				setFailed(true);
				return;
			}
			setMembers((list) => list.filter((m) => m.id !== target.id));
			notify('success', `${target.name} さんを削除しました`, '来週以降の組み合わせは組み直されます。');
			close();
		}, 600);
	};

	return (
		<Stack space="space.400">
			<Stack space="space.100">
				<Heading size="xlarge" as="h1">
					メンバー
				</Heading>
				<Text color="color.text.subtle">
					Slack でログインしたことのある人を、社員番号順に並べています。
				</Text>
			</Stack>

			{members.length === 0 ? (
				<EmptyState
					header="まだメンバーがいません"
					headingLevel={2}
					description="Slack でログインした人が、ここに表示されます。最初の 1 人になって、CT に参加しましょう。"
					primaryAction={
						me ? undefined : (
							<Button appearance="primary" onClick={logIn}>
								Slack でログイン
							</Button>
						)
					}
				/>
			) : (
				<Stack space="space.200">
					<Inline space="space.200" shouldWrap>
						<Text>
							<Text weight="bold">参加 {active} 人</Text>・不参加 {inactive} 人（全 {members.length} 人）
						</Text>
					</Inline>
					{!me && (
						<SectionMessage
							appearance="information"
							actions={<SectionMessageAction onClick={logIn}>Slack でログイン</SectionMessageAction>}
						>
							<Text as="p">ログインすると、自分の設定の変更や、退職した人の削除ができます。</Text>
						</SectionMessage>
					)}
					<Box xcss={panel}>
						<Box as="ul" xcss={list} aria-label="メンバーの一覧">
							{sorted.map((m) => {
								const isMe = me?.id === m.id;
								return (
									<Box as="li" key={m.id} xcss={[row, isMe ? meRow : undefined]}>
										<Inline space="space.200" alignBlock="center" spread="space-between" shouldWrap>
											<Inline space="space.150" alignBlock="center">
												<PersonAvatar member={m} size="medium" />
												<Stack space="space.050">
													<Inline space="space.100" alignBlock="center" shouldWrap>
														<Text weight="medium">{m.name}</Text>
														{isMe && (
															<Lozenge appearance="new" isBold>
																あなた
															</Lozenge>
														)}
													</Inline>
													<Text size="small" color="color.text.subtle">
														社員番号 {m.employeeNo ?? '未設定'}・uチャンネル{' '}
														{m.channel ? `#${m.channel}` : '未設定'}
													</Text>
												</Stack>
											</Inline>
											<Inline space="space.100" alignBlock="center" shouldWrap>
												{m.incomplete && <Lozenge appearance="moved">初回設定が未完了</Lozenge>}
												{m.active ? (
													<Lozenge appearance="success">参加</Lozenge>
												) : (
													<Lozenge appearance="default">不参加</Lozenge>
												)}
												{isMe ? (
													<Button spacing="compact" onClick={() => navigate('/settings')}>
														自分の設定を変える
													</Button>
												) : (
													me && (
														<Button
															spacing="compact"
															appearance="subtle"
															onClick={() => setTarget(m)}
															aria-label={`${m.name} さんを削除`}
														>
															削除
														</Button>
													)
												)}
											</Inline>
										</Inline>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Stack>
			)}

			<ModalTransition>
				{target && (
					<ModalDialog onClose={close} autoFocus={cancelRef} width="small">
						<ModalHeader hasCloseButton>
							<ModalTitle appearance="danger">{target.name} さんを削除しますか？</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<Stack space="space.150">
								{failed && (
									<SectionMessage appearance="error" title="削除できませんでした">
										<Text as="p">
											通信が途切れた可能性があります。もう一度「削除する」を押してください。
										</Text>
									</SectionMessage>
								)}
								<Inline space="space.150" alignBlock="center">
									<PersonAvatar member={target} size="medium" />
									<Stack>
										<Text weight="medium">{target.name}</Text>
										<Text size="small" color="color.text.subtle">
											社員番号 {target.employeeNo ?? '未設定'}
										</Text>
									</Stack>
								</Inline>
								<Text as="p">
									削除すると元に戻せません。{target.name} さんはメンバーの一覧と組み合わせから外れ、
									{target.active ? '来週以降の組み合わせが組み直されます。' : '組み合わせには影響しません（不参加のため）。'}
									退職などで今後使わない人だけを削除してください。
								</Text>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button appearance="subtle" onClick={close} ref={cancelRef}>
								キャンセル
							</Button>
							<Button appearance="danger" onClick={confirmDelete} isLoading={deleting}>
								{failed ? 'もう一度削除する' : '削除する'}
							</Button>
						</ModalFooter>
					</ModalDialog>
				)}
			</ModalTransition>
		</Stack>
	);
}
