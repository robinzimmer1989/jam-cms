import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { PageHeader, Layout, Menu, Divider } from 'antd'
import { PieChartOutlined, BlockOutlined, SettingOutlined, FormOutlined, FolderOpenOutlined } from '@ant-design/icons'

// import app components
import Edges from 'components/Edges'
import CmsHeader from 'components/CmsHeader'

import { useStore } from 'store'
import getRoute from 'routes'

const CmsLayout = props => {
  const { pageTitle, actionBar, rightSidebar, children } = props

  const [
    {
      globalState: { leftSidebar },
      cmsState: { siteID, sites },
      editorState: { hasChanged },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  return (
    <Container>
      <Layout.Sider
        className="sider"
        collapsible
        collapsed={!leftSidebar}
        onCollapse={() => dispatch({ type: `SET_LEFT_SIDEBAR`, payload: !leftSidebar })}
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
          <StyledPageHeader title={leftSidebar ? 'Gatsby CMS' : 'G'} />

          <Menu theme="dark" mode="vertical" defaultSelectedKeys={[pageTitle]}>
            <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
              <Link to={getRoute(`dashboard`, { siteID })}>Dashboard</Link>
            </Menu.Item>

            <Menu.Item key="Media" icon={<FolderOpenOutlined />}>
              <Link to={getRoute(`media`, { siteID })}>Media</Link>
            </Menu.Item>

            <Menu.SubMenu key={'collections-sub'} icon={<BlockOutlined />} title="Collections">
              {site?.postTypes &&
                Object.values(site.postTypes).map(o => {
                  return (
                    <Menu.Item key={o.title}>
                      <Link to={getRoute(`collection`, { siteID, postTypeID: o.id })}> {o.title}</Link>
                    </Menu.Item>
                  )
                })}
            </Menu.SubMenu>

            <Menu.Item key="Forms" icon={<FormOutlined />}>
              <Link to={getRoute(`forms`, { siteID })}>Forms</Link>
            </Menu.Item>

            <Menu.SubMenu key={'settings-sub'} icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="General">
                <Link to={getRoute(`settings-general`, { siteID })}>General</Link>
              </Menu.Item>
              <Menu.Item key="Collections">
                <Link to={getRoute(`settings-collections`, { siteID })}>Collections</Link>
              </Menu.Item>
              <Menu.Item key="Theme">
                <Link to={getRoute(`settings-theme`, { siteID })}>Theme</Link>
              </Menu.Item>
              <Menu.Item key="SEO">
                <Link to={getRoute(`settings-seo`, { siteID })}>SEO</Link>
              </Menu.Item>
              <Menu.Item key="Editors">
                <Link to={getRoute(`admin`, { siteID })}>Editors</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Layout.Sider>

      <Layout style={{ marginLeft: leftSidebar ? 250 : 80, marginRight: rightSidebar ? 250 : 0 }}>
        <Layout.Header style={{ padding: 0 }}>
          <Edges size="md">
            <CmsHeader title={pageTitle} actionBar={actionBar} />
          </Edges>
        </Layout.Header>

        <Layout.Content style={{ paddingBottom: 100 }}>
          <StyledDivider />
          <Edges size="md">{children}</Edges>
        </Layout.Content>
      </Layout>

      {rightSidebar && (
        <Layout.Sider
          className="sider"
          theme="light"
          width={250}
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
  )
}

const Container = styled(Layout)`
  .sider,
  .sider * {
    transition: none !important;
  }
`

const StyledPageHeader = styled(PageHeader)`
  .ant-page-header-heading-left {
    width: 100%;
  }

  .ant-page-header-heading-title {
    width: 100%;
    text-align: center;
    color: #fff;
  }
`

const StyledDivider = styled(Divider)`
  margin: 8px 0 32px;
`

export default CmsLayout
