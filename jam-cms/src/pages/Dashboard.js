import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Alert, Space, List, Skeleton, Card, Typography } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import { siteActions } from '../actions';
import { useStore } from '../store';

const Dashboard = () => {
  const [
    {
      config,
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [changes, setChanges] = useState(null);

  const lastBuild = sites?.[siteID]?.deployment?.lastBuild;

  const errors = sites?.[siteID]?.errors;

  useEffect(() => {
    const getUnpublishedChanges = async () => {
      const result = await siteActions.getUnpublishedChanges({ siteID }, dispatch, config);

      if (result) {
        setChanges(result);
      }
    };

    getUnpublishedChanges();
  }, [lastBuild]);

  return (
    <CmsLayout pageTitle={`Dashboard`}>
      <Space direction="vertical" size={40}>
        {errors && (
          <Space direction="vertical">
            {errors.map((o, i) => {
              return (
                <Alert
                  key={i}
                  message={o.title}
                  description={o.description}
                  type="error"
                  showIcon
                />
              );
            })}
          </Space>
        )}

        <Card title="Unpublished changes">
          {changes === null ? (
            <Skeleton paragraph={{ rows: 4 }} active />
          ) : changes?.length ? (
            <List
              dataSource={changes}
              renderItem={(o) => (
                <List.Item actions={[<span key="type">{o.actionType}</span>]}>
                  <List.Item.Meta title={o.title} description={o.description} />
                </List.Item>
              )}
            />
          ) : (
            <Typography children={`No Changes`} />
          )}
        </Card>
      </Space>
    </CmsLayout>
  );
};

export default Dashboard;
