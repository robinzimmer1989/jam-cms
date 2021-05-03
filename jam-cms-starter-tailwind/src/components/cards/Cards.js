import React from 'react';
import { RichText } from 'jam-cms';

// import app components
import Button from '../button/Button';

const Cards = (props) => {
  const { introduction, columns, items } = props;

  return (
    <div className="bg-background">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {introduction && (
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className="prose lg:prose-xl">
              <RichText>{introduction}</RichText>
            </div>
          </div>
        )}
        <div
          className={`grid gap-4 row-gap-5 sm:grid-cols-${
            columns > 1 ? 2 : 1
          } lg:grid-cols-${columns}`}
        >
          {items &&
            items.map((o, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between p-5 border rounded shadow-sm bg-white"
                >
                  <div className="mr-4">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary">
                      <svg
                        className="w-10 h-10 text-primary-contrast"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    {o.headline && (
                      <h6 className="mb-3 text-xl font-bold leading-5">{o.headline}</h6>
                    )}
                    {o.text && <p className="mb-3 text-sm text-gray-900">{o.text}</p>}
                    {o.link && <Button {...o.link} variant="text" />}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
