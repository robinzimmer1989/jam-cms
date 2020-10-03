import React from 'react'
import styled from 'styled-components'
import MuiSkeleton from '@material-ui/lab/Skeleton'

const Skeleton = props => {
  const { done, variant = 'text', width = `100%`, height = 40, children } = props

  return (
    <>{done ? <>{children}</> : <MuiSkeleton variant={variant} width={width} height={height} animation="wave" />}</>
  )
}

export default Skeleton
