import React from 'react'
import styled from 'styled-components'

// import app components
import Wysiwyg from 'components/Wysiwyg'
import Image from 'components/Image'
import Edges from 'components/Edges'

export const fields = {
  name: 'Banner',
  fields: [
    {
      id: 'image',
      type: 'image',
      placeholder: '',
      label: 'Add Image',
    },
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
    },
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      defaultValue: 'md',
      options: [
        {
          name: 'Small',
          value: 'sm',
        },
        {
          name: 'Medium',
          value: 'md',
        },
        {
          name: 'Large',
          value: 'lg',
        },
      ],
    },
    {
      id: 'width',
      type: 'select',
      label: 'Inner Width',
      defaultValue: 'md',
      options: [
        {
          name: 'None',
          value: 'none',
        },
        {
          name: 'Small',
          value: 'xs',
        },
        {
          name: 'Medium',
          value: 'md',
        },
        {
          name: 'Large',
          value: 'lg',
        },
      ],
    },
    {
      id: 'settings',
      type: 'settings',
    },
  ],
}

const Banner = props => {
  const { image, text, height, width } = props

  return (
    <Container className={`gcmsBanner gcmsBanner--height-${height}`} height={height}>
      {image && (
        <ImageContainer className={`gcmsBanner__imageContainer`} height={height}>
          <Image className={`gcmsBanner__image`} image={image} bg={true} />
        </ImageContainer>
      )}

      <ContentContainer className={`gcmsBanner__contentContainer`}>
        <Edges className={`gcmsBanner__edges gcmsBanner__edges--width-${width}`} size={width}>
          <Wysiwyg children={text} />
        </Edges>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: ${({ height }) =>
    height === 'sm' ? `300px` : height === 'md' ? `500px` : height === 'lg' ? `100vh` : `300px`};
`

const ImageContainer = styled.div`
  height: ${({ height }) =>
    height === 'sm' ? `300px` : height === 'md' ? `500px` : height === 'lg' ? `100vh` : `300px`};
`

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 1;
`

export default Banner
