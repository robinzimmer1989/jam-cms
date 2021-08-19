import React, { useEffect, useState } from 'react';
import { Empty, Space, List, Skeleton, Card, Typography, Button } from 'antd';
import Parser from 'html-react-parser';
import { RouteComponentProps } from '@reach/router';

// import app components
import CmsLayout from '../components/CmsLayout';
import { RootState, useAppDispatch, useAppSelector, siteActions } from '../redux';
import { version } from '../../package.json';

const Dashboard = (props: any) => {
  const { fields } = props;

  const {
    cms: { site, siteLoaded, unpublishedChanges },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const lastBuild = site?.deployment?.lastBuild;

  useEffect(() => {
    siteLoaded && dispatch(siteActions.getUnpublishedChanges());
  }, [siteLoaded, lastBuild]);

  const handleDeploy = async () => {
    setLoading(true);
    await siteActions.deploySite();
    setLoading(false);
  };

  const deploymentButton = site?.deployment?.buildHook
    ? [
        <Button
          key="deploy"
          type="primary"
          onClick={handleDeploy}
          children="Deploy Website"
          loading={loading}
        />,
      ]
    : null;

  return (
    <CmsLayout fields={fields} pageTitle={`Dashboard`}>
      <Space direction="vertical" size={40}>
        <Card title="Unpublished changes" extra={deploymentButton}>
          {unpublishedChanges === null ? (
            <Skeleton paragraph={{ rows: 4 }} active />
          ) : unpublishedChanges.length ? (
            <List
              dataSource={unpublishedChanges}
              renderItem={(o) => (
                <List.Item actions={[<span key="type">{(o as any).actionType}</span>]}>
                  <List.Item.Meta
                    title={Parser((o as any).title || '')}
                    description={Parser((o as any).description || '')}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description={'No changes'} />
          )}
        </Card>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          Version: {version}
        </Typography.Text>
      </Space>
    </CmsLayout>
  );
};

export default Dashboard;
