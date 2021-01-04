import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space, Button, notification } from 'antd';
import axios from 'axios';

// import app components
import { useStore } from '../store';

const DeploymentBadge = (props) => {
  const { deploymentBadgeImage, deploymentBuildHook } = props;

  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const site = sites[siteID];

  const [src, setSrc] = useState(deploymentBadgeImage);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSrc(`${deploymentBadgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async () => {
    if (!site?.frontPage) {
      return notification.error({
        message: 'Error',
        description: 'Please add a front page',
        placement: 'bottomRight',
      });
    }

    await axios.post(site.deploymentBuildHook);

    setSrc(`${deploymentBadgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`);
  };

  return (
    <Space>
      {deploymentBadgeImage && <DeploymentStatus src={src} />}
      {deploymentBuildHook && <Button size="small" children={`Deploy`} onClick={handleDeploy} />}
    </Space>
  );
};

const DeploymentStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`;

export default DeploymentBadge;
