import React from 'react'
import { Link } from 'gatsby'
import { PageHeader, Button, Space, Tooltip } from 'antd'
import { HomeTwoTone, FullscreenOutlined } from '@ant-design/icons'

// import app components
import { useStore } from 'store'
import getRoute from 'routes'

const EditorHeader = () => {
  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const title = (
    <Button
      key={`all-posts`}
      icon={
        <Space>
          <HomeTwoTone style={{ fontSize: '12px' }} />
          <div />
        </Space>
      }
    >
      <Link
        to={getRoute(`collection`, { siteID: post?.siteID, postTypeID: post?.postTypeID })}
        children={`All Posts`}
      />
    </Button>
  )

  return (
    <PageHeader
      title={title}
      extra={[
        <Tooltip key={`view-fullscreen`} title={`Fullscreen`}>
          <Button
            onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: `fullscreen` })}
            icon={<FullscreenOutlined style={{ fontSize: '12px' }} />}
            shape="circle"
          />
        </Tooltip>,
      ]}
    />
  )
}

export default EditorHeader
