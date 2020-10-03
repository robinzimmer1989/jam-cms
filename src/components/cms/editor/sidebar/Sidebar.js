import React from 'react'
import styled from 'styled-components'
import CloseIcon from 'react-ionicons/lib/IosClose'

// import app components
import BlockEditFields from './BlockEditFields'
import PostSettings from './PostSettings'

import { useStore } from 'store'
import { colors } from 'theme'

const Sidebar = () => {
  const [
    {
      editorState: { post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  let settings = {
    title: '',
    icon: {
      onClick: null,
      component: null,
    },
    children: null,
  }

  if (post?.content[activeBlockIndex] || activeBlockIndex === 'header' || activeBlockIndex === 'footer') {
    settings = {
      title:
        activeBlockIndex === 'header' || activeBlockIndex === 'footer'
          ? activeBlockIndex.charAt(0).toUpperCase() + activeBlockIndex.slice(1)
          : post.content[activeBlockIndex].name,
      icon: {
        onClick: () =>
          dispatch({
            type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX',
            payload: null,
          }),
        component: <CloseIcon />,
      },
      children: <BlockEditFields />,
    }
  } else {
    settings = {
      title: 'Settings',
      icon: {
        onClick: null,
        component: null,
      },
      children: <PostSettings />,
    }
  }

  return (
    <Container>
      <Header>
        <Title>{settings.title}</Title>
        {settings.icon?.onClick && settings.icon?.component && (
          <Icon onClick={settings.icon.onClick}>{settings.icon.component}</Icon>
        )}
      </Header>

      <Content>{settings.children}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  overflow: auto;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid ${colors.background.dark};
`

const Title = styled.div`
  flex: 1;
  padding: 5px 20px;
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  cursor: pointer;
  border-left: 1px solid ${colors.background.dark};
`

const Content = styled.div`
  padding: 20px;
`

export default Sidebar
