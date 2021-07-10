import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { LoginForm } from 'jam-cms';

const Login = (props) => {
  const { source } = props;

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Container>
        <CardWrapper>
          <LoginForm url={source} backLink={true} isAdmin />
        </CardWrapper>
      </Container>
    </>
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
