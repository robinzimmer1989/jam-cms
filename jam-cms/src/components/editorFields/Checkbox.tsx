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

  return <>
    {options &&
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
