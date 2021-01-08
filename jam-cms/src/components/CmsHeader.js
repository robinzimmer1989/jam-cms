import React from 'react';
import { PageHeader, Button } from 'antd';

// import app components
import DeploymentBadge from './DeploymentBadge';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';

const CmsHeader = (props) => {
  const { title } = props;

  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const site = sites[siteID] || null;

  const buttons = [];

  buttons.push(
    <DeploymentBadge
      key="deployment-badge"
      deploymentBadgeImage={site.deploymentBadgeImage}
      deploymentBuildHook={site.deploymentBuildHook}
    />
  );

  buttons.push(<AvatarMenu key="avatar-menu" />);

  return (
    <PageHeader
      title={title}
      extra={buttons}
      style={{ paddingLeft: 40, paddingRight: 40, borderBottom: '1px solid #d9e1ef' }}
    />
  );
};

export default CmsHeader;
