import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Space, Button, Tooltip } from 'antd';
import { DeploymentUnitOutlined } from '@ant-design/icons';

// import app components
import { RootState, useAppSelector, useAppDispatch, cmsActions, siteActions } from '../redux';

const DeploymentBadge = (props: any) => {
  const {
    deployment: { badgeImage, badgeLink, buildHook, lastBuild },
  } = props;

  const {
    auth: { user: authUser },
    cms: { deploymentImage },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    let interval: any = null;

    if (badgeImage) {
      // We use a central deployment badge image instead of the one in the site object to avoid a flickering
      // when deploy is triggered and user navigates between pages
      interval = setInterval(
        () =>
          dispatch(
            cmsActions.setDeploymentImage(
              `${badgeImage}?v=${Math.floor(Math.random() * Math.floor(100))}`
            )
          ),
        10000
      );
    }

    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async () => {
    dispatch(siteActions.deploySite());
  };

  return (
    <Space size={20}>
      {(deploymentImage || badgeImage) && lastBuild && (
        <>
          {badgeLink && authUser?.capabilities?.manage_options ? (
            <Tooltip title="Open Deploy" placement="bottom">
              <DeploymentLink href={badgeLink} target="_blank" rel="noopener noreferrer">
                <DeploymentStatus src={deploymentImage || badgeImage} />
              </DeploymentLink>
            </Tooltip>
          ) : (
            <DeploymentStatus src={deploymentImage || badgeImage} />
          )}
        </>
      )}
      {buildHook && (
        <Tooltip title="Deploy Website" placement="bottom">
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
