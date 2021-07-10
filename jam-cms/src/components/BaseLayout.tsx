import React from 'react';
import { Layout } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './HomeHeader' was resolved to '/Users/robi... Remove this comment to see the full error message
import Header from './HomeHeader';

const BaseLayout = (props: any) => {
  const { children } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Layout>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Layout.Header style={{ background: '#001529' }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Header />
      </Layout.Header>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Layout.Content> {children}</Layout.Content>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default BaseLayout;
