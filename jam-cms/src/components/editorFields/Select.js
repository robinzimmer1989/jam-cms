import React from 'react';
import { Select as AntSelect } from 'antd';

const Select = (props) => {
  const { value = '', options, defaultValue, onChange } = props;

  return (
    <AntSelect defaultValue={value || defaultValue || ''} onChange={onChange}>
      {options &&
        options.map((o) => <AntSelect.Option key={o.value} value={o.value} children={o.name} />)}
    </AntSelect>
  );
};

export default Select;
