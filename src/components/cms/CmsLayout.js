import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, Menu, Divider } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'

// import app components
import Edges from 'components/Edges'
import CmsHeader from './CmsHeader'

import { useStore } from 'store'
import getRoute from 'routes'

const CmsLayout = props => {
  const { pageTitle, children } = props

  const [
    {
      postState: { siteID, sites },
    },
  ] = useStore()

  const site = sites[siteID] || null

  return (
    <Layout>
      <Layout.Sider
        theme="light"
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

          <Menu theme="light" mode="inline" defaultSelectedKeys={[pageTitle]}>
            <Menu.Item key="Dashboard" icon={<LaptopOutlined />}>
              <Link to={getRoute(`dashboard`, { siteID })}>Dashboard</Link>
            </Menu.Item>

            <Menu.Item key="Media" icon={<LaptopOutlined />}>
              <Link to={getRoute(`media`, { siteID })}>Media</Link>
            </Menu.Item>

            <Menu.SubMenu key="Collections" icon={<UserOutlined />} title="Collections">
              {site?.postTypes?.items &&
                site.postTypes.items.map(o => {
                  return (
                    <Menu.Item key={o.id}>
                      <Link to={getRoute(`collection`, { siteID, postTypeID: o.id })}> {o.title}</Link>
                    </Menu.Item>
                  )
                })}
            </Menu.SubMenu>

            <Menu.Item key="Settings" icon={<LaptopOutlined />}>
              <Link to={getRoute(`settings`, { siteID })}>Settings</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Sider>

      <Layout style={{ marginLeft: 250 }}>
        <Layout.Header style={{ padding: 0 }}>
          <Edges size="md">
            <CmsHeader title={pageTitle} />
          </Edges>
        </Layout.Header>

        <Layout.Content>
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
`

const StyledDivider = styled(Divider)`
  margin: 8px 0 32px;
`

export default CmsLayout
