import React from 'react';
import { GatsbyImage, RichText } from 'jam-cms';
import Parser from 'html-react-parser';

// import app components
import Button from '../button/Button';

const TextImage = (props) => {
  const { image, alignment, size, text, buttons } = props;

  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
      <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center order-2">
          <div className="max-w-xl mb-6">
            {text && (
              <div className="prose mb-8">
                <RichText>{text}</RichText>
              </div>
            )}
            <div className="mb-10 md:mb-16 lg:mb-20">
              {buttons && buttons.length > 0 && (
                <div className="flex items-center">
                  {buttons.map((o, i) => (
                    <Button key={i} {...o.button} variant={o.variant} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`order-${alignment === 'left' ? 1 : 2}`}>
          {image && (
            <GatsbyImage
              imgStyle={{ objectFit: size }}
              image={image}
              alt={image.altText}
              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextImage;
