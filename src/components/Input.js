import React from 'react'
import Caption from 'components/Caption'
import { Input as AntInput, Space } from 'antd'

const Input = props => {
  const { value, name, type, onChange, placeholder, rows, label } = props

  return (
    <Space direction="vertical" size={2}>
      {label && <Caption children={label} />}

      {!!rows ? (
        <AntInput.TextArea
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <AntInput value={value} name={name} type={type} onChange={onChange} placeholder={placeholder} />
      )}
    </Space>
  )
}

export default Input
