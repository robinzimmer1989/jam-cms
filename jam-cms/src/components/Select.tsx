import React from 'react';
import { Select as AntSelect, Space } from 'antd';

import Caption from './Caption';

const Select = (props: any) => {
  const { value, name, onChange, children, label, ...rest } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical" size={6}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {label && <Caption children={label} />}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <AntSelect value={value} onChange={onChange} name={name} children={children} {...rest} />
    </Space>
  );
};

export default Select;
