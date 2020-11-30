import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Loader = () => {
  return (
    <LoadingContainer>
      <Spin size="large" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
