import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { PageHeader, Layout, Menu, Divider } from 'antd';
import {
  PieChartOutlined,
  BlockOutlined,
  SettingOutlined,
  FormOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

// import app components
import Edges from './Edges';
import CmsHeader from './CmsHeader';
import JamCmsLogo from '../icons/jamCMS.svg';

import { useStore } from '../store';
import getRoute from '../routes';

const CmsLayout = (props) => {
  const { pageTitle, mode, rightSidebar, onBack, children } = props;

  const [
    {
      authState: { authUser },
      globalState: { leftSidebar },
      cmsState: { siteID, sites },
      editorState: { sidebar },
    },
    dispatch,
  ] = useStore();

  const site = sites[siteID] || null;

  return (
    <Container>
      {mode !== 'editor' && (
        <Layout.Sider
          className="sider"
          theme="dark"
          width={250}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div>
            <StyledPageHeader
              title={
                <>
                  <JamCmsLogo className={`jam-cms-logo`} />
                </>
              }
            />

            <Menu theme="dark" mode="vertical" defaultSelectedKeys={[pageTitle]}>
              <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
                <Link to={getRoute(`dashboard`, { siteID })}>Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="Media" icon={<FolderOpenOutlined />}>
                <Link to={getRoute(`media`, { siteID })}>Media</Link>
              </Menu.Item>

              <Menu.SubMenu key={'collections-sub'} icon={<BlockOutlined />} title="Collections">
                {site?.postTypes &&
                  Object.values(site.postTypes).map((o) => {
                    return (
                      <Menu.Item key={o.title}>
                        <Link to={getRoute(`collection`, { siteID, postTypeID: o.id })}>
                          {o.title}
                        </Link>
                      </Menu.Item>
                    );
                  })}
              </Menu.SubMenu>

              {/* <Menu.Item key="Forms" icon={<FormOutlined />}>
              <Link to={getRoute(`forms`, { siteID })}>Forms</Link>
            </Menu.Item> */}

              {(authUser?.capabilities?.manage_options ||
                authUser?.capabilities?.list_users ||
                authUser?.capabilities?.wpseo_manage_options) && (
                <Menu.SubMenu key={'settings-sub'} icon={<SettingOutlined />} title="Settings">
                  {authUser?.capabilities?.manage_options && (
                    <Menu.Item key="General">
                      <Link to={getRoute(`settings-general`, { siteID })}>General</Link>
                    </Menu.Item>
                  )}

                  {authUser?.capabilities?.manage_options && (
                    <Menu.Item key="Collections">
                      <Link to={getRoute(`settings-collections`, { siteID })}>Collections</Link>
                    </Menu.Item>
                  )}

                  {authUser?.capabilities?.list_users && (
                    <Menu.Item key="Editors">
                      <Link to={getRoute(`editors`, { siteID })}>Editors</Link>
                    </Menu.Item>
                  )}

                  {/* {authUser?.capabilities?.wpseo_manage_options &&
                <Menu.Item key="SEO">
                <Link to={getRoute(`settings-seo`, { siteID })}>SEO</Link>
              </Menu.Item>
              } */}
                </Menu.SubMenu>
              )}
            </Menu>
          </div>
        </Layout.Sider>
      )}

      <Layout
        style={{
          marginLeft: mode === 'editor' ? 0 : 250,
          marginRight: rightSidebar && sidebar ? 300 : 0,
        }}
      >
        <Layout.Header style={{ padding: 0 }}>
          <Edges size={mode !== 'editor' && 'md'}>
            <CmsHeader title={pageTitle} actionBar={mode} onBack={onBack} />
          </Edges>
        </Layout.Header>

        <Layout.Content style={{ paddingBottom: 100 }}>
          <StyledDivider />
          <Edges size={mode === 'editor' ? 'full' : 'md'}>{children}</Edges>
        </Layout.Content>
      </Layout>

      {rightSidebar && sidebar && (
        <Layout.Sider
          className="sider"
          theme="light"
          width={300}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            right: 0,
          }}
        >
          {rightSidebar}
        </Layout.Sider>
      )}
    </Container>
  );
};

const Container = styled(Layout)`
  .sider,
  .sider * {
    transition: none !important;
  }
`;

const StyledPageHeader = styled(PageHeader)`
  .jam-cms-logo {
    margin: 0 auto;

    path {
      fill: #f8f9ff;
    }
  }

  .jam-cms-logo {
    width: 100px;
  }

  .jam-cms-logo-jar {
    width: 30px;
  }

  .ant-page-header-heading-left {
    width: 100%;
  }

  .ant-page-header-heading-title {
    width: 100%;
    margin: 0;
    text-align: center;
    color: #fff;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 8px 0 20px;
`;

export default CmsLayout;
