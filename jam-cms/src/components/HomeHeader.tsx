import React from 'react';
import { Link } from '@reach/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Row } from 'antd';

// import app components
import Edges from './Edges';
import AvatarMenu from './AvatarMenu';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../icons/jamCMS.svg' or its co... Remove this comment to see the full error message
import JamCmsLogo from '../icons/jamCMS.svg';
import { isLoggedIn } from '../utils/auth';
import getRoute from '../routes';
import { colors } from '../theme';
import { useStore } from '../store';

const HomeHeader = () => {
  // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
  const [{ config }] = useStore();
  return (
    <Container>
      <Edges size="md">
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '"center"' is not assignable to type '"top" |... Remove this comment to see the full error message */}
        <Row justify="space-between" align="center">
          {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1. */}
          <Logo to={getRoute(`app`)}>
            <JamCmsLogo />
          </Logo>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '"center"' is not assignable to type '"top" |... Remove this comment to see the full error message */}
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
    height: 50px;

    path {
      fill: ${colors.secondaryContrast};
    }
  }
`;

export default HomeHeader;
