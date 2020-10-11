import React from 'react'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'

export const fields = {
  name: 'TextImage',
  label: 'Text & Image',
  fields: [
    {
      id: 'image',
      type: 'image',
      placeholder: '',
      label: 'Add Image',
      value: '',
    },
    {
      id: 'title',
      type: 'textarea',
      placeholder: 'Write something...',
      label: 'Title',
      value: '',
      rows: 1,
    },
    {
      id: 'text',
      type: 'textarea',
      placeholder: 'Write something...',
      label: 'Text',
      value: '',
      rows: 8,
    },
    {
      id: 'button',
      type: 'button',
      placeholder: '',
      label: 'Button',
      value: '',
    },
  ],
  style: {},
}

const TextImage = props => {
  const {
    image: { storageKey },
    title,
    text,
    button,
  } = props

  return (
    <Container>
      <ImageContainer>
        <Image storageKey={storageKey} bg={true} />
      </ImageContainer>
      <ContentContainer>
        <div>
          {title && <h2 children={title} />}
          {text && <p children={text} />}
          {button && <button children={button} />}
        </div>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  min-height: 300px;
`

const ImageContainer = styled.div`
  width: 50%;
`

const ContentContainer = styled.div`
  width: 50%;
  padding: 30px;
  display: flex;
  align-items: center;
`

export default TextImage
