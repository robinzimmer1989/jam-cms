import React from 'react';
import { Select as AntSelect, Space } from 'antd';

import Caption from './Caption';

const Select = (props: any) => {
  const { value, name, onChange, children, label, ...rest } = props;

  return (
    <Space direction="vertical" size={6}>
      {label && <Caption children={label} />}
      <AntSelect value={value} onChange={onChange} name={name} children={children} {...rest} />
    </Space>
  );
};

export default Select;
