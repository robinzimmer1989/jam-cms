import React from 'react'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'
import Edges from 'components/Edges'
import Button from './Button'

export const fields = {
  name: 'Boxes',
  label: 'Boxes',
  fields: [
    {
      id: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      id: 'boxes',
      type: 'repeater',
      label: 'Boxes',
      items: [
        {
          id: 'image',
          type: 'image',
          label: 'Add Image',
        },
        {
          id: 'imageAlignment',
          type: 'select',
          label: 'Image Alignment',
          defaultValue: 'top',
          options: [
            {
              name: 'Top',
              value: 'top',
            },
            {
              name: 'Left',
              value: 'left',
            },
          ],
        },
        {
          id: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          rows: 3,
        },
        {
          id: 'button',
          type: 'link',
          label: 'Button',
        },
      ],
    },
  ],
}

const Boxes = props => {
  const { title, boxes } = props

  return (
    <Container className={`gcmsBoxes`}>
      <Edges className={`gcmsBoxes__edges`} size="md">
        <Inner className={`gcmsBoxes__inner`}>
          {boxes &&
            boxes.map((box, index) => {
              return (
                <Box key={index}>
                  {box.image && (
                    <ImageContainer className={`gcmsBoxes__imageContainer`}>
                      <Image className={`gcmsBoxes__image`} image={box.image} bg={true} />
                    </ImageContainer>
                  )}

                  {box.title && <h3 children={box.title} />}
                  {box.text && <p children={box.text} />}
                  {box.button && box.button.url && box.button.title && (
                    <Button
                      className={`gcmsBoxes__button`}
                      {...box.button}
                      color={box.color || 'primary'}
                      variant={box.variant || 'filled'}
                    />
                  )}
                </Box>
              )
            })}
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

const Box = styled.div``

export default Boxes
