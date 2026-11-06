import { Blankslate } from "@primer/react/experimental";
import { Heading } from "@primer/react";
import { QuestionIcon } from "@primer/octicons-react";
import { useApp } from "../App";
import { Layout } from "../components/Layout";

export function NotFoundPage() {
	const { navigate, path } = useApp();
	return (
		<Layout title="ページが見つかりません">
			<Heading as="h1">ページが見つかりません</Heading>
			<Blankslate border>
				<Blankslate.Visual>
					<QuestionIcon size={24} />
				</Blankslate.Visual>
				<Blankslate.Heading as="h2">「{path}」というページはありません</Blankslate.Heading>
				<Blankslate.Description>
					URL がまちがっているか、ページが移動した可能性があります。組み合わせの画面から目的の画面を開いてください。
				</Blankslate.Description>
				<Blankslate.PrimaryAction onClick={() => navigate("/")}>組み合わせに戻る</Blankslate.PrimaryAction>
			</Blankslate>
		</Layout>
	);
}
