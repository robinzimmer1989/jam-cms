import React from 'react'

// import app components
import BaseLayout from 'components/BaseLayout'
import Spacer from 'components/Spacer'
import Edges from 'components/Edges'
import Paper from 'components/Paper'

import { getCurrentUser } from 'utils/auth'

const Home = () => {
  const user = getCurrentUser()

  return (
    <BaseLayout>
      <Edges size="sm">
        <Spacer mt={30} mb={30}>
          <Paper>
            <Spacer mb={10}>
              <h1>Profile Details</h1>
            </Spacer>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone_number}</p>
            <p>Username: {user.username}</p>
          </Paper>
        </Spacer>
      </Edges>
    </BaseLayout>
  )
}

export default Home
