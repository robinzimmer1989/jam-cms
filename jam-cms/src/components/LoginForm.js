import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { Button, Card, Space, Form, message, Row } from 'antd';

// import app components
import Input from './Input';

import { authActions } from '../actions';
import { ROUTE_APP } from '../routes';
import { auth, validateEmail, getParameter } from '../utils';
import { colors } from '../theme';

const LoginForm = (props) => {
  const { url, backLink = false, isAdmin = false } = props;

  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    success: null,
    loading: false,
    form: null,
  });

  const action = getParameter('action');
  const key = getParameter('key');
  const login = getParameter('login');

  const isAuthed = auth.isLoggedIn();

  useEffect(() => {
    setData({ ...data, form: action && key && login ? action : 'login' });
  }, [action]);

  // Navigate to jamCMS backend if this is admin form
  useEffect(() => {
    if (isAuthed) {
      if (isAdmin) {
        navigate(ROUTE_APP);
      } else {
        navigate(window.location.pathname);
      }
    }
  }, [isAuthed]);

  const handleChange = (e) => setData({ ...data, error: null, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { email, password } = data;

    if (!email) {
      setData({ ...data, error: 'Email address is required' });
      return;
    }

    if (!validateEmail(email)) {
      setData({ ...data, error: 'Email address is invalid' });
      return;
    }

    if (!password) {
      setData({ ...data, error: 'Password is required' });
      return;
    }

    setData({ ...data, loading: true });

    try {
      const result = await authActions.signIn({ email, password }, url);

      if (!result?.data?.login?.authToken || result?.errors?.[0]?.message) {
        setData({ ...data, error: 'Email or password wrong.', loading: false });
      } else {
        auth.setUser(result.data.login);

        setData({ ...data, loading: false });
      }
    } catch (err) {
      console.log('error...: ', err);
      message.error({ content: 'Oops, something went wrong' });
    }
  };

  const handleForgetPassword = async () => {
    const { email } = data;

    if (!email) {
      setData({ ...data, error: 'Email address is required' });
      return;
    }

    if (!validateEmail(email)) {
      setData({ ...data, error: 'Email address is invalid' });
      return;
    }

    setData({ ...data, loading: true });

    try {
      const result = await authActions.forgetPassword({ email }, url);

      if (result?.data?.sendPasswordResetEmail) {
        setData({
          ...data,
          success: (
            <p>{`Success. An email has been sent to ${email} with further instructions.`}</p>
          ),
          loading: false,
        });
      } else {
        setData({ ...data, error: result?.errors?.[0]?.message, loading: false });
      }
    } catch (err) {
      console.log('error...: ', err);
    }
  };

  const handleSetPassword = async () => {
    const { password } = data;

    if (!password) {
      setData({ ...data, error: 'Password is required' });
      return;
    }

    setData({ ...data, loading: true });

    try {
      const result = await authActions.resetPassword({ key, login, password }, url);

      if (result?.data?.resetUserPassword) {
        setData({
          ...data,
          password: '',
          success: (
            <>
              <p>{`Password set successfully.`}</p>
              <Button
                children={`Back to Login`}
                onClick={() => setData({ ...data, form: 'login' })}
                type="primary"
                block
              />
            </>
          ),
          loading: false,
        });
      } else {
        setData({ ...data, error: result?.errors?.[0]?.message, loading: false });
      }
    } catch (err) {
      console.log('error...: ', err);
    }
  };

  const getFormData = () => {
    switch (data.form) {
      case 'login':
        return {
          title: 'Login',
          handleSubmit: () => handleLogin(),
        };

      case 'forget':
        return {
          title: 'Forgot Password',
          handleSubmit: () => handleForgetPassword(),
        };

      case 'reset':
        return {
          title: 'Set Password',
          handleSubmit: () => handleSetPassword(),
        };

      default:
    }
  };

  const formData = getFormData();

  return (
    <>
      <Container>
        {data?.form && (
          <Card title={formData?.title}>
            {url ? (
              <>
                {data?.success ? (
                  <Success children={data.success} />
                ) : (
                  <Space direction="vertical" size={20}>
                    <Form onFinish={formData?.handleSubmit}>
                      <Space direction="vertical" size={20}>
                        {(data.form === 'login' || data.form === 'forget') && (
                          <Input
                            label={`Email`}
                            value={data.email}
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === 'Enter' && formData?.handleSubmit}
                            name="email"
                          />
                        )}
                        {(data.form === 'login' || data.form === 'reset') && (
                          <Input
                            label={`Password`}
                            value={data.password}
                            type="password"
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === 'Enter' && formData?.handleSubmit}
                            name="password"
                          />
                        )}
                        {data?.error && <Error children={data.error} />}
                        <Button
                          loading={data.loading}
                          children={`Submit`}
                          type="primary"
                          htmlType="submit"
                          block
                        />
                      </Space>
                    </Form>

                    <FooterLink
                      onClick={() =>
                        handleChange({
                          target: {
                            name: 'form',
                            value: data.form === 'login' ? 'forget' : 'login',
                          },
                        })
                      }
                    >
                      {data.form === 'login' ? 'Forgot password?' : 'Back to Login'}
                    </FooterLink>
                  </Space>
                )}
              </>
            ) : (
              <p>Please provide a URL.</p>
            )}
          </Card>
        )}
      </Container>

      {backLink && (
        <Row justify="center">
          <Link to={'/'}>
            <Button type="text" children="Back to Homepage" size="small" />
          </Link>
        </Row>
      )}
    </>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
  .ant-space {
    width: 100%;
  }
`;

const Success = styled.div`
  color: ${colors.success};
`;

const Error = styled.div`
  margin-top: 10px;
  color: ${colors.danger};
`;

const FooterLink = styled.p`
  margin: 10px 0 0;
  text-align: center;
  color: ${colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginForm;
