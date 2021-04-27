import React from 'react';
import { GatsbyImage } from 'jam-cms';
import Parser from 'html-react-parser';

// import app components
import Button from '../button/Button';

const Hero = (props) => {
  const { image, headline, subline, buttons } = props;

  return (
    <div className="flex flex-col justify-between max-w-xl px-4 mx-auto lg:pt-16 lg:flex-row md:px-8 lg:max-w-screen-xl">
      <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
        <div className="max-w-xl mb-6">
          {headline && (
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              {Parser(headline)}
            </h2>
          )}

          {subline && <p className="text-base text-gray-700 md:text-lg">{Parser(subline)}</p>}
        </div>

        {buttons && buttons.length > 0 && (
          <div className="flex items-center">
            {buttons.map((o, i) => (
              <Button key={i} {...o.button} variant={o.variant} />
            ))}
          </div>
        )}
      </div>
      <div>
        {image ? (
          <GatsbyImage
            image={image}
            alt={image.altText}
            className="object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm"
          />
        ) : (
          <img
            src="https://kitwind.io/assets/kometa/two-thirds-phone.png"
            alt=""
            className="object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm"
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
