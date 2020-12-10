import React from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import app components
import getRoute from '../routes';
import { useStore } from '../store';
import { authActions } from '../actions';

const AvatarMenu = (props) => {
  const { ghost } = props;

  const [{ config }, dispatch] = useStore();

  const handleSignOut = async () =>
    authActions.signOut({ callback: () => navigate(getRoute(`sign-in`)), dispatch, config });

  const dropDownMenu = (
    <StyledMenu>
      <Menu.Item onClick={handleSignOut}>Sign Out</Menu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={dropDownMenu} arrow trigger={['click']}>
      <div>
        <Button size={32} icon={<UserOutlined />} shape="circle" ghost={ghost} />
      </div>
    </Dropdown>
  );
};

const StyledMenu = styled(Menu)`
  width: 150px;
`;

export default AvatarMenu;
