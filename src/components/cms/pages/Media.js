import React from 'react'

// import app components
import Layout from '../Layout'
import MediaLibrary from '../MediaLibrary'

const Media = props => {
  return (
    <Layout pageTitle={`Media`}>
      <MediaLibrary />
    </Layout>
  )
}

export default Media
