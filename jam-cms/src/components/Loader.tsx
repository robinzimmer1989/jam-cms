import React from 'react';
import styled from 'styled-components';
import { Spin, Typography } from 'antd';

const Loader = (props: any) => {
  const { text = '' } = props;

  return (
    <Container>
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

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Loader;
