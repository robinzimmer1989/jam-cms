import React from 'react';
import { navigate, Link } from 'gatsby';
import styled from 'styled-components';
import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { authActions } from '../actions';
import getRoute from '../routes';

const AvatarMenu = (props) => {
  const { ghost } = props;

  const [{ config }, dispatch] = useStore();

  const handleSignOut = () =>
    authActions.signOut({ callback: () => navigate('/') }, dispatch, config);

  const dropDownMenu = (
    <StyledMenu>
      <Menu.Item>
        <Link to={getRoute('profile')}>Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={handleSignOut}>Sign Out</Menu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={dropDownMenu} arrow trigger={['click']}>
      <div>
        <Button size={32} icon={<UserOutlined />} ghost={ghost} />
      </div>
    </Dropdown>
  );
};

const StyledMenu = styled(Menu)`
  width: 150px;
`;

export default AvatarMenu;
