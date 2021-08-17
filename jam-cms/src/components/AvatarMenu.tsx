import React from 'react';
import { Link } from '@reach/router';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import app components
import { logout } from '../utils/auth';
import getRoute from '../routes';

const AvatarMenu = (props: any) => {
  const { ghost } = props;

  const handleSignOut = () => logout(() => navigate('/'));

  const dropDownMenu = (
    <StyledMenu>
      <Menu.Item>
        <Link to={getRoute('profile')}>Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={handleSignOut}>Logout</Menu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={dropDownMenu} arrow trigger={['click']}>
      <div>
        <Button size={'middle'} icon={<UserOutlined />} ghost={ghost} />
      </div>
    </Dropdown>
  );
};

const StyledMenu = styled(Menu)`
  width: 150px;
`;

export default AvatarMenu;
