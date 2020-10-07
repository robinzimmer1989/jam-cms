import React, { useEffect } from 'react'
import styled from 'styled-components'

// import app components
import AddBlock from '../forms/AddBlock'
import FlexibleContent from '../editor/FlexibleContent'
import BlockWrapper from '../editor/BlockWrapper'
import EditorLayout from '../editor/EditorLayout'
import EditorPostTitle from '../editor/EditorPostTitle'
import Header from '../editor/blocks/Header'
import convertBlockSchemaToProps from '../editor/convertBlockSchemaToProps'

import { useStore } from 'store'
import { postActions } from 'actions'

const Editor = props => {
  const { postTypeID, postID } = props

  const [
    {
      postState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const postType = sites[siteID]?.postTypes?.[postTypeID]

  useEffect(() => {
    const loadPost = async () => {
      await postActions.getPost({ site: sites[siteID], postID }, dispatch)
    }

    loadPost()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
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
    <EditorLayout>
      <EditorPostTitle postType={postType} />

      <Page>
        {post && (
          <>
            {site?.settings?.header && (
              <BlockWrapper
                index={'header'}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'header' })}
                hideAddButtonTop
              >
                <Header {...convertBlockSchemaToProps([site.settings.header])[0].data} />
              </BlockWrapper>
            )}

            {post.content.length > 0 ? (
              <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
            ) : (
              <AddFirstBlock onClick={handleOpenBlockDialog} children={`Add Block`} />
            )}
          </>
        )}
      </Page>
    </EditorLayout>
  )
}

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;
  min-height: 360px;
  margin-bottom: 40px;
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
