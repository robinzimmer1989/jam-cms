import React, { useMemo } from 'react';
import { GatsbyImage as Image, getImage } from 'gatsby-plugin-image';

const GatsbyImage = (props) => {
  const { image, alt = '', ...rest } = props;

  // useMemo prevents the element from re-rendering when dealing with SVG images
  // TODO: There might be a better solution for this in the future
  const component = useMemo(() => {
    let imageObject = image?.localFile && getImage(image.localFile);

    if (!imageObject && image?.sourceUrl) {
      imageObject = {
        height: image?.height || 0,
        width: image?.width || 0,
        images: {
          fallback: {
            sizes: image?.sizes || '',
            srcSet: image?.srcSet || '',
            src: image?.sourceUrl,
          },
          sources: [
            {
              sizes: image?.sizes || '',
              srcSet: image?.srcSet || '',
              type: image?.mediaType || '',
            },
          ],
        },
        layout: 'constrained',
        placeholder: { fallback: '' },
      };
    }
    return imageObject ? <Image {...rest} image={imageObject} alt={alt} /> : null;
  }, [props]);

  return component;
};

export default GatsbyImage;
