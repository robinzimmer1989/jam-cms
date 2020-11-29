import React from 'react';
import { Card, PageHeader } from 'antd';

// import app components
import BaseLayout from '../BaseLayout';
import Edges from '../Edges';

import { getCurrentUser } from '../../utils/auth';

const Home = () => {
  const user = getCurrentUser();

  return (
    <BaseLayout>
      <Edges size="md">
        <PageHeader title="Profile" />

        <Card>
          <p>Email: {user.email}</p>
        </Card>
      </Edges>
    </BaseLayout>
  );
};

export default Home;
