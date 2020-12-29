import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from './Edges';
import Button from './Button';
import Wysiwyg from './Wysiwyg';

const Boxes = (props) => {
  const { introduction, columns, boxes } = props;

  return (
    <Container>
      <Edges size="md">
        {introduction && (
          <IntroductionContainer>
            <Wysiwyg children={introduction} />
          </IntroductionContainer>
        )}

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
                          objectFit: 'contain',
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

                  {box.text && <Wysiwyg children={box.text} />}

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

          <Box columns={columns} style={{ height: 0, opacity: 0, padding: 0, margin: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, padding: 0, margin: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, padding: 0, margin: 0 }} />
        </BoxesContainer>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  min-height: 300px;
  padding: 40px 0 60px;
`;

const IntroductionContainer = styled.div`
  margin-bottom: 40px;
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
  margin-bottom: 30px;
`;

const Box = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 30px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(4, 73, 89, 0.05);

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
      id: 'introduction',
      type: 'wysiwyg',
      label: 'Introduction',
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
          id: 'text',
          type: 'wysiwyg',
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
