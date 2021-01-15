import React from 'react';
import { Card } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import Caption from '../components/Caption';

import { getCurrentUser } from '../utils/auth';
import { useStore } from '../store';

const Home = () => {
  const [{ config }] = useStore();

  const user = getCurrentUser(config);

  return (
    <CmsLayout pageTitle={`Profile`}>
      <Card title={`Personal Information`}>
        <Caption children="Email" />
        <p>{user.email}</p>
      </Card>
    </CmsLayout>
  );
};

export default Home;
