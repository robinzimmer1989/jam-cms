import React from 'react';
import { Card, PageHeader } from 'antd';

// import app components
import Edges from '../Edges';

import { getCurrentUser } from '../../utils/auth';
import { useStore } from '../../store';

const Home = () => {
  const [{ config }] = useStore();

  const user = getCurrentUser(config);

  return (
    <>
      <Edges size="md">
        <PageHeader title="Profile" />

        <Card>
          <p>Email: {user.email}</p>
        </Card>
      </Edges>
    </>
  );
};

export default Home;
