import React from 'react';
import { Radio as AntRadio } from 'antd';

export interface IRadioOption {
  name: string;
  value: string | number;
}

export interface IRadio {
  value: string;
  defaultValue?: string;
  options: IRadioOption[];
  onChange: Function;
}

const Radio = (props: IRadio) => {
  const { value = '', options, defaultValue, onChange } = props;

  let checkedValue = value;

  if (typeof value !== 'string') {
    console.warn('Radio value must be a string');
    checkedValue = '';
  }

  let checkedDefaultValue = defaultValue;

  if (typeof defaultValue !== 'string') {
    console.warn('Radio default value must be a string');
    checkedDefaultValue = '';
  }

  const handleChange = (e: any) => {
    const {
      target: { value },
    } = e;

    onChange(value);
  };

  return (
    <AntRadio.Group onChange={handleChange} value={checkedValue || checkedDefaultValue}>
      {options &&
        options.map((o: any) => <AntRadio key={o.value} value={o.value} children={o.name} />)}
    </AntRadio.Group>
  );
};

export default Radio;
