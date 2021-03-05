import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from '../Edges';
import Button from '../Button';
import { colors } from '../../theme';

const Banner = (props) => {
  const { image, headline, subline, buttons, height } = props;

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
        <Edges size="md">
          {headline && <h1 children={headline} />}
          {subline && <h3 children={subline} />}

          {buttons && buttons.length > 0 && (
            <Buttons>
              {buttons.map((o, i) => (
                <Button key={i} {...o.button} variant={o.variant} />
              ))}
            </Buttons>
          )}
        </Edges>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: ${({ height }) => (height === 'small' ? '250px' : '500px')};
  background: ${colors.secondary};
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
  padding: 40px 0;

  h1 {
    text-align: center;
    margin-bottom: 10px;
    color: ${colors.primary};

    @media (min-width: 768px) {
      font-size: 50px;
    }
  }

  h3 {
    text-align: center;
    color: ${colors.primary};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;

  a {
    margin: 10px;
  }
`;

export default Banner;
