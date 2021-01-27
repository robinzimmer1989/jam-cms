import React from 'react';
import { Card } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import Caption from '../components/Caption';

import { useStore } from '../store';

const Home = () => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  return (
    <CmsLayout pageTitle={`Profile`}>
      <Card title={`Personal Information`}>
        <Caption children="Email" />
        <p>{authUser?.email}</p>
      </Card>
    </CmsLayout>
  );
};

export default Home;
