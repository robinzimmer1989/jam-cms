import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import Parser from 'html-react-parser';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/GatsbyImage' was resolved to... Remove this comment to see the full error message
import Img from '../components/GatsbyImage';

export default function renderImage(image: any) {
  let el = null;

  if (image.type === 'image' && image.subtype === 'svg+xml') {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    el = <img className="jam-cms-svg" src={image.sourceUrl} />;
  } else if (image.type === 'image') {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    el = <Img image={image} objectFit="contain" alt={image.alt} />;
  } else if (image.type === 'application') {
    el = (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <img src={image.icon} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <span>{image.title}</span>
      </>
    );
  }

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
