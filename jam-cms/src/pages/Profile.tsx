import React from 'react';
import { Card, Space, Typography } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import Caption from '../components/Caption';

import { RootState, useAppSelector } from '../redux';

const Profile = (props: any) => {
  const { fields } = props;

  const {
    auth: { user: authUser },
  } = useAppSelector((state: RootState) => state);

  return (
    <CmsLayout fields={fields} pageTitle="Profile">
      <Space direction="vertical" size={40}>
        <Card title="Personal Information">
          <Space direction="vertical" size={20}>
            <Space direction="vertical" size={2}>
              <Caption children="Email" />
              <Typography>{authUser?.email}</Typography>
            </Space>

            {authUser?.roles && authUser.roles.length > 0 && (
              <Space direction="vertical" size={2}>
                <Caption children="Role" />
                <Typography>{authUser.roles.join(', ')}</Typography>
              </Space>
            )}
          </Space>
        </Card>
      </Space>
    </CmsLayout>
  );
};

export default Profile;
