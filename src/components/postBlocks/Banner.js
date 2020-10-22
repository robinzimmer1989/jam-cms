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
      label: 'Heigth',
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
      label: 'Width',
      defaultValue: 'md',
      options: [
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
        {
          name: 'Full',
          value: 'fl',
        },
      ],
    },
  ],
  style: {},
}

const Banner = props => {
  const { image, text, height, width } = props

  return (
    <Container className={`gcmsBanner gcmsBanner--height-${height}`} height={height}>
      <Edges className={`gcmsBanner__edges gcmsBanner__edges--width-${width}`} size={width}>
        <Inner className={`gcmsBanner__inner`}>
          {image && (
            <ImageContainer className={`gcmsBanner__imageContainer`} height={height}>
              <Image className={`gcmsBanner__image`} image={image} bg={true} />
            </ImageContainer>
          )}
          <ContentContainer className={`gcmsBanner__contentContainer`}>
            <Edges className={`gcmsBanner__edges gcmsBanner__edges--width-${width}`} size={'lg'}>
              <Wysiwyg children={text} />
            </Edges>
          </ContentContainer>
        </Inner>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  height: ${({ height }) =>
    height === 'sm' ? `300px` : height === 'md' ? `500px` : height === 'lg' ? `100vh` : `300px`};
`

const Inner = styled.div`
  position: relative;
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
