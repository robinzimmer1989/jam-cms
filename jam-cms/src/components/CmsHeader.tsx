import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PageHeader, Button, Badge, Popover, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link, navigate } from '@reach/router';

// import app components
import DeploymentBadge from './DeploymentBadge';
import AvatarMenu from './AvatarMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { RootState, useAppSelector } from '../redux';
import getRoute from '../routes';

const messages: any = {
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
    title: 'Homepage not published',
    description:
      "The homepage status is set to draft or trash and therefore won't get included in the build.",
  },
  'untranslated-front-page': {
    onClick: () => navigate(getRoute('collection', { postTypeID: 'page' })),
    title: 'Homepage translation missing',
    description: 'Translate the homepage into all languages.',
  },
};

const CmsHeader = (props: any) => {
  const { title } = props;

  const {
    cms: { site },
  } = useAppSelector((state: RootState) => state);

  const deployment = site?.deployment;

  const notifications: any = [];

  // We're only pushing keys to the notifications array to improve useMemo performance
  if (deployment?.undeployedChanges) {
    notifications.push('undeployed-changes');
  }

  if (!site?.frontPage) {
    notifications.push('missing-front-page');
  }

  if (
    site?.frontPage &&
    site?.postTypes?.['page']?.posts?.[site?.frontPage]?.status !== 'publish'
  ) {
    notifications.push('unpublished-front-page');
  }

  // Check if all languages have a front page assigned
  if (site?.frontPage && site?.languages?.languages) {
    // Get all translations of front page
    const frontPagePost = site?.postTypes?.page?.posts?.[site?.frontPage];

    // Initialize missing translations
    const missingTranslations = [];

    // Loop through all available languages and check if a translation exist
    site?.languages?.languages.map(
      (o: any) =>
        frontPagePost?.language !== o.slug &&
        !frontPagePost?.translations[o.slug] &&
        missingTranslations.push(o.name)
    );

    if (missingTranslations.length > 0) {
      notifications.push('untranslated-front-page');
    }
  }

  if (site?.errors?.length) {
    // Add CMS errors
    site.errors.map((o: any) => notifications.push(o.id));
  }

  return useMemo(() => {
    const buttons = [];

    site && buttons.push(<DeploymentBadge key="deployment-badge" deployment={deployment} />);

    const notificationsContent = (
      <Notifications>
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(key: string) => {
            const item = messages?.[key] || site?.errors.find((o: any) => o.id === key);

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
        trigger={['click']}
        placement="bottomRight"
      >
        <Badge size="small" count={notifications.length}>
          <Button icon={<BellOutlined />} type="default" />
        </Badge>
      </Popover>
    );

    buttons.push(<AvatarMenu key="avatar-menu" />);

    if (site?.languages?.languages) {
      buttons.push(
        <div key="language-switcher">
          <LanguageSwitcher />
        </div>
      );
    }

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
