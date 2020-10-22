import React from 'react'
import { Collapse, Button, Space } from 'antd'
import produce from 'immer'

// import app components
import { getField } from 'components/BlockEditFields'

const Repeater = props => {
  const { site, items, value: values = [], onChange, dispatch } = props

  const handleAdd = index => {
    const newValues = produce(values, draft => {
      draft.push(items.reduce((ac, a) => ({ ...ac, [a.id]: a.defaultValue || '' }), {}))
      return draft
    })

    onChange(newValues)
  }

  const handleRemove = index => {
    const newValues = produce(values, draft => {
      draft.splice(index, 1)
      return draft
    })

    onChange(newValues)
  }

  const handleChange = (item, index) => {
    const newValues = produce(values, draft => {
      draft[index][item.id] = item.value
      return draft
    })

    onChange(newValues)
  }

  return (
    <>
      {values &&
        values.map((value, index) => {
          return (
            <Collapse key={index}>
              <Collapse.Panel header={`Item ${index + 1}`}>
                <Space direction="vertical">
                  {items &&
                    items.map((field, subIndex) => {
                      return (
                        <div key={subIndex}>
                          {getField({
                            field: { ...field, value: value[field.id] },
                            index,
                            site,
                            onChangeElement: value => handleChange(value, index),
                            dispatch,
                          })}
                        </div>
                      )
                    })}

                  <Button size="small" danger children={`Remove`} onClick={() => handleRemove(index)} />
                </Space>
              </Collapse.Panel>
            </Collapse>
          )
        })}

      <Button onClick={() => handleAdd(items.length)}>Add</Button>
    </>
  )
}

export default Repeater
