import React, { useMemo } from 'react';
import { GatsbyImage as Image, getImage } from 'gatsby-plugin-image';
import Parser from 'html-react-parser';

const GatsbyImage = (props: any) => {
  const { image, alt = '', objectFit, imgStyle, ...rest } = props;

  if (image?.svg) {
    return <>{Parser(image.svg)}</>;
  }

  const id =
    image?.id ||
    image?.sourceUrl ||
    image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

  const component = useMemo(() => {
    if (image?.localFile) {
      return (
        <Image
          {...rest}
          objectFit={objectFit}
          imgStyle={imgStyle}
          image={getImage(image.localFile)}
          alt={alt}
        />
      );
    } else if (image?.sourceUrl) {
      return (
        <Image
          {...rest}
          objectFit={objectFit}
          imgStyle={imgStyle}
          image={{
            height: image?.height,
            width: image?.width,
            images: {
              fallback: {
                sizes: image?.sizes || '',
                srcSet: image?.srcSet || '',
                src: image.sourceUrl,
              },
              sources: [
                {
                  sizes: image?.sizes || '',
                  srcSet: image?.srcSet || '',
                  type: image?.mediaType || 'image',
                },
              ],
            },
            layout: 'constrained',
            placeholder: { fallback: '' },
          }}
          alt={alt}
        />
      );
    } else {
      return null;
    }
  }, [id, objectFit, imgStyle]);

  return component;
};

export default GatsbyImage;
