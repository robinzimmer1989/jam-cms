import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';

// import app components
import CmsLayout from '../CmsLayout';

const FourOhFour = () => {
  return (
    <CmsLayout pageTitle={`404`}>
      <EmptyContainer>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 120,
          }}
          description={'Page not found'}
        />
      </EmptyContainer>
    </CmsLayout>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 130px);
  text-align: center;
`;

export default FourOhFour;
