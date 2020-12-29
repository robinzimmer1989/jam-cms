import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Wysiwyg from '../Wysiwyg';

const TextImage = (props) => {
  const { text, image, alignment } = props;

  return (
    <Container>
      <ImageContainer alignment={alignment}>
        {image?.childImageSharp?.fluid && (
          <Img
            fluid={image.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={image.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </ImageContainer>

      <TextContainer alignment={alignment}>
        <Wysiwyg>{text}</Wysiwyg>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 30px 0;
`;

const TextContainer = styled.div`
  width: 100%;
  padding: ${({ alignment }) => (alignment === 'left' ? '30px 0 30px 30px' : '30px 30px 30px 0')};
  order: 2;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  order: ${({ alignment }) => (alignment === 'left' ? 1 : 3)};

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export default TextImage;
