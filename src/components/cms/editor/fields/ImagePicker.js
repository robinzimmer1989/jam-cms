import React from 'react'
import { Button } from '@material-ui/core'

const ImagePicker = props => {
  const { label, onClick } = props

  return <Button children={label} onClick={onClick} />
}

export default ImagePicker
