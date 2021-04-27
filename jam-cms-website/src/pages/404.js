import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Edges from '../components/Edges';

const NotFoundPage = () => {
  return (
    <Layout>
      <Edges size="xs">
        <Container>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Container>
      </Edges>
    </Layout>
  );
};

const Container = styled.div`
  padding: 40px 0;
`;

export default NotFoundPage;
