import React from 'react'
import produce from 'immer'
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core'
import { set } from 'lodash'

// import app components
import AddImage from '../forms/AddImage'
import { useStore } from '../../store'
import { postServices } from '../../services'

const Layout = props => {
  const { children } = props

  const [
    {
      editorState: { post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const handleChange = (value, fieldIndex) => {
    const nextPost = produce(post, draft => set(draft, `content.${activeBlockIndex}.fields.${fieldIndex}.value`, value))

    dispatch({
      type: 'SET_EDITOR_POST',
      payload: nextPost,
    })
  }

  const handleSavePost = async () => {
    await postServices.updatePost(post, dispatch)
  }

  const renderFields = () => {
    return post.content[activeBlockIndex].fields.map((o, fieldIndex) => {
      switch (o.type) {
        case 'textarea':
          return (
            <TextField
              key={fieldIndex}
              label={o.label}
              value={o.value}
              placeholder={o.placeholder}
              onChange={e => handleChange(e.target.value, fieldIndex)}
            />
          )

        case 'image':
          return (
            <Button
              key={fieldIndex}
              children={o.label}
              onClick={() =>
                dispatch({
                  type: 'SET_DIALOG',
                  payload: {
                    open: true,
                    component: <AddImage blockIndex={activeBlockIndex} fieldIndex={fieldIndex} />,
                    width: 'xs',
                  },
                })
              }
            />
          )
        default:
      }
    })
  }

  return (
    <Container>
      <Sidebar>
        {post && post.content[activeBlockIndex] ? (
          <>
            {renderFields()}
            <Button
              children={`Close`}
              onClick={() =>
                dispatch({
                  type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX',
                  payload: null,
                })
              }
            />
          </>
        ) : (
          <>
            <Button children={`Save`} onClick={handleSavePost} />
          </>
        )}
      </Sidebar>

      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  padding-right: 250px;
`

const Sidebar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 250px;
  padding: 20px;
  background: #fff;
  overflow: auto;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`

export default Layout
