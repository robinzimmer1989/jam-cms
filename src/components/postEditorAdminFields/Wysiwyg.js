import React from 'react'

// import app components
import Input from 'components/Input'

const Wysiwyg = props => {
  const { value = '', placeholder, rows = 1, onChange } = props

  return <Input value={value} placeholder={placeholder} onChange={onChange} rows={rows} />
}

export default Wysiwyg
