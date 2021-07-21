import React from 'react';
import { Card, Space, Typography } from 'antd';
import { RouteComponentProps } from '@reach/router';

// import app components
import CmsLayout from '../components/CmsLayout';
import Caption from '../components/Caption';

import { useStore } from '../store';

const Profile = (props: RouteComponentProps) => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  return (
    <CmsLayout pageTitle="Profile">
      <Space direction="vertical" size={40}>
        <Card title="Personal Information">
          <Space direction="vertical" size={20}>
            <Space direction="vertical" size={2}>
              <Caption children="Email" />
              <Typography>{authUser?.email}</Typography>
            </Space>
            <Space direction="vertical" size={2}>
              <Caption children="Role" />
              <Typography>{authUser?.roles.join(', ')}</Typography>
            </Space>
          </Space>
        </Card>
      </Space>
    </CmsLayout>
  );
};

export default Profile;
