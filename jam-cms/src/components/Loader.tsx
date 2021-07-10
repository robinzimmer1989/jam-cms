import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
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
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
