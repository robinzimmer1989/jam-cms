import React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import MediaLibrary from '../MediaLibrary'
import { useStore } from '../../store'

const AddImage = props => {
  const { blockIndex, fieldIndex } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const handleSelect = image => {
    const nextPost = produce(post, draft =>
      set(draft, `content.${blockIndex}.fields.${fieldIndex}.value`, { id: image.id, storageKey: image.storageKey })
    )

    dispatch({
      type: 'SET_EDITOR_POST',
      payload: nextPost,
    })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Container>
      <MediaLibrary onSelect={handleSelect} />
    </Container>
  )
}

const Container = styled.div``

export default AddImage
