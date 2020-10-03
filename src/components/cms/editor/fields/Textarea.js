import React from 'react'
import { TextField } from '@material-ui/core'

const Textarea = props => {
  const { label, value, placeholder, rows = 1, onChange } = props

  return (
    <TextField
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      variant="outlined"
      multiline={rows > 1}
      rows={rows}
      fullWidth
    />
  )
}

export default Textarea
