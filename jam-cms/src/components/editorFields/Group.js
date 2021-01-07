import React from 'react';
import produce from 'immer';
import { set } from 'lodash';
import { Collapse } from 'antd';

import { getField } from '../EditorFields';

const Group = (props) => {
  const { id, label, site, fields, value, onChange, dispatch } = props;

  let values = value || {};

  const handleChange = (item) => {
    const newValues = produce(values, (draft) => {
      set(draft, `${item.id}`, item.value);
      return draft;
    });

    onChange(newValues);
  };

  return (
    <Collapse>
      <Collapse.Panel header={`${label || id}`}>
        {fields &&
          fields.map((field, index) => {
            return (
              <div key={index}>
                {getField({
                  field: { ...field, value: values?.[field.id] },
                  index,
                  site,
                  onChangeElement: (value) => handleChange(value),
                  dispatch,
                })}
              </div>
            );
          })}
      </Collapse.Panel>
    </Collapse>
  );
};

export default Group;
