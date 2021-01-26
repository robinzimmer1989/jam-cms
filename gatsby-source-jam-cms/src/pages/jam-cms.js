import React from 'react';
import styled from 'styled-components';

import { LoginForm } from 'jam-cms';

const Login = () => {
  return (
    <Container>
      <CardWrapper>
        <LoginForm url={`${process.env.GATSBY_JAM_CMS_URL}/wp-json/jwt-auth/v1/token`} />
      </CardWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background: #f0f2f5;
`;

const CardWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 40px 0;
`;

export default Login;
