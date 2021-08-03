import React, { useEffect, useState } from 'react';
import { Empty, Space, List, Skeleton, Card, Typography, Button } from 'antd';
import Parser from 'html-react-parser';
import { RouteComponentProps } from '@reach/router';

// import app components
import CmsLayout from '../components/CmsLayout';
import { siteActions } from '../actions';
import { useStore } from '../store';
import { version } from '../../package.json';

const Dashboard = (props: RouteComponentProps) => {
  const [
    {
      config,
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [changes, setChanges] = useState(null as any);
  const [loading, setLoading] = useState(false);

  const lastBuild = sites[siteID]?.deployment?.lastBuild;

  useEffect(() => {
    const getUnpublishedChanges = async () => {
      const result = await siteActions.getUnpublishedChanges({ siteID }, dispatch, config);
      if (result) {
        setChanges(result);
      }
    };
    getUnpublishedChanges();
  }, [lastBuild]);

  const handleDeploy = async () => {
    setLoading(true);

    await siteActions.deploySite({ id: siteID }, dispatch, config);

    if (sites[siteID]?.deployment?.badgeImage) {
      dispatch({
        type: 'SET_DEPLOYMENT_IMAGE',
        payload: `${sites[siteID].deployment.badgeImage}?v=${Math.floor(
          Math.random() * Math.floor(100)
        )}`,
      });
    }

    setLoading(false);
  };

  const deploymentButton = sites[siteID]?.deployment?.buildHook
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
    <CmsLayout pageTitle={`Dashboard`}>
      <Space direction="vertical" size={40}>
        <Card title="Unpublished changes" extra={deploymentButton}>
          {changes === null ? (
            <Skeleton paragraph={{ rows: 4 }} active />
          ) : (changes as any)?.length ? (
            <List
              dataSource={changes}
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
        <Typography.Text type="secondary">Version: {version}</Typography.Text>
      </Space>
    </CmsLayout>
  );
};

export default Dashboard;
