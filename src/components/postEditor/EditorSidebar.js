import React from 'react'
import { PageHeader, Divider } from 'antd'

// import app components
import BlockEditFields from 'components/postEditor/BlockEditFields'
import PostSettings from 'components/postEditor/PostSettings'
import { useStore } from 'store'

const EditorSidebar = () => {
  const [
    {
      editorState: { post, editorIndex },
    },
    dispatch,
  ] = useStore()

  const siteComponent = editorIndex === 'header' || editorIndex === 'footer'

  let settings = {
    title: '',
    icon: {
      onClick: null,
      component: null,
    },
    children: null,
  }

  if (post?.content[editorIndex] || siteComponent) {
    settings = {
      title: {
        title: siteComponent
          ? editorIndex.charAt(0).toUpperCase() + editorIndex.slice(1)
          : post.content[editorIndex].name,
        onBack: () =>
          dispatch({
            type: 'SET_EDITOR_INDEX',
            payload: null,
          }),
      },
      children: <BlockEditFields />,
    }
  } else {
    settings = {
      title: { title: 'Settings', onBack: null },
      children: <PostSettings />,
    }
  }

  return (
    <>
      <PageHeader {...settings.title} style={{ paddingLeft: 20 }} />
      <Divider style={{ margin: 0 }} />
      {settings.children}
    </>
  )
}

export default EditorSidebar
