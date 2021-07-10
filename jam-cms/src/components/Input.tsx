import React from 'react';
import { Input as AntInput, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

// import app components
import Caption from './Caption';

const Input = (props: any) => {
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; children: any; }' is not ass... Remove this comment to see the full error message */}
      {instructions && <Typography type="secondary" children={instructions} />}
      {!!rows ? (
        <AntInput.TextArea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={className}
          {...rest}
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
