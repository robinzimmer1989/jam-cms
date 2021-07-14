import React from 'react';
import { InputNumber } from 'antd';

const Number = (props: any) => {
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
