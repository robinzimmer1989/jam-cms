import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Menu, Row, Space } from 'antd'

// import app components
import AvatarMenu from 'components/AvatarMenu'
import { isLoggedIn } from 'utils/auth'
import getRoute from 'routes'

const Header = () => {
  return (
    <Row justify="space-between" align="center">
      <Logo to="/">Gatsby CMS</Logo>

      <Row align="center">
        <Space>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {isLoggedIn() ? (
              <>
                <Menu.Item key="1">
                  <Link to={getRoute(`app`)}>My Websites</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="1">
                  <Link to={getRoute(`sign-up`)}>Sign Up</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={getRoute(`sign-in`)}>Sign In</Link>
                </Menu.Item>
              </>
            )}
          </Menu>

          {isLoggedIn() && <AvatarMenu ghost={true} />}
        </Space>
      </Row>
    </Row>
  )
}

const Logo = styled(Link)`
  margin-right: 20px;
  float: left;
`

export default Header
