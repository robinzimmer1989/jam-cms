import React from 'react';
import { Radio as AntRadio } from 'antd';

const Radio = (props) => {
  const { value, options, defaultValue, onChange } = props;

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    onChange(value);
  };

  return (
    <AntRadio.Group onChange={handleChange} value={value || defaultValue}>
      {options && options.map((o) => <AntRadio key={o.value} value={o.value} children={o.name} />)}
    </AntRadio.Group>
  );
};

export default Radio;
