import React from 'react';
import { Select as AntSelect, Space } from 'antd';

import Caption from './Caption';

const Select = (props) => {
  const { value, name, onChange, children, label } = props;

  return (
    <Space direction="vertical" size={2}>
      {label && <Caption children={label} />}
      <AntSelect value={value} onChange={onChange} name={name} children={children} />
    </Space>
  );
};

export default Select;
