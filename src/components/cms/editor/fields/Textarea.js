import React from 'react'

// import app components
import Input from 'components/Input'

const Textarea = props => {
  const { label, value, placeholder, rows = 1, onChange } = props

  return <Input label={label} value={value} placeholder={placeholder} onChange={onChange} rows={rows} />
}

export default Textarea
