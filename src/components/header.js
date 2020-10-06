import React from 'react'
import { Link, navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { Menu, Row, Avatar, Dropdown, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

// import app components
import { logout, isLoggedIn } from 'utils/auth'
import getRoute from 'routes'

const Header = () => {
  const handleSignOut = async () => {
    await Auth.signOut()
    logout(() => navigate(getRoute(`/`)))
  }

  const dropDownMenu = (
    <Menu>
      <Menu.Item children={`Profile`} onClick={() => navigate(`/app/profile`)} />
      <Menu.Item children={`Sign Out`} onClick={handleSignOut} />
    </Menu>
  )

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

          <Dropdown overlay={dropDownMenu}>
            <div>
              <Avatar size={32} icon={<UserOutlined />} />
            </div>
          </Dropdown>
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
