import React from 'react';
import { PageHeader, Button, Tag, Tooltip } from 'antd';
import { MenuOutlined, CodeOutlined } from '@ant-design/icons';

// import app components
import DeploymentBadge from './DeploymentBadge';
import ViewToggle from './ViewToggle';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';

const CmsHeader = (props) => {
  const { title, actionBar, onBack } = props;

  const [
    {
      cmsState: { siteID, sites },
      editorState: { hasChanged, sidebar, editable },
    },
    dispatch,
  ] = useStore();

  const site = sites[siteID] || null;

  const tags = [];

  if (actionBar === 'editor' && hasChanged) {
    tags.push(<Tag key={'has-changed'} color="blue" children={`Unsaved Changes`} />);
  }

  const buttons = [];

  if (actionBar === 'editor') {
    buttons.push(<ViewToggle key={'view-toggle'} />);

    {
      process.env.NODE_ENV === 'development' &&
        buttons.push(
          <Tooltip key={'editable'} title={'Toggle Editing'}>
            <Button
              className={editable && 'active'}
              onClick={() => dispatch({ type: `SET_EDITOR_EDITABLE`, payload: !editable })}
              icon={<CodeOutlined />}
              shape="circle"
              type={editable ? 'primary' : 'default'}
            />
          </Tooltip>
        );
    }

    buttons.push(
      <Tooltip key={'hide-sidebar'} title={'Toggle Sidebar'}>
        <Button
          className={sidebar && 'active'}
          onClick={() => dispatch({ type: `SET_EDITOR_SIDEBAR`, payload: !sidebar })}
          icon={<MenuOutlined />}
          shape="circle"
          type={sidebar ? 'primary' : 'default'}
        />
      </Tooltip>
    );
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

  return <PageHeader title={title} extra={buttons} tags={tags} onBack={onBack} />;
};

export default CmsHeader;
