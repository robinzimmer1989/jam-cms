import React, { useMemo } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { PageHeader, Button, Badge, Popover, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link, navigate } from '@reach/router';

// import app components
import DeploymentBadge from './DeploymentBadge';
import AvatarMenu from './AvatarMenu';
import { useStore } from '../store';
import getRoute from '../routes';

const messages = {
  'undeployed-changes': {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
    title: 'Homepage not published',
    description:
      "The homepage status is set to draft or trash and therefore won't get included in the build.",
  },
};

const CmsHeader = (props: any) => {
  const { title } = props;

  // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const deployment = sites?.[siteID]?.deployment;

  const notifications: any = [];

  // We're only pushing keys to the notifications array to improve useMemo performance
  if (deployment?.undeployedChanges) {
    notifications.push('undeployed-changes');
  }

  if (!sites?.[siteID]?.frontPage) {
    notifications.push('missing-front-page');
  }

  if (
    sites?.[siteID]?.frontPage &&
    sites?.[siteID]?.postTypes?.['page']?.posts?.[sites?.[siteID]?.frontPage]?.status !== 'publish'
  ) {
    notifications.push('unpublished-front-page');
  }

  // Add CMS errors
  if (sites?.[siteID]?.errors?.length) {
    sites[siteID].errors.map((o: any) => notifications.push(o.id));
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
            // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
            const item = messages[key] || sites?.[siteID]?.errors.find((o: any) => o.id === key);

            return (
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'Key | nu... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; key: string; title: str... Remove this comment to see the full error message
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
