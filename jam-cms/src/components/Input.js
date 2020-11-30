import React from 'react';
import { Input as AntInput, Space } from 'antd';

import Caption from './Caption';

const Input = (props) => {
  const { value, name, type, onChange, placeholder, rows, label, className, ...rest } = props;

  return (
    <Space direction="vertical" size={2}>
      {label && <Caption className={className} children={label} />}

      {!!rows ? (
        <AntInput.TextArea
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={className}
        />
      ) : (
        <AntInput
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          {...rest}
        />
      )}
    </Space>
  );
};

export default Input;
