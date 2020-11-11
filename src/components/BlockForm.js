import React from 'react'
import { Button } from 'antd'

// import app components
import { useStore } from '../store'

const BlockForm = (props) => {
  const { index, onSelect, blocks } = props

  const [, dispatch] = useStore()

  const handleSelect = (name) => {
    onSelect(name, index)

    dispatch({ type: 'SET_EDITOR_INDEX', payload: index })
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <>
      {blocks &&
        Object.keys(blocks)
          .filter((key) => key !== 'header' && key !== 'footer')
          .map((key) => <Button key={key} children={blocks[key].fields.label} onClick={() => handleSelect(key)} />)}
    </>
  )
}

export default BlockForm
