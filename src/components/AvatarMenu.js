import React from 'react'
import { navigate } from 'gatsby'
import { Menu, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

// import app components
import { auth } from '../utils'
import getRoute from '../routes'

const AvatarMenu = (props) => {
  const { ghost } = props

  const handleSignOut = async () => {
    auth.logout(() => navigate(getRoute(`/`)))
  }

  const dropDownMenu = (
    <Menu>
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
