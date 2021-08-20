import React from 'react';
import styled from 'styled-components';
import { Spin, Typography } from 'antd';

const Loader = (props: any) => {
  const { text = '', height = '100vh', py = 0 } = props;

  return (
    <Container className="jam-cms" height={height} py={py}>
      <Content>
        <Spin size="large" />
        {text && <span>{text}</span>}
      </Content>
    </Container>
  );
};

const Container = styled('div' as any)`
  height: ${({ height }) => height};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${({ py }) => `${py}px`};
  padding-bottom: ${({ py }) => `${py}px`};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

  span {
    display: block;
    margin-top: 20px;
  }
`;

export default Loader;
