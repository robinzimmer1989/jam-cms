import React from 'react'
import { set } from 'lodash'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Space, Collapse } from 'antd'

// import app components
import formBlocks from '../formBlocks'
import Text from '../formEditorAdminFields/Text'

import { useStore } from '../../store'

const FormEditFields = () => {
  const [
    {
      editorState: { form, editorIndex },
    },
    dispatch,
  ] = useStore()

  // merges default settings and db values
  const getFields = () => {
    if (form && form.content[editorIndex]) {
      // loop through default formBlocks and replace value if found
      return formBlocks[form.content[editorIndex].name].fields.fields.map((o) => {
        const setting = form.content[editorIndex].fields.find((p) => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    }
  }

  const handleChange = (value, id, index) => {
    dispatch({ type: `CLOSE_DIALOG` })

    const nextForm = produce(form, (draft) => {
      return set(draft, `content.${editorIndex}.fields.${index}`, { id, value })
    })

    dispatch({
      type: `UPDATE_EDITOR_FORM`,
      payload: nextForm,
    })
  }

  const handleDeleteBlock = () => {
    const content = [...form.content]
    content.splice(editorIndex, 1)

    dispatch({
      type: `UPDATE_EDITOR_FORM`,
      payload: {
        ...form,
        content,
      },
    })

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null })
  }

  const getField = (field, fieldIndex) => {
    let component

    switch (field.type) {
      case 'text':
        component = <Text {...field} onChange={(e) => handleChange(e.target.value, field.id, fieldIndex)} />
        break

      default:
    }

    return (
      <Collapse.Panel header={field.label} direction="vertical" key={fieldIndex}>
        {component}
      </Collapse.Panel>
    )
  }

  const fields = getFields()

  return (
    <Space direction="vertical" size={30}>
      <Collapse defaultActiveKey={[0]}>
        {fields && fields.map((field, fieldIndex) => getField(field, fieldIndex))}
      </Collapse>

      <Container>
        <Button onClick={handleDeleteBlock} children={`Delete Field`} danger />
      </Container>
    </Space>
  )
}

const Container = styled.div`
  padding: 0 20px;
`

export default FormEditFields
