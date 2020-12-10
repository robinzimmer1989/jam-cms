import React from 'react';
import { Card, PageHeader } from 'antd';

// import app components
import BaseLayout from '../BaseLayout';
import Edges from '../Edges';

import { getCurrentUser } from '../../utils/auth';
import { useStore } from '../../store';

const Home = () => {
  const [{ config }] = useStore();

  const user = getCurrentUser(config);

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
