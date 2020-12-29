import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from './Edges';
import Wysiwyg from './Wysiwyg';

const Banner = (props) => {
  const { image, text, height } = props;

  return (
    <Container height={height}>
      <ImageContainer>
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

      <ContentContainer>
        <Edges size={'md'}>
          <Wysiwyg children={text} />
        </Edges>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: ${({ height }) => (height === 'small' ? '200px' : '350px')};

  background-image: linear-gradient(
    109.6deg,
    rgba(238, 58, 136, 1) 11.2%,
    rgba(128, 162, 245, 1) 91.1%
  );
`;

const ImageContainer = styled.div`
  height: 100%;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 1;
  color: #fff;
`;

export default {
  id: 'banner',
  label: 'Banner',
  component: Banner,
  category: 'default',
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Image',
    },
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Headline',
    },
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      defaultValue: 'small',
      options: [
        {
          name: 'Small',
          value: 'small',
        },
        {
          name: 'Big',
          value: 'big',
        },
      ],
    },
  ],
};
