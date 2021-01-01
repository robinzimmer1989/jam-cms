import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Button, Card, Space } from 'antd';

// import app components
import Input from './Input';

import { authActions } from '../actions';
import { ROUTE_APP } from '../routes';
import { auth } from '../utils';

const LoginForm = (props) => {
  const { url } = props;

  const [data, setData] = useState({
    username: ``,
    password: ``,
    error: ``,
    loading: false,
  });

  const isAuthed = auth.isLoggedIn();

  useEffect(() => {
    isAuthed && navigate(ROUTE_APP);
  }, [isAuthed]);

  const handleLogin = async () => {
    const { username, password } = data;

    if (!username || !password) {
      return;
    }

    handleChange({ target: { name: 'loading', value: true } });

    try {
      const result = await authActions.signIn({ username, password }, url);

      if (result?.success) {
        navigate(ROUTE_APP);
      } else {
        handleChange({ target: { name: 'error', value: result?.message } });
      }
    } catch (err) {
      console.log('error...: ', err);
    }
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <Container>
      <Card title={`Sign In`}>
        {url ? (
          <Space direction="vertical" size={20}>
            <Space direction="vertical">
              <Input
                label={`Username`}
                value={data.username}
                onChange={handleChange}
                name="username"
              />

              <Input
                label={`Password`}
                value={data.password}
                type="password"
                onChange={handleChange}
                name="password"
              />

              {data?.error && <Error children={data.error} />}
            </Space>

            <Button
              loading={data.loading}
              children={`Submit`}
              onClick={handleLogin}
              type="primary"
              block
            />
          </Space>
        ) : (
          <p>Please provide a URL.</p>
        )}
      </Card>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  .ant-space {
    width: 100%;
  }
`;

const Error = styled.div``;
