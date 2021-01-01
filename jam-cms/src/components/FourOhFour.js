import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';

const FourOhFour = () => {
  return (
    <EmptyContainer>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 120,
        }}
        description={'Page not found'}
      />
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 130px);
  width: 100%;
  text-align: center;
`;

export default FourOhFour;
