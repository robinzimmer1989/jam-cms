import React from 'react';

// import app components
import HTMLEditor from '../Jodit';

export interface IWysiwyg {
  value: string;
  onChange: Function;
}

const Wysiwyg = (props: IWysiwyg) => {
  const { value, onChange } = props;

  const handleChange = (c: any) => onChange(c);

  return <HTMLEditor onChange={handleChange} defaultValue={value} />;
};

export default Wysiwyg;
