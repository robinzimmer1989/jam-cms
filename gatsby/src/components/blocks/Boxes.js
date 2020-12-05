import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from '../Edges';
import Button from '../Button';

const Boxes = (props) => {
  const { title, columns, boxes } = props;

  return (
    <Container>
      <Edges size="md">
        {title && <h3 children={title} />}

        <BoxesContainer>
          {boxes &&
            boxes.map((box, index) => {
              return (
                <Box key={index} columns={columns}>
                  <ImageContainer>
                    {box.image?.childImageSharp?.fluid && (
                      <Img
                        fluid={box.image.childImageSharp.fluid}
                        imgStyle={{
                          objectFit: 'cover',
                          maxWidth: box.image.width,
                          maxHeight: box.image.height,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        alt={box.image.alt}
                        style={{ width: '100%', height: '100%' }}
                      />
                    )}
                  </ImageContainer>

                  {box.title && <h4 children={box.title} />}
                  {box.text && <p children={box.text} />}
                  {box.button && box.button.url && box.button.title && (
                    <Button
                      {...box.button}
                      color={box.color || 'primary'}
                      variant={box.variant || 'filled'}
                    />
                  )}
                </Box>
              );
            })}

          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
        </BoxesContainer>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  min-height: 300px;
`;

const BoxesContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 12px;
`;

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
`;

export default {
  id: 'boxes',
  label: 'Boxes',
  component: Boxes,
  category: 'default',
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
};
