import React from 'react';
import { Input as AntInput, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

// import app components
import Caption from './Caption';

const Input = (props) => {
  const {
    value,
    name,
    type,
    onChange,
    placeholder,
    rows,
    label,
    instructions,
    className,
    ...rest
  } = props;

  return (
    <Space direction="vertical" size={6}>
      {label && <Caption className={className} children={label} />}
      {instructions && <Typography type="secondary" children={instructions} />}
      {!!rows ? (
        <AntInput.TextArea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={className}
        />
      ) : type === 'password' ? (
        <AntInput.Password
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          type={type}
          autoComplete="off"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          {...rest}
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
