import React from 'react';
import { Link } from '@reach/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Helmet from 'react-helmet';
import { PageHeader, Layout, Menu } from 'antd';
import { PieChartOutlined, BlockOutlined, SettingOutlined, FolderOpenOutlined, UsergroupAddOutlined, } from '@ant-design/icons';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './CmsHeader' was resolved to '/Users/robin... Remove this comment to see the full error message
import CmsHeader from './CmsHeader';
// @ts-expect-error ts-migrate(6142) FIXME: Module './PostForm' was resolved to '/Users/robinz... Remove this comment to see the full error message
import PostForm from './PostForm';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../icons/jamCMS.svg' or its co... Remove this comment to see the full error message
import Logo from '../icons/jamCMS.svg';
import { addPost } from '../utils';
import { colors } from '../theme';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
import getRoute from '../routes';
const CmsLayout = (props: any) => {
    const { pageTitle, children } = props;
    const [{ config, authState: { authUser }, cmsState: { siteID, sites }, }, dispatch,] = useStore();
    const handleAddPost = async ({ postTypeID, title, parentID }: any) => {
        await addPost({ site: sites[siteID], postTypeID, title, parentID }, dispatch, config);
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Helmet>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <title>{pageTitle || 'Not Found'} - jamCMS</title>
    </Helmet>

    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Layout className="jam-cms">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Layout.Sider className="sider" theme="dark" width={250} style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SidebarHeader title={<LogoContainer>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Logo />
              </LogoContainer>}/>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={[pageTitle]}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to={getRoute(`dashboard`, { siteID })}>Dashboard</Link>
            </Menu.Item>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Menu.Item key="Media" icon={<FolderOpenOutlined />}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Link to={getRoute(`media`, { siteID })}>Media</Link>
            </Menu.Item>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Menu.SubMenu key={'Collections'} icon={<BlockOutlined />} title="Collections" popupOffset={[1, -4]} subMenuOpenDelay={0} subMenuCloseDelay={0}>
              {config?.fields?.postTypes &&
            Object.values(config.fields.postTypes).map((o, i) => {
                // Render taxonomies per post type (they can be assigned to multiple post types)
                // We grab them from the fields object
                const postTypeTaxonomies: any = [];
                config?.fields?.taxonomies &&
                    Object.values(config.fields.taxonomies).map((p) => (p as any).postTypes.includes((o as any).id) && postTypeTaxonomies.push(p));
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                return (<Menu.SubMenu key={(o as any).title} title={(o as any).title} popupOffset={[1, -4]}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Menu.Item key={(o as any).title}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Link to={getRoute(`collection`, { siteID, postTypeID: (o as any).id })}>All</Link>
                      </Menu.Item>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Menu.Item key={`add-${(o as any).id}`} onClick={() => dispatch({
                        type: 'SET_DIALOG',
                        payload: {
                            open: true,
                            title: `Add ${(o as any).title}`,
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            component: <PostForm onSubmit={handleAddPost} postTypeID={(o as any).id}/>,
                        },
                    })}>
                        Add new
                      </Menu.Item>

                      {postTypeTaxonomies &&
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'p' implicitly has an 'any' type.
                        postTypeTaxonomies.map((p) => {
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            return (<Menu.Item key={p.title}>
                              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                              <Link to={getRoute(`taxonomy`, { siteID, taxonomyID: p.id })}>
                                {p.title}
                              </Link>
                            </Menu.Item>);
                        })}

                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {Object.values(sites[siteID].postTypes).length - 1 !== i && (<Menu.Divider />)}
                    </Menu.SubMenu>);
            })}
            </Menu.SubMenu>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {authUser?.capabilities?.list_users && (<Menu.Item key="Users" icon={<UsergroupAddOutlined />}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link to={getRoute(`users`, { siteID })}>Users</Link>
              </Menu.Item>)}

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {authUser?.capabilities?.manage_options && (<Menu.Item key="Settings" icon={<SettingOutlined />}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link to={getRoute(`settings-general`, { siteID })}>Settings</Link>
              </Menu.Item>)}
          </Menu>
        </div>
      </Layout.Sider>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Layout style={{
            marginLeft: 250,
        }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CmsHeader title={pageTitle}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Layout.Content>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Content>{children}</Content>
        </Layout.Content>
      </Layout>
    </Layout>
  </>;
};
const SidebarHeader = styled(PageHeader) `
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
const LogoContainer = styled.div `
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
const Content = styled.div `
  width: 100%;
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  padding: 70px 40px 60px;
`;
export default CmsLayout;
