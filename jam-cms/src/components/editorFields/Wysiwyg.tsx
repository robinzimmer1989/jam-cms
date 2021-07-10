import React from 'react';

// import app components
import HTMLEditor from '../Jodit';

const Wysiwyg = (props) => {
  const { value, onChange } = props;

  const handleChange = (c) => onChange(c);

  return <HTMLEditor onChange={handleChange} defaultValue={value} />;
};

export default Wysiwyg;
