import React from 'react'
import { Card } from 'antd'

// import app components
import BaseLayout from 'components/BaseLayout'
import Spacer from 'components/Spacer'
import Edges from 'components/Edges'

import { getCurrentUser } from 'utils/auth'

const Home = () => {
  const user = getCurrentUser()

  return (
    <BaseLayout>
      <Edges size="sm">
        <Spacer mt={30} mb={30}>
          <Card>
            <Spacer mb={10}>
              <h1>Profile Details</h1>
            </Spacer>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone_number}</p>
            <p>Username: {user.username}</p>
          </Card>
        </Spacer>
      </Edges>
    </BaseLayout>
  )
}

export default Home
