import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Row } from 'antd';

// import app components
import AvatarMenu from './AvatarMenu';
import JamCmsLogo from '../icons/jamCMS.svg';
import { isLoggedIn } from '../utils/auth';
import getRoute from '../routes';

const HomeHeader = () => {
  return (
    <Container>
      <Row justify="space-between" align="center">
        <Logo to={getRoute(`app`)}>
          <JamCmsLogo />
        </Logo>
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

  svg {
    width: 100px;

    path {
      fill: #f8f9ff;
    }
  }
`;

export default HomeHeader;
