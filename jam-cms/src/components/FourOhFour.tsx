import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Empty, Button } from 'antd';

import getRoute from '../routes';
import { useStore } from '../store';

const FourOhFour = () => {
  const [
    {
      cmsState: { siteID },
    },
  ] = useStore();

  return (
    <EmptyContainer>
      <Empty
        imageStyle={{
          height: 120,
        }}
        description={'Page not found'}
      >
        <Link to={getRoute('dashboard', { siteID })}>
          <Button type="primary">Back to Dashboard</Button>
        </Link>
      </Empty>
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
