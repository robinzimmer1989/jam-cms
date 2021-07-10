import React, { useEffect, useState } from 'react';
import { Empty, Space, List, Skeleton, Card, Typography, Button } from 'antd';
import Parser from 'html-react-parser';
// import app components
import CmsLayout from '../components/CmsLayout';
import { siteActions } from '../actions';
import { useStore } from '../store';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../../package.json'. Consider ... Remove this comment to see the full error message
import { version } from '../../package.json';
const Dashboard = () => {
    // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
    const [{ config, cmsState: { sites, siteID }, }, dispatch,] = useStore();
    const [changes, setChanges] = useState(null);
    const lastBuild = sites?.[siteID]?.deployment?.lastBuild;
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
        await siteActions.deploySite({ id: siteID }, dispatch, config);
        if (sites?.[siteID]?.deployment?.badgeImage) {
            dispatch({
                type: 'SET_DEPLOYMENT_IMAGE',
                payload: `${sites[siteID].deployment.badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`,
            });
        }
    };
    const deploymentButton = sites?.[siteID]?.deployment?.buildHook
        ?          [<Button key="deploy" type="primary" onClick={handleDeploy} children="Deploy Website"/>]
        : null;
    return (<CmsLayout pageTitle={`Dashboard`}>
      <Space direction="vertical" size={40}>
        <Card title="Unpublished changes" extra={deploymentButton}>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'unknown[] |... Remove this comment to see the full error message */}
          {changes === null ? (<Skeleton paragraph={{ rows: 4 }} active/>) : (changes as any)?.length ? (<List dataSource={changes} renderItem={(o) => (<List.Item actions={[<span key="type">{(o as any).actionType}</span>]}>
                  <List.Item.Meta title={Parser((o as any).title || '')} description={Parser((o as any).description || '')}/>
                </List.Item>)}/>) : (<Empty description={'No changes'}/>)}
        </Card>
        <Typography.Text type="secondary">Version: {version}</Typography.Text>
      </Space>
    </CmsLayout>);
};
export default Dashboard;
