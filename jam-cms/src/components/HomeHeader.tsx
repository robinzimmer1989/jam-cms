import React from 'react';
import { Link } from '@reach/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Row } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Edges' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Edges from './Edges';
// @ts-expect-error ts-migrate(6142) FIXME: Module './AvatarMenu' was resolved to '/Users/robi... Remove this comment to see the full error message
import AvatarMenu from './AvatarMenu';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../icons/jamCMS.svg' or its co... Remove this comment to see the full error message
import JamCmsLogo from '../icons/jamCMS.svg';
import { isLoggedIn } from '../utils/auth';
import getRoute from '../routes';
import { colors } from '../theme';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

const HomeHeader = () => {
  const [{ config }] = useStore();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Edges size="md">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Row justify="space-between" align="center">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Logo to={getRoute(`app`)}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <JamCmsLogo />
          </Logo>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
