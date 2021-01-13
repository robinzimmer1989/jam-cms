import React from 'react';
import styled from 'styled-components';
import { Alert, Space } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import { useStore } from '../store';
import { version } from '../../package.json';

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
        <Content>
          {errors && (
            <Space direction="vertical">
              {errors.map((o, i) => {
                return (
                  <Alert
                    key={i}
                    message={o.title}
                    description={o.description}
                    type="error"
                    showIcon
                  />
                );
              })}
            </Space>
          )}
        </Content>
        <Footer>{version}</Footer>
      </CmsLayout>
    </>
  );
};

const Content = styled.div``;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 40px;
`;

export default Dashboard;
