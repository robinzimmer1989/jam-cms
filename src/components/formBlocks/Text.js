import React from 'react'
import { Input } from 'antd'

export const fields = {
  name: 'Text',
  fields: [
    {
      id: 'label',
      type: 'text',
      label: 'Label',
      value: 'Title',
    },
    {
      id: 'placeholder',
      type: 'text',
      label: 'Placeholder',
      value: '',
    },
    {
      id: 'defaultValue',
      type: 'text',
      label: 'Default Value',
      value: '',
    },
  ],
  style: {},
}

const Text = props => {
  const { index, placeholder, label, required, defaultValue } = props

  return (
    <div>
      <label htmlFor={`form-field-${index}`} children={label} />
      <input
        style={{ width: '100%' }}
        id={`form-field-${index}`}
        placeholder={placeholder}
        value={defaultValue}
        readOnly
      />
    </div>
  )
}

export default Text
