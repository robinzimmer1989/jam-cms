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
  color: #203041;
`;

export default {
  id: 'banner',
  label: 'Banner',
  component: Banner,
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
