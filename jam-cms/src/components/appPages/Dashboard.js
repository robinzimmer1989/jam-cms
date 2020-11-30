import React from 'react';
import styled from 'styled-components';
import { Alert, Space } from 'antd';

// import app components
import CmsLayout from '../CmsLayout';

import { useStore } from '../../store';

const Dashboard = () => {
  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore();

  const errors = sites?.[siteID]?.errors;

  return (
    <>
      <CmsLayout pageTitle={`Dashboard`}>
        <Container>
          {errors && (
            <Space direction="vertical">
              {errors.map((o, i) => {
                return <Alert key={i} message={o.title} description={o.description} type="error" showIcon />;
              })}
            </Space>
          )}
        </Container>
      </CmsLayout>
    </>
  );
};

const Container = styled.div``;

export default Dashboard;
