// antd lint が何を検出するかを確かめるための、わざと違反を入れたファイル（アプリでは使わない）
import { Alert, Button, Card, List, Modal, Space, Tag } from "antd";

export function Bad() {
	return (
		<Space direction="vertical">
			{/* 非推奨 props */}
			<Alert message="old api" />
			<Card bordered={false} bodyStyle={{ padding: 13 }} />
			<Modal visible destroyOnClose />
			<List dataSource={[1]} renderItem={(i) => i} />
			{/* DESIGN.md の Don't：Primary を 2 つ並べる・直書きの色・マジックナンバー */}
			<Button type="primary">保存</Button>
			<Button type="primary">送信</Button>
			<div style={{ background: "#FFFFFF", padding: 11, color: "#1677ff" }}>x</div>
			{/* Tag を重大な状態に使う */}
			<Tag color="red">エラー：保存失敗</Tag>
			{/* アイコンだけのボタンにラベルなし */}
			<Button icon={<span>×</span>} />
		</Space>
	);
}
