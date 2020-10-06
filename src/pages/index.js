import React from 'react'
import Amplify from 'aws-amplify'

// import app components
import BaseLayout from 'components/BaseLayout'
import config from '../aws-exports'
Amplify.configure(config)

const IndexPage = () => {
  return <BaseLayout></BaseLayout>
}

export default IndexPage
