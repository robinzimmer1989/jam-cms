import React from 'react'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'

export const fields = {
  name: 'Banner',
  fields: [
    {
      id: 'image',
      type: 'image',
      placeholder: '',
      label: 'Add Image',
      value: '',
    },
    {
      id: 'text',
      type: 'textarea',
      placeholder: 'Write something...',
      label: 'Headline',
      value: '',
      rows: 2,
      mutliline: true,
    },
  ],
  style: {},
}

const Banner = props => {
  const {
    image: { storageKey },
    text,
  } = props

  return (
    <Container>
      <Image storageKey={storageKey} bg={true} />
      {text && <Headline children={text} />}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 300px;
`

const Headline = styled.h1`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 1;
  text-align: center;
`

export default Banner
