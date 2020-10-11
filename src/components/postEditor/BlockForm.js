import React from 'react'
import { Button } from 'antd'

// import app components
import blocks from 'components/postBlocks'
import { useStore } from 'store'

const AddBlock = props => {
  const { index } = props

  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  const handleSelect = name => {
    const content = [...post.content]
    content.splice(index, 0, blocks[name].fields)

    dispatch({
      type: 'UPDATE_EDITOR_POST',
      payload: {
        ...post,
        content,
      },
    })

    dispatch({ type: 'SET_EDITOR_INDEX', payload: index })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <>
      {Object.keys(blocks)
        .filter(key => key !== 'Header' && key !== 'Footer')
        .map(key => (
          <Button key={key} children={key} onClick={() => handleSelect(key)} />
        ))}
    </>
  )
}

export default AddBlock
