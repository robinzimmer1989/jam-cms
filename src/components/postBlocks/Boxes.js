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
      id: 'columns',
      type: 'number',
      label: 'Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: 'boxes',
      type: 'repeater',
      label: 'Boxes',
      defaultValue: [],
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
    {
      id: 'settings',
      type: 'settings',
    },
  ],
}

const Boxes = props => {
  const { title, columns, boxes } = props

  return (
    <Container className={`gcmsBoxes`}>
      <Edges className={`gcmsBoxes__edges`} size="md">
        {title && <h3 className={`gcmsBoxes__title`} children={title} />}

        <BoxesContainer className={`gcmsBoxes__inner`}>
          {boxes &&
            boxes.map((box, index) => {
              return (
                <Box key={index} className={`gcmsBoxes__box`} columns={columns}>
                  {box.image && (
                    <ImageContainer className={`gcmsBoxes__boxImageContainer`}>
                      <Image className={`gcmsBoxes__boxImage`} image={box.image} bg={true} />
                    </ImageContainer>
                  )}

                  {box.title && <h4 className={`gcmsBoxes__boxTitle`} children={box.title} />}
                  {box.text && <p className={`gcmsBoxes__boxParagraph`} children={box.text} />}
                  {box.button && box.button.url && box.button.title && (
                    <Button
                      className={`gcmsBoxes__boxButton`}
                      {...box.button}
                      color={box.color || 'primary'}
                      variant={box.variant || 'filled'}
                    />
                  )}
                </Box>
              )
            })}

          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
        </BoxesContainer>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  min-height: 300px;
`

const BoxesContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 12px;
`

const Box = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    ${({ columns }) =>
      columns > 1 &&
      `
      width: calc(50% - 10px);
    `}
  }

  @media (min-width: 900px) {
    ${({ columns }) =>
      columns > 2 &&
      `
      width: calc(100% / 3 - 10px);
    `}
  }

  @media (min-width: 1200px) {
    ${({ columns }) =>
      columns > 3 &&
      `
      width: calc(100% / 4 - 10px);
    `}
  }
`

export default Boxes
