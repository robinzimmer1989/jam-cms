import React from 'react'

// import app components
import Sidebar from '../components/cms/Sidebar'
import MediaLibrary from '../components/MediaLibrary'

const Media = props => {
  return (
    <Sidebar>
      <MediaLibrary />
    </Sidebar>
  )
}

export default Media
