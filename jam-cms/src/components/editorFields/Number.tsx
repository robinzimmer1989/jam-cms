import React from 'react';
import { InputNumber } from 'antd';

const Number = (props: any) => {
  const { value, defaultValue, min, max, step = 1, onChange } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <InputNumber
      min={min}
      max={max}
      step={step}
      defaultValue={value || defaultValue}
      onChange={onChange}
    />
  );
};

export default Number;
