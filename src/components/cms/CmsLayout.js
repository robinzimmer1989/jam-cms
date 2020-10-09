import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, Menu, Divider } from 'antd'
import { PieChartOutlined, BlockOutlined, SettingOutlined, FormOutlined, FolderOpenOutlined } from '@ant-design/icons'

// import app components
import Edges from 'components/Edges'
import CmsHeader from './CmsHeader'

import { useStore } from 'store'
import getRoute from 'routes'

const CmsLayout = props => {
  const { pageTitle, children } = props

  const [
    {
      sitesState: { siteID, sites },
    },
  ] = useStore()

  const site = sites[siteID] || null

  const defaultOpenKeys = ['General', 'Collections', 'Theme', 'SEO'].includes(pageTitle)
    ? 'settings-sub'
    : 'collections-sub'

  return (
    <Layout>
      <Layout.Sider
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
          <Title>{site?.title}</Title>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={[pageTitle]} defaultOpenKeys={[defaultOpenKeys]}>
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
            </Menu.SubMenu>
          </Menu>
        </div>
      </Layout.Sider>

      <Layout style={{ marginLeft: 250 }}>
        <Layout.Header style={{ padding: 0 }}>
          <Edges size="md">
            <CmsHeader title={pageTitle} />
          </Edges>
        </Layout.Header>

        <Layout.Content style={{ paddingBottom: 100 }}>
          <StyledDivider />
          <Edges size="md">{children}</Edges>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

const Title = styled.h1`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  font-size: 24px;
  color: #fff;
`

const StyledDivider = styled(Divider)`
  margin: 8px 0 32px;
`

export default CmsLayout
