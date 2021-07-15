import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Row } from 'antd';

// import app components
import Edges from './Edges';
import AvatarMenu from './AvatarMenu';
import JamCmsLogo from '../icons/jamCMS.svg';
import { isLoggedIn } from '../utils/auth';
import getRoute from '../routes';
import { colors } from '../theme';

const HomeHeader = () => {
  return (
    <Container>
      <Edges size="md">
        <Row justify="space-between" align="middle">
          <Logo to={getRoute(`app`)}>
            <JamCmsLogo />
          </Logo>
          <Row align="middle">{isLoggedIn() && <AvatarMenu ghost={true} />}</Row>
        </Row>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  height: 50px;
`;

const Logo = styled(Link)`
  margin-right: 20px;
  float: left;

  svg {
    width: 100px;
    height: 50px;

    path {
      fill: ${colors.secondaryContrast};
    }
  }
`;

export default HomeHeader;
