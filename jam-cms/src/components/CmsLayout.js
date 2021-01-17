import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { PageHeader, Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  BlockOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  ControlOutlined,
} from '@ant-design/icons';

// import app components
import CmsHeader from './CmsHeader';
import JamCmsLogo from '../icons/jamCMS.svg';

import { colors } from '../theme';
import { useStore } from '../store';
import getRoute from '../routes';

const CmsLayout = (props) => {
  const { pageTitle, children } = props;

  const [
    {
      globalOptions,
      authState: { authUser },
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const site = sites[siteID];

  return (
    <Layout className="jam-cms">
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
          <SidebarHeader
            title={
              <Link to="/">
                <JamCmsLogo className={`jam-cms-logo`} />
              </Link>
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

            {globalOptions && globalOptions.filter((o) => !o.hide).length > 0 && (
              <Menu.Item key="Options" icon={<ControlOutlined />}>
                <Link to={getRoute(`options`, { siteID })}>Theme Options</Link>
              </Menu.Item>
            )}

            {(authUser?.capabilities?.manage_options || authUser?.capabilities?.list_users) && (
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

                {authUser?.capabilities?.manage_options && (
                  <Menu.Item key="Taxonomies">
                    <Link to={getRoute(`settings-taxonomies`, { siteID })}>Taxonomies</Link>
                  </Menu.Item>
                )}

                {authUser?.capabilities?.list_users && (
                  <Menu.Item key="Editors">
                    <Link to={getRoute(`editors`, { siteID })}>Editors</Link>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
          </Menu>
        </div>
      </Layout.Sider>

      <Layout
        style={{
          marginLeft: 250,
        }}
      >
        <CmsHeader title={pageTitle} />

        <Layout.Content>
          <Content>{children}</Content>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const SidebarHeader = styled(PageHeader)`
  .jam-cms-logo {
    width: 100px;
    margin: 0 auto;

    path {
      fill: ${colors.background.light};
    }
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
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  padding: 70px 40px 60px;
`;

export default CmsLayout;
