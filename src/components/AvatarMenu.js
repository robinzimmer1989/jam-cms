import React from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import { Menu, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

// import app components
import { logout } from 'utils/auth'
import getRoute from 'routes'

const AvatarMenu = props => {
  const { ghost } = props

  const handleSignOut = async () => {
    await Auth.signOut()
    logout(() => navigate(getRoute(`/`)))
  }

  const dropDownMenu = (
    <Menu>
      <Menu.Item children={`My Websites`} onClick={() => navigate(getRoute(`app`))} />
      <Menu.Item children={`Profile`} onClick={() => navigate(getRoute(`profile`))} />
      <Menu.Item children={`Sign Out`} onClick={handleSignOut} />
    </Menu>
  )

  return (
    <Dropdown overlay={dropDownMenu}>
      <div>
        <Button size={32} icon={<UserOutlined />} shape="circle" ghost={ghost} />
      </div>
    </Dropdown>
  )
}

export default AvatarMenu
