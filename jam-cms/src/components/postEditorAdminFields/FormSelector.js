import React from 'react';
import { Select } from 'antd';

const FormSelector = (props) => {
  const { site, value = '', onSelect } = props;

  return (
    <Select defaultValue={value} onChange={onSelect}>
      <Select.Option value={''} children={'Select'} />
      {Object.values(site.forms).map((o) => {
        return <Select.Option key={o.id} value={o.id} children={o.title} />;
      })}
    </Select>
  );
};

export default FormSelector;
