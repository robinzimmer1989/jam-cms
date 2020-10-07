import React from 'react'

// import app components
import CmsLayout from '../CmsLayout'
import MediaLibrary from '../media/MediaLibrary'

const Media = props => {
  return (
    <CmsLayout pageTitle={`Media`}>
      <MediaLibrary />
    </CmsLayout>
  )
}

export default Media
