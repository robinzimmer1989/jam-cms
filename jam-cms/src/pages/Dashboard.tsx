import React, { useEffect, useState } from 'react';
import { Empty, Space, List, Skeleton, Card, Typography, Button } from 'antd';
import Parser from 'html-react-parser';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/CmsLayout' was resolved to '... Remove this comment to see the full error message
import CmsLayout from '../components/CmsLayout';
import { siteActions } from '../actions';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../../package.json'. Consider ... Remove this comment to see the full error message
import { version } from '../../package.json';
const Dashboard = () => {
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
        ? // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          [<Button key="deploy" type="primary" onClick={handleDeploy} children="Deploy Website"/>]
        : null;
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<CmsLayout pageTitle={`Dashboard`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical" size={40}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title="Unpublished changes" extra={deploymentButton}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {changes === null ? (<Skeleton paragraph={{ rows: 4 }} active/>) : (changes as any)?.length ? (<List dataSource={changes} renderItem={(o) => (<List.Item actions={[<span key="type">{(o as any).actionType}</span>]}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <List.Item.Meta title={Parser((o as any).title || '')} description={Parser((o as any).description || '')}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                </List.Item>)}/>) : (<Empty description={'No changes'}/>)}
        </Card>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography.Text type="secondary">Version: {version}</Typography.Text>
      </Space>
    </CmsLayout>);
};
export default Dashboard;
