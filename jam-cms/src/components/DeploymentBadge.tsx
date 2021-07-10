import React, { useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Space, Button, notification, Tooltip } from 'antd';
import { DeploymentUnitOutlined } from '@ant-design/icons';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
import { siteActions } from '../actions';

const DeploymentBadge = (props: any) => {
  const {
    deployment: { badgeImage, badgeLink, buildHook, lastBuild },
  } = props;

  const [
    {
      config,
      authState: { authUser },
      cmsState: { siteID, sites, deploymentImage },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    let interval: any = null;

    if (badgeImage) {
      interval = setInterval(() => {
        // We use a central deployment badge image instead of the one in the site object to avoid a flickering
        // when deploy is triggered and user navigates between pages
        dispatch({
          type: 'SET_DEPLOYMENT_IMAGE',
          payload: `${badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`,
        });
      }, 10000);
    }

    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async () => {
    await siteActions.deploySite({ id: siteID }, dispatch, config);

    if (badgeImage) {
      dispatch({
        type: 'SET_DEPLOYMENT_IMAGE',
        payload: `${badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`,
      });
    }
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space size={20}>
      {(deploymentImage || badgeImage) && lastBuild && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          {badgeLink && authUser?.capabilities?.manage_options ? (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Tooltip title="Open Deploy" placement="bottom">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DeploymentLink href={badgeLink} target="_blank" rel="noopener noreferrer">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DeploymentStatus src={deploymentImage || badgeImage} />
              </DeploymentLink>
            </Tooltip>
          ) : (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DeploymentStatus src={deploymentImage || badgeImage} />
          )}
        </>
      )}
      {buildHook && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Tooltip title="Deploy Website" placement="bottom">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button icon={<DeploymentUnitOutlined />} onClick={handleDeploy} />
        </Tooltip>
      )}
    </Space>
  );
};

const DeploymentLink = styled.a`
  height: 32px;
  display: flex;
  align-items: center;
`;

const DeploymentStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`;

export default DeploymentBadge;
