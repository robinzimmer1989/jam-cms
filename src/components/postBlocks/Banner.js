import React from 'react'
import styled from 'styled-components'

// import app components
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
      id: 'title',
      type: 'wysiwyg',
      placeholder: 'Write something...',
      label: 'Headline',
      rows: 2,
    },
    {
      id: 'height',
      type: 'select',
      label: 'Heigth',
      defaultValue: 'medium',
      options: [
        {
          name: 'Small',
          value: 'small',
        },
        {
          name: 'Medium',
          value: 'medium',
        },
        {
          name: 'Large',
          value: 'large',
        },
      ],
    },
    {
      id: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: 'medium',
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
  const { image, title, height, width } = props

  return (
    <Container className={`gcmsBanner gcmsBanner--height-${height}`} height={height}>
      <Edges className={`gcmsBanner__edges gcmsBanner__edges--width-${width}`} size={width}>
        <Inner className={`gcmsBanner__inner`}>
          {image && (
            <ImageContainer className={`gcmsBanner__imageContainer`}>
              <Image className={`gcmsBanner__image`} image={image} bg={true} />
            </ImageContainer>
          )}
          <ContentContainer className={`gcmsBanner__contentContainer`}>
            {title && <Headline className={`gcmsBanner__headline`} children={title} />}
          </ContentContainer>
        </Inner>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  min-height: ${({ height }) =>
    height === 'sm' ? `300px` : height === 'md' ? `500px` : height === 'lg' ? `100vh` : `300px`};
`

const Inner = styled.div`
  position: relative;
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

const ImageContainer = styled.div``

const ContentContainer = styled.div``

export default Banner
