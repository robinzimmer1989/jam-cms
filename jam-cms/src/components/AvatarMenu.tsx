import React from 'react';
import { Link } from '@reach/router';
import { navigate } from 'gatsby';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { authActions } from '../actions';
import getRoute from '../routes';

const AvatarMenu = (props: any) => {
  const { ghost } = props;

  // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
  const [{ config }, dispatch] = useStore();

  const handleSignOut = () =>
    authActions.signOut({ onLogout: () => navigate('/') }, dispatch, config);

  const dropDownMenu = (
    <StyledMenu>
      <Menu.Item>
        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1. */}
        <Link to={getRoute('profile')}>Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={handleSignOut}>Logout</Menu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={dropDownMenu} arrow trigger={['click']}>
      <div>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'SizeType'... Remove this comment to see the full error message */}
        <Button size={32} icon={<UserOutlined />} ghost={ghost} />
      </div>
    </Dropdown>
  );
};

const StyledMenu = styled(Menu)`
  width: 150px;
`;

export default AvatarMenu;
