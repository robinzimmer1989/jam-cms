import React from 'react';
import ReactEmbed from 'react-embed';

const Embed = (props) => {
  const { url } = props;

  return (
    <div className="py-8">{url && typeof window !== 'undefined' && <ReactEmbed url={url} />}</div>
  );
};

export default Embed;
