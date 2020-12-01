import React from 'react';
import { PageHeader, Button, Tag } from 'antd';

// import app components
import DeploymentBadge from './DeploymentBadge';
import ViewToggle from './ViewToggle';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';

const CmsHeader = (props) => {
  const { title, actionBar } = props;

  const [
    {
      cmsState: { siteID, sites },
      editorState: { hasChanged },
    },
  ] = useStore();

  const site = sites[siteID] || null;

  const tags = [];

  if (actionBar === 'editor' && hasChanged) {
    tags.push(<Tag key={'has-changed'} color="blue" children={`Unsaved Changes`} />);
  }

  const buttons = [];

  if (actionBar === 'editor') {
    buttons.push(<ViewToggle key={'view-toggle'} />);
  } else {
    buttons.push(
      <DeploymentBadge
        key="deployment-badge"
        deploymentBadgeImage={site.deploymentBadgeImage}
        deploymentBuildHook={site.deploymentBuildHook}
      />
    );

    if (site?.frontendUrl) {
      buttons.push(
        <Button
          key="visit-site-button"
          size="small"
          children={`Visit Site`}
          href={site?.frontendUrl}
          target="_blank"
        />
      );
    }

    buttons.push(<AvatarMenu key="avatar-menu" />);
  }

  return <PageHeader title={title} extra={buttons} tags={tags} />;
};

export default CmsHeader;
