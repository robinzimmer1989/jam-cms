import React from 'react'
import { Button } from 'antd'

// import app components
import formBlocks from 'components/formBlocks'
import { useStore } from 'store'

const FormFieldsForm = props => {
  const { index } = props

  const [
    {
      editorState: { form },
    },
    dispatch,
  ] = useStore()

  const handleSelect = name => {
    const content = [...form.content]
    content.splice(index, 0, formBlocks[name].fields)

    dispatch({
      type: 'UPDATE_EDITOR_FORM',
      payload: {
        ...form,
        content,
      },
    })

    dispatch({ type: 'SET_EDITOR_INDEX', payload: index })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <>
      {Object.keys(formBlocks).map(key => (
        <Button key={key} children={key} onClick={() => handleSelect(key)} />
      ))}
    </>
  )
}

export default FormFieldsForm
