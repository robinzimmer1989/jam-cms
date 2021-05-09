import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Alert, Space, List, Skeleton, Card, Typography } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import { actionMonitorServices } from '../services';
import { useStore } from '../store';

const Dashboard = () => {
  const [
    {
      config,
      authState: { authUser },
      cmsState: { sites, siteID },
    },
  ] = useStore();

  const [changes, setChanges] = useState(null);

  const lastBuild = sites?.[siteID]?.deployment?.lastBuild;

  const errors = sites?.[siteID]?.errors;

  useEffect(() => {
    const loadChangesSinceLastBuild = async () => {
      const date = lastBuild || sites?.[siteID]?.createdAt;

      // Format date to timestamp (in miliseconds)
      const timestamp = moment.utc(date, 'YYYY/MM/DD HH:mm:ss').format('x');

      const result = await actionMonitorServices.getChangesSinceLastBuild({ timestamp }, config);

      if (result?.data?.actionMonitorActions?.nodes) {
        // Remove internal entries from list
        const fileredResults = result.data.actionMonitorActions.nodes.filter((o) =>
          authUser?.capabilities?.edit_themes ? o : o.actionType !== 'DIFF_SCHEMAS'
        );

        setChanges(fileredResults);
      }
    };

    loadChangesSinceLastBuild();
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
                  <List.Item.Meta
                    title={o.title}
                    description={
                      o.referencedNodeSingularName !== 'none'
                        ? o.referencedNodeSingularName.toUpperCase()
                        : ''
                    }
                  />
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
