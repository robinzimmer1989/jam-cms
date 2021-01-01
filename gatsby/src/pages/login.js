import React from 'react';
import styled from 'styled-components';
import { LoginForm } from 'jam-cms';

import Layout from '../components/Layout';
import Edges from '../components/Edges';

const Login = () => (
  <Layout>
    <Edges size="xs">
      <Container>
        <LoginForm url={process.env.GATSBY_CMS_AUTH} />
      </Container>
    </Edges>
  </Layout>
);

const Container = styled.div`
  padding: 40px 0;
`;

export default Login;
