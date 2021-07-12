import React from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { set } from 'lodash';
import { Collapse, Typography } from 'antd';

// import app components
import { getField } from '../editor/Fields';

const Group = (props: any) => {
  const { id, label, instructions, site, fields, value, onChange, dispatch } = props;

  let values = value || {};

  const handleChange = (item: any) => {
    const newValues = produce(values, (draft: any) => {
      set(draft, `${item.id}`, item.value);
      return draft;
    });

    onChange(newValues);
  };

  return (
    <Collapse expandIconPosition="right">
      <Collapse.Panel key="group" header={`${label || id}`}>
        {instructions && (
          <LabelContainer>
            <Typography.Text type="secondary" children={instructions} />
          </LabelContainer>
        )}
        {fields &&
          fields.map((field: any, index: any) => {
            return (
              <div key={index}>
                {getField({
                  field: { ...field, value: values?.[field.id] },
                  index,
                  site,
                  onChangeElement: (value: any) => handleChange(value),
                  dispatch,
                })}
              </div>
            );
          })}
      </Collapse.Panel>
    </Collapse>
  );
};

const LabelContainer = styled.div`
  padding: 12px 4px 0;
`;

export default Group;
