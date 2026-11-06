import Avatar, { AvatarContent } from '@atlaskit/avatar';
import { Box, Inline, Text, xcss } from '@atlaskit/primitives';
import type { AppMember } from '../model';
import { initialOf } from '../model';

type Size = 'small' | 'medium' | 'large' | 'xlarge';

// 人ごとの固定色（fixtures.ts の color）を ADS のアクセント背景トークンに対応させる。
// 文字は color.text.inverse（白）。bolder 背景なら AA を満たす（axe で確認）。
const fills = {
	blue: xcss({ backgroundColor: 'color.background.accent.blue.bolder' }),
	green: xcss({ backgroundColor: 'color.background.accent.green.bolder' }),
	purple: xcss({ backgroundColor: 'color.background.accent.purple.bolder' }),
	orange: xcss({ backgroundColor: 'color.background.accent.orange.bolder' }),
	gray: xcss({ backgroundColor: 'color.background.accent.gray.bolder' }),
} as const;

const fillBase = xcss({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const textSize = { small: 'small', medium: 'medium', large: 'large', xlarge: 'large' } as const;

/** アイコンが無い人は名前の頭文字＋人ごとの固定色で表示する */
export function PersonAvatar({ member, size = 'medium' }: { member: AppMember; size?: Size }) {
	if (member.image) return <Avatar name={member.name} src={member.image} size={size} />;
	const fill = fills[(member.color as keyof typeof fills) ?? 'gray'] ?? fills.gray;
	return (
		<Avatar name={member.name} size={size}>
			<AvatarContent>
				<Box xcss={[fillBase, fill]}>
					<Text color="color.text.inverse" weight="bold" size={textSize[size]}>
						{initialOf(member.name)}
					</Text>
				</Box>
			</AvatarContent>
		</Avatar>
	);
}

/** アバター＋名前。名前は必ず文字でも出す（色や頭文字だけに頼らない） */
export function PersonName({
	member,
	size = 'small',
	suffix,
}: {
	member: AppMember;
	size?: Size;
	suffix?: React.ReactNode;
}) {
	return (
		<Inline space="space.100" alignBlock="center">
			<PersonAvatar member={member} size={size} />
			<Text weight="medium">{member.name}</Text>
			{suffix}
		</Inline>
	);
}
