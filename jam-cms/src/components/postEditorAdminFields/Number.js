import React from 'react';
import { InputNumber } from 'antd';

const Number = (props) => {
  const { value, defaultValue, min, max, step = 1, onChange } = props;

  return <InputNumber min={min} max={max} step={step} defaultValue={value || defaultValue} onChange={onChange} />;
};

export default Number;
