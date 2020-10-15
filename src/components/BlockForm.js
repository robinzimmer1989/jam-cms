import React from 'react'
import { Button } from 'antd'

// import app components
import blocks from 'components/postBlocks'
import { useStore } from 'store'

const BlockForm = props => {
  const { index, onSelect } = props

  const [, dispatch] = useStore()

  const handleSelect = name => {
    onSelect(name, index)

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

export default BlockForm
