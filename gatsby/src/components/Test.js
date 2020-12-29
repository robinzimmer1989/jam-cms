import React from 'react';
import styled from 'styled-components';

const Test = (props) => {
  console.log(props);
  return <Container></Container>;
};

const Container = styled.div`
  height: 300px;
`;

export default {
  id: 'test',
  label: 'Test',
  component: Test,
  category: 'default',
  fields: [
    {
      id: 'date',
      type: 'date_picker',
      label: 'Date',
    },
    {
      id: 'file',
      type: 'file',
      label: 'Add File',
    },
    {
      id: 'checkbox',
      type: 'checkbox',
      label: 'Checkbox',
      options: [
        {
          name: 'Checkbox 1',
          value: 'checkbox-1',
        },
        {
          name: 'Checkbox 2',
          value: 'checkbox-2',
        },
      ],
    },
    {
      id: 'radio',
      type: 'radio',
      label: 'Radio',
      defaultValue: 'radio-1',
      options: [
        {
          name: 'Radio 1',
          value: 'radio-1',
        },
        {
          name: 'Radio 2',
          value: 'radio-2',
        },
      ],
    },
  ],
};
