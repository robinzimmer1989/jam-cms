import React from 'react'

import { PageHeader, Divider } from 'antd'

// import app components
import BlockEditFields from './BlockEditFields'
import PostSettings from './PostSettings'
import { useStore } from 'store'

const EditorSidebar = () => {
  const [
    {
      editorState: { post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const siteComponent = activeBlockIndex === 'header' || activeBlockIndex === 'footer'

  let settings = {
    title: '',
    icon: {
      onClick: null,
      component: null,
    },
    children: null,
  }

  if (post?.content[activeBlockIndex] || siteComponent) {
    settings = {
      header: {
        title: siteComponent
          ? activeBlockIndex.charAt(0).toUpperCase() + activeBlockIndex.slice(1)
          : post.content[activeBlockIndex].name,
        onBack: () =>
          dispatch({
            type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX',
            payload: null,
          }),
      },
      children: <BlockEditFields />,
    }
  } else {
    settings = {
      header: { title: 'Settings', onBack: null },
      children: <PostSettings />,
    }
  }

  return (
    <>
      <PageHeader {...settings.header} style={{ paddingLeft: 20 }} />
      <Divider style={{ margin: 0 }} />
      {settings.children}
    </>
  )
}

export default EditorSidebar
