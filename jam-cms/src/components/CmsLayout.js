import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { PageHeader, Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  BlockOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

// import app components
import CmsHeader from './CmsHeader';
import Logo from '../icons/jamCMS.svg';

import { colors } from '../theme';
import { useStore } from '../store';
import getRoute from '../routes';

const CmsLayout = (props) => {
  const { pageTitle, children } = props;

  const [
    {
      config: { fields },
      authState: { authUser },
      cmsState: { siteID, sites },
    },
  ] = useStore();

  return (
    <>
      <Helmet>
        <title>{pageTitle || 'Not Found'} - jamCMS</title>
      </Helmet>

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
                <LogoContainer to="/" title="Visit Website">
                  <Logo />
                </LogoContainer>
              }
            />

            <Menu theme="dark" mode="vertical" defaultSelectedKeys={[pageTitle]}>
              <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
                <Link to={getRoute(`dashboard`, { siteID })}>Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="Media" icon={<FolderOpenOutlined />}>
                <Link to={getRoute(`media`, { siteID })}>Media</Link>
              </Menu.Item>

              <Menu.SubMenu
                key={'Collections'}
                icon={<BlockOutlined />}
                title="Collections"
                popupOffset={[1, 0]}
              >
                {fields?.postTypes &&
                  Object.values(fields.postTypes).map((o, i) => {
                    // Render taxonomies per post type (they can be assigned to multiple post types)
                    // We grab them from the fields object
                    const postTypeTaxonomies = [];
                    fields?.taxonomies &&
                      Object.values(fields.taxonomies).map(
                        (p) => p.postTypes.includes(o.id) && postTypeTaxonomies.push(p)
                      );

                    return (
                      <Fragment key={o.title}>
                        <Menu.Item>
                          <Link to={getRoute(`collection`, { siteID, postTypeID: o.id })}>
                            {o.title}
                          </Link>
                        </Menu.Item>

                        {postTypeTaxonomies &&
                          postTypeTaxonomies.map((p) => {
                            return (
                              <Menu.Item
                                key={p.title}
                                style={{ textTransform: 'uppercase', fontSize: 11 }}
                              >
                                <Link to={getRoute(`taxonomy`, { siteID, taxonomyID: p.id })}>
                                  {p.title}
                                </Link>
                              </Menu.Item>
                            );
                          })}

                        {Object.values(sites[siteID].postTypes).length - 1 !== i && (
                          <Menu.Divider />
                        )}
                      </Fragment>
                    );
                  })}
              </Menu.SubMenu>

              {authUser?.capabilities?.list_users && (
                <Menu.Item key="Users" icon={<UsergroupAddOutlined />}>
                  <Link to={getRoute(`users`, { siteID })}>Users</Link>
                </Menu.Item>
              )}

              {authUser?.capabilities?.manage_options && (
                <Menu.Item key="Settings" icon={<SettingOutlined />}>
                  <Link to={getRoute(`settings-general`, { siteID })}>Settings</Link>
                </Menu.Item>
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
    </>
  );
};

const SidebarHeader = styled(PageHeader)`
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

const LogoContainer = styled(Link)`
  display: block;
  padding: 20px;

  svg {
    width: 120px;
    margin: 0 auto;

    path {
      fill: ${colors.secondaryContrast};
    }
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
