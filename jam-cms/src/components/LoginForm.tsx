import React, { useState, useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { Button, Card, Space, Form, message, Row } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';

import { authActions } from '../actions';
import { ROUTE_APP } from '../routes';
import { auth, validateEmail, getParameter } from '../utils';
import { colors } from '../theme';

const LoginForm = (props: any) => {
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'true | "login"' is not assignable to type 'n... Remove this comment to see the full error message
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

  const handleChange = (e: any) => setData({ ...data, error: null, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { email, password } = data;

    if (!email) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
      setData({ ...data, error: 'Email address is required' });
      return;
    }

    if (!validateEmail(email)) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
      setData({ ...data, error: 'Email address is invalid' });
      return;
    }

    if (!password) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
      setData({ ...data, error: 'Password is required' });
      return;
    }

    setData({ ...data, loading: true });

    try {
      const result = await authActions.signIn({ email, password }, url);

      if (!result?.data?.login?.authToken || result?.errors?.[0]?.message) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
      setData({ ...data, error: 'Email address is required' });
      return;
    }

    if (!validateEmail(email)) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
      setData({ ...data, error: 'Email address is invalid' });
      return;
    }

    setData({ ...data, loading: true });

    try {
      const result = await authActions.forgetPassword({ email }, url);

      if (result?.data?.sendPasswordResetEmail) {
        setData({
          ...data,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null'.
          success: (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
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
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null'.
          success: (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p>{`Password set successfully.`}</p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button
                children={`Back to Login`}
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
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
      // @ts-expect-error ts-migrate(2678) FIXME: Type '"login"' is not comparable to type 'null'.
      case 'login':
        return {
          title: 'Login',
          handleSubmit: () => handleLogin(),
        };

      // @ts-expect-error ts-migrate(2678) FIXME: Type '"forget"' is not comparable to type 'null'.
      case 'forget':
        return {
          title: 'Forgot Password',
          handleSubmit: () => handleForgetPassword(),
        };

      // @ts-expect-error ts-migrate(2678) FIXME: Type '"reset"' is not comparable to type 'null'.
      case 'reset':
        return {
          title: 'Set Password',
          handleSubmit: () => handleSetPassword(),
        };

      default:
    }
  };

  const formData = getFormData();

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Container>
      {data?.form && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card title={formData?.title}>
          {url ? (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
              {data?.success ? (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Success children={data.success} />
              ) : (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Space direction="vertical" size={20}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Form onFinish={formData?.handleSubmit}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Space direction="vertical" size={20}>
                      {(data.form === 'login' || data.form === 'forget') && (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Input
                          label={`Email`}
                          value={data.email}
                          onChange={handleChange}
                          onKeyDown={(e: any) => e.key === 'Enter' && formData?.handleSubmit}
                          name="email"
                        />
                      )}
                      {(data.form === 'login' || data.form === 'reset') && (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Input
                          label={`Password`}
                          value={data.password}
                          type="password"
                          onChange={handleChange}
                          onKeyDown={(e: any) => e.key === 'Enter' && formData?.handleSubmit}
                          name="password"
                        />
                      )}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {data?.error && <Error children={data.error} />}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Button
                        loading={data.loading}
                        children={`Submit`}
                        type="primary"
                        htmlType="submit"
                        block
                      />
                    </Space>
                  </Form>

                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>Please provide a URL.</p>
          )}
        </Card>
      )}
    </Container>

    {backLink && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Row justify="center">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to={'/'}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button type="text" children="Back to Homepage" size="small" />
        </Link>
      </Row>
    )}
  </>;
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
