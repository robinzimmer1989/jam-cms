import React from 'react'
import { Link } from 'gatsby'
import { PageHeader, Button } from 'antd'

// import app components
import { useStore } from 'store'
import getRoute from 'routes'

const EditorHeader = () => {
  const [
    {
      editorState: { post },
    },
  ] = useStore()

  return (
    <PageHeader
      title={''}
      extra={[
        <Button key={`all-posts`}>
          <Link
            to={getRoute(`collection`, { siteID: post?.siteID, postTypeID: post?.postTypeID })}
            children={`All Posts`}
          />
        </Button>,
      ]}
    />
  )
}

export default EditorHeader
