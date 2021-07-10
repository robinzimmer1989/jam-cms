import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import Parser from 'html-react-parser';

// import app components
import Img from '../components/GatsbyImage';

export default function renderImage(image: any) {
  let el = null;

  if (image.type === 'image' && image.subtype === 'svg+xml') {
    el = <img className="jam-cms-svg" src={image.sourceUrl} />;
  } else if (image.type === 'image') {
    el = <Img image={image} objectFit="contain" alt={image.alt} />;
  } else if (image.type === 'application') {
    el = (
      <>
        <img src={image.icon} />
        <span>{image.title}</span>
      </>
    );
  }

  return <File>{el}</File>;
}

const File = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .jam-cms-svg {
    max-height: 100%;
    max-width: 100%;
  }

  .gatsby-image-wrapper {
    max-height: 100%;
    max-width: 100%;
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
  }
`;
