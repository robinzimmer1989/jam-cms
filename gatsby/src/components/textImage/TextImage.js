import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'jam-cms';

// import app components
import Edges from '../Edges';
import Wysiwyg from '../Wysiwyg';
import Button from '../button/Button';

const TextImage = (props) => {
  const { image, alignment, text, buttons } = props;

  return (
    <Container>
      <Edges size="md">
        <Inner>
          <ImageContainer alignment={alignment}>
            {image && <GatsbyImage image={image} alt={image.altText} objectFit="contain" />}
          </ImageContainer>
          <TextContainer alignment={alignment}>
            <div>
              {text && <Wysiwyg children={text} />}

              {buttons && (
                <Buttons>
                  {buttons.map(
                    ({ button, variant }, i) =>
                      button.url && button.title && <Button key={i} variant={variant} {...button} />
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
  box-shadow: 0px 4px 8px 0px rgba(4, 73, 89, 0.05);
  background: #fff;

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

export default TextImage;
