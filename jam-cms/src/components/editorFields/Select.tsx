import React from 'react';
import { Select as AntSelect } from 'antd';

const Select = (props: any) => {
  const { value = '', options, defaultValue, onChange } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AntSelect defaultValue={value || defaultValue || ''} onChange={onChange}>
      {options &&
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        options.map((o: any) => <AntSelect.Option key={o.value} value={o.value} children={o.name} />)}
    </AntSelect>
  );
};

export default Select;
