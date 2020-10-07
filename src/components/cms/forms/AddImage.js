import React from 'react'
import styled from 'styled-components'

// import app components
import MediaLibrary from '../media/MediaLibrary'

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
