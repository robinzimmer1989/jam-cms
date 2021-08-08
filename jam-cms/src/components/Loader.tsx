import React from 'react';
import styled from 'styled-components';
import { Spin, Typography } from 'antd';

const Loader = (props: any) => {
  const { text = '', height = '100vh', py = 0 } = props;

  return (
    <Container className="jam-cms" height={height} py={py}>
      <Content>
        <Spin size="large" />
        {text && (
          <Typography.Text style={{ fontSize: 12, marginTop: 20, textTransform: 'uppercase' }}>
            {text}
          </Typography.Text>
        )}
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
  flex-direction: column;
`;

export default Loader;
