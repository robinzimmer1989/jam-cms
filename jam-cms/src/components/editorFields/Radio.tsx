import React from 'react';
import { Radio as AntRadio } from 'antd';

const Radio = (props: any) => {
  const { value, options, defaultValue, onChange } = props;

  const handleChange = (e: any) => {
    const {
      target: { value },
    } = e;

    onChange(value);
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AntRadio.Group onChange={handleChange} value={value || defaultValue}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {options && options.map((o: any) => <AntRadio key={o.value} value={o.value} children={o.name} />)}
    </AntRadio.Group>
  );
};

export default Radio;
