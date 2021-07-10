import React from 'react';

// import app components
import HTMLEditor from '../Jodit';

const Wysiwyg = (props: any) => {
  const { value, onChange } = props;

  const handleChange = (c: any) => onChange(c);

  return <HTMLEditor onChange={handleChange} defaultValue={value} />;
};

export default Wysiwyg;
