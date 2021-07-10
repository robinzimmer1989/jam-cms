import React from 'react';
import { Layout } from 'antd';

// import app components
import Header from './HomeHeader';

const BaseLayout = (props: any) => {
  const { children } = props;

  return (
    <Layout>
      <Layout.Header style={{ background: '#001529' }}>
        <Header />
      </Layout.Header>
      <Layout.Content> {children}</Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default BaseLayout;
