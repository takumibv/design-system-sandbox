import { Button, Card, Result, Typography } from 'antd';
import { navigate, routes } from '../router';

export const NotFoundPage = () => (
  <Card>
    <Result
      status="404"
      title={
        <Typography.Title level={1} style={{ margin: 0 }}>
          ページが見つかりません
        </Typography.Title>
      }
      subTitle="URL が間違っているか、ページが移動した可能性があります。組み合わせの画面から探してください。"
      extra={
        <Button type="primary" onClick={() => navigate(routes.home)}>
          組み合わせに戻る
        </Button>
      }
    />
  </Card>
);
