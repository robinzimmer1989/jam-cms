import React from 'react'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'
import Edges from 'components/Edges'
import Wysiwyg from 'components/Wysiwyg'
import Button from './Button'

export const fields = {
  name: 'TextImage',
  label: 'Text & Image',
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Add Image',
    },
    {
      id: 'imageAlignment',
      type: 'select',
      label: 'Image Alignment',
      defaultValue: 'left',
      options: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
    },
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
    },
    {
      id: 'buttons',
      type: 'repeater',
      label: 'Buttons',
      items: [
        {
          id: 'button',
          type: 'link',
          label: 'Button',
        },
        {
          id: 'color',
          type: 'select',
          label: 'Color',
          defaultValue: 'primary',
          options: [
            {
              name: 'Primary',
              value: 'primary',
            },
            {
              name: 'Secondary',
              value: 'secondary',
            },
          ],
        },
        {
          id: 'variant',
          type: 'select',
          label: 'Variant',
          defaultValue: 'filled',
          options: [
            {
              name: 'Filled',
              value: 'filled',
            },
            {
              name: 'Outlined',
              value: 'outlined',
            },
          ],
        },
      ],
    },
  ],
  style: {},
}

const TextImage = props => {
  const { image, imageAlignment, text, buttons } = props

  return (
    <Container className={`gcmsTextImage`}>
      <Edges className={`gcmsTextImage__edges`} size="md">
        <Inner className={`gcmsTextImage__inner`}>
          <ImageContainer className={`gcmsTextImage__imageContainer`} imageAlignment={imageAlignment}>
            <Image className={`gcmsTextImage__image`} image={image} bg={true} />
          </ImageContainer>
          <ContentContainer className={`gcmsTextImage__contentContainer`} imageAlignment={imageAlignment}>
            <div className={`gcmsTextImage__contentInner`}>
              {text && <Wysiwyg children={text} />}

              {buttons && (
                <Buttons className={`gcmsTextImage__buttonsContainer`}>
                  {buttons.map(
                    (o, i) =>
                      o.button &&
                      o.button.url &&
                      o.button.title && (
                        <Button
                          key={i}
                          className={`gcmsTextImage__button`}
                          {...o.button}
                          color={o.color || 'primary'}
                          variant={o.variant || 'filled'}
                        />
                      )
                  )}
                </Buttons>
              )}
            </div>
          </ContentContainer>
        </Inner>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  min-height: 300px;
`

const Inner = styled.div`
  position: relative;
  display: flex;
`

const ImageContainer = styled.div`
  width: 50%;
  order: ${({ imageAlignment }) => (imageAlignment === 'left' ? 1 : 3)};
`

const ContentContainer = styled.div`
  width: 50%;
  padding: ${({ imageAlignment }) => (imageAlignment === 'left' ? '30px 0 30px 30px' : '30px 30px 30px 0')};
  display: flex;
  align-items: center;
  order: 2;
`

const Buttons = styled.div`
  margin-top: 2em;

  > a {
    margin-right: 20px;
  }
`

export default TextImage
