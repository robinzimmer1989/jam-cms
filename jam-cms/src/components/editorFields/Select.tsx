import React from 'react';
import { Select as AntSelect } from 'antd';

export interface ISelectOption {
  name: string;
  value: string | number;
}

export interface ISelect {
  value: string;
  defaultValue?: string;
  options: ISelectOption[];
  onChange: () => void;
}

const Select = (props: ISelect) => {
  const { value = '', options, defaultValue, onChange } = props;

  return (
    <AntSelect defaultValue={value || defaultValue || ''} onChange={onChange}>
      {options &&
        options.map((o: any) => (
          <AntSelect.Option key={o.value} value={o.value} children={o.name} />
        ))}
    </AntSelect>
  );
};

export default Select;
