import React from 'react';
import { RichText } from 'jam-cms';

const Text = (props) => {
  const { text } = props;

  return (
    <div className="prose">
      <RichText>{text}</RichText>
    </div>
  );
};

export default Text;
