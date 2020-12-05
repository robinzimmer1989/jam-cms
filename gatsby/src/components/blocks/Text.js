import React from 'react';
import styled from 'styled-components';

// import app components
import Wysiwyg from '../Wysiwyg';
import Edges from '../Edges';

const Text = (props) => {
  const { text } = props;

  return (
    <Container>
      <Edges size="xs">
        <Wysiwyg children={text} />
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 0;
  min-height: 40px;
`;

export default {
  id: 'text',
  label: 'Text',
  component: Text,
  category: 'default',
  fields: [
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
    },
  ],
};
