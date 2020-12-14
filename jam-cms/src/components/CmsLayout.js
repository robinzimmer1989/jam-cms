import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { PageHeader, Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  BlockOutlined,
  SettingOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

// import app components
import Edges from './Edges';
import CmsHeader from './CmsHeader';
import EditorHeader from './EditorHeader';
import JamCmsLogo from '../icons/jamCMS.svg';

import { colors } from '../theme';
import { useStore } from '../store';
import getRoute from '../routes';

const CmsLayout = (props) => {
  const { pageTitle, mode, rightSidebar, onBack, children } = props;

  const [
    {
      authState: { authUser },
      cmsState: { siteID, sites },
      editorState: { sidebar },
    },
  ] = useStore();

  const site = sites[siteID] || null;

  return (
    <Layout>
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
        <Layout.Header>
          {mode === 'editor' ? (
            <EditorHeader title={pageTitle} onBack={onBack} />
          ) : (
            <CmsHeader title={pageTitle} actionBar={mode} onBack={onBack} />
          )}
        </Layout.Header>

        <Layout.Content>
          {mode === 'editor' ? (
            children
          ) : (
            <Content>
              <Edges size="md">{children}</Edges>
            </Content>
          )}
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
    </Layout>
  );
};

const StyledPageHeader = styled(PageHeader)`
  .jam-cms-logo {
    margin: 0 auto;

    path {
      fill: ${colors.background.light};
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

const Content = styled.div`
  width: 100%;
  padding: 40px 0;
`;

export default CmsLayout;
