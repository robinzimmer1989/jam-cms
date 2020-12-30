import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from './Edges';
import Wysiwyg from './Wysiwyg';
import Button from './Button';

const TextImage = (props) => {
  const { image, alignment, text, buttons } = props;

  return (
    <Container>
      <Edges size="md">
        <Inner>
          <ImageContainer alignment={alignment}>
            {image?.childImageSharp?.fluid && (
              <Img
                fluid={image.childImageSharp.fluid}
                imgStyle={{
                  objectFit: 'cover',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                alt={image.alt}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </ImageContainer>
          <TextContainer alignment={alignment}>
            <div>
              {text && <Wysiwyg children={text} />}

              {buttons && (
                <Buttons>
                  {buttons.map(
                    (o, i) =>
                      o.button &&
                      o.button.url &&
                      o.button.title && (
                        <Button
                          key={i}
                          color={o.color || 'primary'}
                          variant={o.variant || 'filled'}
                          {...o.button}
                        />
                      )
                  )}
                </Buttons>
              )}
            </div>
          </TextContainer>
        </Inner>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 0;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  order: 1;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    width: 50%;
    height: unset;
    order: ${({ alignment }) => (alignment === 'left' ? 1 : 3)};
    margin-bottom: 0;
  }

  .gatsby-image-wrapper {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const TextContainer = styled.div`
  order: 2;

  @media (min-width: 768px) {
    width: 50%;
    padding: ${({ alignment }) => (alignment === 'left' ? '50px 0 50px 50px' : '50px 50px 50px 0')};
    display: flex;
    align-items: center;
  }
`;

const Buttons = styled.div`
  margin-top: 2em;

  > a {
    margin-right: 20px;
  }
`;

export default {
  id: 'textimage',
  label: 'Text & Image',
  component: TextImage,
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Edit Image',
    },
    {
      id: 'alignment',
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
};
