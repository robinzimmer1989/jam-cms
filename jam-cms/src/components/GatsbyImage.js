import React from 'react';
import { GatsbyImage as Image, getImage } from 'gatsby-plugin-image';

const GatsbyImage = (props) => {
  const { image, alt = '', ...rest } = props;

  let imageObject = image?.localFile && getImage(image.localFile);

  if (!imageObject && image?.sourceUrl) {
    imageObject = {
      height: image?.height,
      width: image?.width,
      images: {
        fallback: {
          sizes: image?.sizes,
          srcSet: image?.srcSet,
          src: image?.sourceUrl,
        },
        sources: [
          {
            sizes: image?.sizes,
            srcSet: image?.srcSet,
            type: image?.mediaType,
          },
        ],
      },
      layout: 'constrained',
      placeholder: { fallback: '' },
    };
  }

  return imageObject ? <Image {...rest} image={imageObject} alt={alt} /> : null;
};

export default GatsbyImage;
