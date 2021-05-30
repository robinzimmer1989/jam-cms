import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PageHeader, Button, Badge, Popover, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link } from '@reach/router';
import { navigate } from '@reach/router';

// import app components
import DeploymentBadge from './DeploymentBadge';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';
import getRoute from '../routes';

const messages = {
  'undeployed-changes': {
    onClick: () => navigate(getRoute('dashboard')),
    title: 'Unpublished changes',
    description: 'Click the deployment button to publish the latest updates.',
  },
  'missing-front-page': {
    onClick: () => navigate(getRoute('collection', { postTypeID: 'page' })),
    title: 'Homepage missing',
    description: 'Assign the homepage attribute within the page settings to any page.',
  },
  'unpublished-front-page': {
    onClick: () => navigate(getRoute('collection', { postTypeID: 'page' })),
    title: 'Homepage unpublished',
    description:
      "The homepage status is set to draft or trash and therefore won't get included in the build.",
  },
};

const CmsHeader = (props) => {
  const { title } = props;

  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const deployment = sites?.[siteID]?.deployment;

  const notifications = [];

  // We're only pushing keys to the notifications array to improve useMemo performance
  if (deployment?.undeployedChanges) {
    notifications.push('undeployed-changes');
  }

  if (!sites?.[siteID]?.frontPage) {
    notifications.push('missing-front-page');
  }

  if (
    sites?.[siteID]?.frontPage &&
    sites?.[siteID]?.postType?.['page']?.posts.find((o) => o.id === sites[siteID].frontPage)
      ?.status !== 'publish'
  ) {
    notifications.push('unpublished-front-page');
  }

  // Add CMS errors
  if (sites?.[siteID]?.errors?.length) {
    sites[siteID].errors.map((o) => notifications.push(o.id));
  }

  return useMemo(() => {
    const buttons = [];

    buttons.push(<DeploymentBadge key="deployment-badge" deployment={deployment} />);

    const notificationsContent = (
      <Notifications>
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(key) => {
            const item = messages[key] || sites?.[siteID]?.errors.find((o) => o.id === key);

            return (
              <List.Item key={key} onClick={item.onClick}>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            );
          }}
        />
      </Notifications>
    );

    buttons.push(
      <Popover
        key={'notifications'}
        title="Notifications"
        content={notificationsContent}
        arrow
        trigger={['click']}
        placement="bottomRight"
      >
        <Badge size="small" count={notifications.length}>
          <Button icon={<BellOutlined />} type="default" />
        </Badge>
      </Popover>
    );

    buttons.push(<AvatarMenu key="avatar-menu" />);

    buttons.push(
      <Link key="view-website" to="/">
        <Button children="View Website" />
      </Link>
    );

    return (
      <Container>
        <Content>
          <PageHeader title={title} extra={buttons} />
        </Content>
      </Container>
    );
  }, [deployment, notifications]);
};

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  width: calc(100% - 250px);
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #d9e1ef;
`;

const Content = styled.div`
  max-width: 1024px;
  padding: 0 40px;
  margin: 0 auto;
`;

const Notifications = styled.div`
  width: 320px;
`;

export default CmsHeader;
