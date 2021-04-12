import React from 'react';
import styled from 'styled-components';
import { PageHeader, Button, Badge, Popover, Alert, Divider } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

// import app components
import DeploymentBadge from './DeploymentBadge';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';
import { version } from '../../package.json';

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

      <Divider />

      <p>Version: {version}</p>
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
    <Container>
      <PageHeader
        title={title}
        extra={buttons}
        style={{ paddingLeft: 40, paddingRight: 40, borderBottom: '1px solid #d9e1ef' }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  width: calc(100% - 250px);
  height: 50px;
  background: #fff;
`;

export default CmsHeader;
