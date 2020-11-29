import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Row } from 'antd';

// import app components
import AvatarMenu from './AvatarMenu';
import { isLoggedIn } from '../utils/auth';
import getRoute from '../routes';

const HomeHeader = () => {
  return (
    <Container>
      <Row justify="space-between" align="center">
        <Logo to={getRoute(`app`)}>jamCMS</Logo>
        <Row align="center">{isLoggedIn() && <AvatarMenu ghost={true} />}</Row>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 64px;
`;

const Logo = styled(Link)`
  margin-right: 20px;
  float: left;
`;

export default HomeHeader;
