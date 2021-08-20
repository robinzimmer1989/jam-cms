import React from 'react';
import { InputNumber } from 'antd';

export interface INumber {
  value: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: () => void;
}

const Number = (props: INumber) => {
  const { value, defaultValue, min, max, step = 1, onChange } = props;

  return (
    <InputNumber
      min={min}
      max={max}
      step={step}
      defaultValue={value || defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

export default Number;
