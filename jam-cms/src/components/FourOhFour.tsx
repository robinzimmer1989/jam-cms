import React from 'react';
import { Link } from '@reach/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Empty, Button } from 'antd';

import getRoute from '../routes';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

const FourOhFour = () => {
  const [
    {
      cmsState: { siteID },
    },
  ] = useStore();

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <EmptyContainer>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Empty
        imageStyle={{
          height: 120,
        }}
        description={'Page not found'}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to={getRoute('dashboard', { siteID })}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button type="primary">Back to Dashboard</Button>
        </Link>
      </Empty>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 130px);
  width: 100%;
  text-align: center;
`;

export default FourOhFour;
