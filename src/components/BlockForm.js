import React from 'react'
import { Button } from 'antd'

// import app components
import blocks from './blocks'

import { useStore } from 'store'

const AddBlock = props => {
  const { index } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const handleBlockSelect = blockName => {
    const content = [...post.content]
    content.splice(index, 0, blocks[blockName].fields)

    dispatch({
      type: 'SET_EDITOR_POST',
      payload: {
        ...post,
        content: content,
      },
    })

    dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: index })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <>
      {Object.keys(blocks)
        .filter(key => key !== 'Header' && key !== 'Footer')
        .map(key => (
          <Button key={key} children={key} onClick={() => handleBlockSelect(key)} />
        ))}
    </>
  )
}

export default AddBlock
