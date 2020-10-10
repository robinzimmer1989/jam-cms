import React from 'react'
import { Card, PageHeader } from 'antd'

// import app components
import BaseLayout from 'components/BaseLayout'
import Edges from 'components/Edges'

import { getCurrentUser } from 'utils/auth'

const Home = () => {
  const user = getCurrentUser()

  return (
    <BaseLayout>
      <Edges size="md">
        <PageHeader title="Profile" />

        <Card title="Contact Details">
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone_number}</p>
          <p>Username: {user.username}</p>
        </Card>
      </Edges>
    </BaseLayout>
  )
}

export default Home
