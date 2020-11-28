import React from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components'
import { Menu, Button, Dropdown, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

// import app components
import { auth } from '../utils'
import getRoute from '../routes'

const AvatarMenu = (props) => {
  const { ghost } = props

  const handleSignOut = async () => {
    auth.logout(() => navigate(getRoute(`sign-in`)))
  }

  const dropDownMenu = (
    <StyledMenu>
      {/* <Menu.Item children={`Profile`} onClick={() => navigate(getRoute(`profile`))} /> */}
      <Menu.Item children={`Sign Out`} onClick={handleSignOut} />
    </StyledMenu>
  )

  return (
    <Dropdown overlay={dropDownMenu} arrow>
      <div>
        <Button size={32} icon={<UserOutlined />} shape="circle" ghost={ghost} />
      </div>
    </Dropdown>
  )
}

const StyledMenu = styled(Menu)`
  width: 150px;
`

export default AvatarMenu
