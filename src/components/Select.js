import React from 'react'
import Caption from 'components/Caption'
import { Select as AntSelect, Space } from 'antd'

const Select = props => {
  const { value, name, onChange, children, label } = props

  console.log(children)

  return (
    <Space direction="vertical" size={2}>
      {label && <Caption children={label} />}
      <AntSelect value={value} onChange={onChange} name={name} children={children} />
    </Space>
  )
}

export default Select
