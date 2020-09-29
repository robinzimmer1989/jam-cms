import React, { useEffect } from 'react'
import styled from 'styled-components'

// import app components
import AddBlock from '../forms/AddBlock'
import FlexibleContent from './FlexibleContent'
import Sidebar from './Sidebar'
import convertBlockSchemaToProps from './convertBlockSchemaToProps'
import { useStore } from '../../store'
import { postActions } from '../../actions'

const Editor = props => {
  const { postID } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

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
    <Sidebar>
      {post && (
        <>
          {post.content.length > 0 ? (
            <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
          ) : (
            <AddFirstBlock onClick={handleOpenBlockDialog} children={`Add Block`} />
          )}
        </>
      )}
    </Sidebar>
  )
}

const AddFirstBlock = styled.div`
  height: 300px;
  width: calc(100% - 40px);
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dotted #ccc;
  cursor: pointer;
`

export default Editor
