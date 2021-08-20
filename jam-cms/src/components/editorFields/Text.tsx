import React from 'react';

// import app components
import Input from '../Input';

export interface IText {
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: Function;
}

const Text = (props: IText) => {
  const { value = '', placeholder, rows = 1, onChange } = props;

  return <Input value={value} placeholder={placeholder} onChange={onChange} rows={rows} />;
};

export default Text;
