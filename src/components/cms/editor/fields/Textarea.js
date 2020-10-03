import React from 'react'
import { TextField } from '@material-ui/core'

const Textarea = props => {
  const { label, value, placeholder, onChange } = props

  return <TextField label={label} value={value} placeholder={placeholder} onChange={onChange} variant="filled" fullWidth />
}

export default Textarea
