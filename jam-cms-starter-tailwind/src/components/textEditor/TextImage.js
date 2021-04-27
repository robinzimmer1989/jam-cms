import React from 'react';
import { RichText, GatsbyImage } from 'jam-cms';

const TextImage = (props) => {
  const { text, image, alignment } = props;

  return (
    <div className="py-8">
      <div
        className={'grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2'}
      >
        <div className={`order-${alignment === 'left' ? 1 : 3}`}>
          {image && (
            <GatsbyImage
              image={image}
              alt={image.altText}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
        <div className="order-2">
          {text && (
            <div className="prose">
              <RichText>{text}</RichText>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextImage;
