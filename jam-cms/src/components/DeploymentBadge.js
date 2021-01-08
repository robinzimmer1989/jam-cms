import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Space, Button, notification, Tooltip } from 'antd';
import { DeploymentUnitOutlined } from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { siteActions } from '../actions';

const DeploymentBadge = (props) => {
  const {
    deployment: { badgeImage, buildHook, lastBuild },
  } = props;

  const [
    {
      config,
      cmsState: { siteID, sites, deploymentImage },
    },
    dispatch,
  ] = useStore();

  const site = sites[siteID];

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      // We use a central deployment badge image instead of the one in the site object to avoid a flickering
      // when deploy is triggered and user navigates between pages
      dispatch({
        type: 'SET_DEPLOYMENT_IMAGE',
        payload: `${badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async () => {
    // Test site before deploying
    if (!site?.frontPage) {
      return notification.error({
        message: 'Error',
        description: 'Please add a front page',
        placement: 'bottomRight',
      });
    }

    await siteActions.deploySite({ id: siteID }, dispatch, config);

    dispatch({
      type: 'SET_DEPLOYMENT_IMAGE',
      payload: `${badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`,
    });
  };

  return (
    <Space size={20}>
      {(deploymentImage || badgeImage) && lastBuild && (
        <DeploymentStatus src={deploymentImage || badgeImage} />
      )}
      {buildHook && (
        <Tooltip title="Deploy Website" placement="bottom">
          <Button icon={<DeploymentUnitOutlined />} shape="circle" onClick={handleDeploy} />
        </Tooltip>
      )}
    </Space>
  );
};

const DeploymentStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`;

export default DeploymentBadge;
