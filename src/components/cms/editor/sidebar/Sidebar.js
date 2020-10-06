import React from 'react'
import styled from 'styled-components'
import { PageHeader, Divider } from 'antd'

// import app components
import BlockEditFields from './BlockEditFields'
import PostSettings from './PostSettings'
import { useStore } from 'store'

const Sidebar = () => {
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
      <StyledDivider />
      <Content>{settings.children}</Content>
    </>
  )
}

const Content = styled.div`
  padding: 20px;
`

const StyledDivider = styled(Divider)`
  margin: 0 0 32px;
`

export default Sidebar
