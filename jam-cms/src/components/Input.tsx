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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical" size={6}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {label && <Caption className={className} children={label} />}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {instructions && <Typography type="secondary" children={instructions} />}
      {!!rows ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <AntInput.Password
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          type={type}
          autoComplete="off"
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          {...rest}
        />
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
