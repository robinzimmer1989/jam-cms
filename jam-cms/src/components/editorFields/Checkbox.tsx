import React from 'react';
import produce from 'immer';
import { Checkbox as AntCheckbox } from 'antd';

export interface ICheckboxOption {
  name: string;
  value: string | number;
}

export interface ICheckbox {
  value: string[];
  options: ICheckboxOption[];
  onChange: Function;
}

const Checkbox = (props: ICheckbox) => {
  const { value = [], options, onChange } = props;

  let checkedValue = value;

  if (!Array.isArray(value)) {
    console.warn('Checkbox value must be an array');
    checkedValue = [];
  }

  const handleChange = (e: any) => {
    const {
      target: { checked, value },
    } = e;

    const newValues = produce(checkedValue, (draft: any) => {
      if (checked) {
        draft.push(value);
      } else {
        draft = draft.filter((v: any) => v !== value);
      }
      return draft;
    });

    onChange(newValues);
  };

  return (
    options &&
    options.map((o: any) => (
      <AntCheckbox
        key={o.value}
        value={o.value}
        checked={checkedValue.includes(o.value)}
        children={o.name}
        onChange={handleChange}
      />
    ))
  );
};

export default Checkbox;
