import React from 'react'

// import app components
import Layout from '../components/cms/Layout'
import MediaLibrary from '../components/MediaLibrary'

const Media = props => {
  return (
    <Layout pageTitle={`Media`}>
      <MediaLibrary />
    </Layout>
  )
}

export default Media
