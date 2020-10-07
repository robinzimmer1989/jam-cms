import React from 'react'
import { Input } from 'antd'

const Textarea = props => {
  const { label, value, placeholder, rows = 1, onChange } = props

  return <Input value={value} placeholder={placeholder} onChange={onChange} rows={rows} />
}

export default Textarea
