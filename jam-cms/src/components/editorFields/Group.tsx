import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import produce from 'immer';
import { set } from 'lodash';
import { Collapse, Typography } from 'antd';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../EditorFields' or its corres... Remove this comment to see the full error message
import { getField } from '../EditorFields';

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
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'key' is missing in type '{ children: any... Remove this comment to see the full error message */}
      <Collapse.Panel header={`${label || id}`}>
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
