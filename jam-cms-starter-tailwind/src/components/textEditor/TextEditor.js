import React from 'react';

// import app components
import Text from './Text';
import TextImage from './TextImage';
import Gallery from './Gallery';
import Embed from './Embed';
import Quote from './Quote';

const TextEditor = (props) => {
  const { flex } = props;

  const getFlexElement = (block) => {
    const id = block?.id || block?.fieldGroupName?.split('_').pop().toLowerCase();

    const layouts = {
      text: <Text {...block} />,
      textimage: <TextImage {...block} />,
      gallery: <Gallery {...block} />,
      embed: <Embed {...block} />,
      quote: <Quote {...block} />,
    };

    return layouts[id];
  };

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-sm">
      {flex && flex.map((block, i) => <div key={i}>{getFlexElement(block)}</div>)}
    </div>
  );
};

export default TextEditor;
