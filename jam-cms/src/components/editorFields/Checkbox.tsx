import React from 'react';
import produce from 'immer';
import { Checkbox as AntCheckbox } from 'antd';

const Checkbox = (props: any) => {
  const { value, options, onChange } = props;

  const values = value || [];

  const handleChange = (e: any) => {
    const {
      target: { checked, value },
    } = e;

    const newValues = produce(values, (draft: any) => {
      if (checked) {
        draft.push(value);
      } else {
        draft = draft.filter((v: any) => v !== value);
      }
      return draft;
    });

    onChange(newValues);
  };

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {options &&
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      options.map((o: any) => <AntCheckbox
        key={o.value}
        value={o.value}
        checked={values.includes(o.value)}
        children={o.name}
        onChange={handleChange}
      />)}
  </>;
};

export default Checkbox;
