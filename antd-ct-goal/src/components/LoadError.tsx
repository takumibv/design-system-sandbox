import { Button, Card, Result } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useActions } from '../actions';

/** 読み込み失敗。research-exception の「Load Failure：再試行と組み合わせる」に従う */
export const LoadError = ({ what }: { what: string }) => {
  const { reload } = useActions();
  return (
    <Card>
      <Result
        status="error"
        title={`${what}を読み込めませんでした`}
        subTitle="通信が途切れたか、サーバーが混み合っている可能性があります。少し待ってから、もう一度読み込んでください。"
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={reload}>
            もう一度読み込む
          </Button>
        }
      />
    </Card>
  );
};
