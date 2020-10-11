import React from 'react'

// import app components
import Input from 'components/Input'

const Text = props => {
  const { value, placeholder, onChange } = props

  return <Input value={value} placeholder={placeholder} onChange={onChange} />
}

export default Text
