import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import DesktopIcon from 'react-ionicons/lib/IosDesktopOutline'
import TabletIcon from 'react-ionicons/lib/IosTabletPortrait'
import MobileIcon from 'react-ionicons/lib/IosPhonePortrait'

// import app components
import AddBlock from '../forms/AddBlock'
import FlexibleContent from './FlexibleContent'
import Layout from './Layout'
import convertBlockSchemaToProps from './convertBlockSchemaToProps'
import { useStore } from '../../store'
import { postActions } from '../../actions'
import { colors } from '../../theme'

const Editor = props => {
  const { postID } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const [view, setView] = useState('desktop')

  useEffect(() => {
    const loadPost = async () => {
      await postActions.getPost({ postID }, dispatch)
    }

    loadPost()
  }, [postID])

  const handleOpenBlockDialog = () =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        component: <AddBlock index={0} />,
        width: 'xs',
      },
    })

  return (
    <Layout>
      <ViewToggle>
        {[
          { type: 'desktop', icon: <DesktopIcon /> },
          { type: 'tablet', icon: <TabletIcon /> },
          { type: 'mobile', icon: <MobileIcon /> },
        ].map(o => {
          return <ViewItem key={o.type} className={view === o.type && 'active'} onClick={() => setView(o.type)} children={o.icon} />
        })}
      </ViewToggle>

      <Page view={view}>
        {post && (
          <>
            {post.content.length > 0 ? (
              <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
            ) : (
              <AddFirstBlock onClick={handleOpenBlockDialog} children={`Add Block`} />
            )}
          </>
        )}
      </Page>
    </Layout>
  )
}

const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
`

const ViewItem = styled.div`
  padding: 5px;
  cursor: pointer;

  svg {
    width: 60px;
    height: 30px;
    fill: ${colors.text.light};
    transition: ease all 0.2s;
  }

  &:hover,
  &.active {
    svg {
      fill: ${colors.text.dark};
    }
  }
`

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;

  ${({ view }) =>
    view === 'tablet' &&
    css`
      max-width: 768px;
    `}

  ${({ view }) =>
    view === 'mobile' &&
    css`
      max-width: 375px;
    `}
`

const AddFirstBlock = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dotted #ccc;
  cursor: pointer;
`

export default Editor
