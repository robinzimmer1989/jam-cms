import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

// import app components
import { useStore } from '../../store'
import getBlock from '../editor/getBlock'

const AddBlock = props => {
  const { index } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const handleBlockSelect = blockName => {
    const blocks = [...post.content]
    blocks.splice(index, 0, getBlock(blockName))

    dispatch({
      type: 'SET_EDITOR_POST',
      payload: {
        ...post,
        content: blocks,
      },
    })

    dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: index })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Container>
      <Button children={`Textarea`} onClick={() => handleBlockSelect('Text')} />
      <Button children={`Banner`} onClick={() => handleBlockSelect('Banner')} />
    </Container>
  )
}

const Container = styled.div``

export default AddBlock
