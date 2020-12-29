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
import { useStore } from '../store';

const HomeHeader = () => {
  const [{ config }] = useStore();
  return (
    <Container>
      <Edges size="md">
        <Row justify="space-between" align="center">
          <Logo to={getRoute(`app`)}>
            <JamCmsLogo />
          </Logo>
          <Row align="center">{isLoggedIn(config) && <AvatarMenu ghost={true} />}</Row>
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

    path {
      fill: ${colors.background.light};
    }
  }
`;

export default HomeHeader;
