import React from 'react';
import { PageHeader, Button, Badge, Popover, Alert } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

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

  buttons.push(<DeploymentBadge key="deployment-badge" deployment={site.deployment} />);

  const helpContent = (
    <div>
      {site?.deployment?.undeployedChanges && (
        <p>
          <Alert
            message="There are unpublished changes. Click the deployment button to publish the latest updates."
            type="info"
            showIcon
          />
        </p>
      )}

      <p>Welcome to the JamCMS backend.</p>

      <p>
        If you want to learn more about the JamStack, visit:{' '}
        <a href="https://jamstack.org/what-is-jamstack/" target="_blank">
          jamstack.org/what-is-jamstack
        </a>
      </p>
    </div>
  );

  buttons.push(
    <Popover
      key={'help'}
      title="Help"
      content={helpContent}
      arrow
      trigger={['click']}
      placement="bottomRight"
    >
      <Badge dot={site?.deployment?.undeployedChanges}>
        <Button icon={<QuestionOutlined />} shape="circle" type="default" />
      </Badge>
    </Popover>
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
