import React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import MediaLibrary from '../MediaLibrary'

const AddImage = props => {
  const { onSelect } = props

  return (
    <Container>
      <MediaLibrary onSelect={onSelect} />
    </Container>
  )
}

const Container = styled.div``

export default AddImage
