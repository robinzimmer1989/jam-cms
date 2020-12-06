import React from 'react';
import styled from 'styled-components';

// import app components
import Text from './textEditor/Text';
import TextImage from './textEditor/TextImage';

import Edges from '../Edges';

const TextEditor = (props) => {
  const { flex } = props;

  const getFlexElement = ({ id, fields }) => {
    const data = {};
    fields.forEach((o) => (data[o.id] = o.value));

    let el;
    switch (id) {
      case 'layout1':
        el = <Text {...data} />;
        break;

      case 'layout2':
        el = <TextImage {...data} />;
        break;

      default:
    }

    return el;
  };

  return (
    <Container>
      <Edges size="xs">
        <Content>{flex.map((block) => getFlexElement(block))}</Content>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 0;
  min-height: 40px;
`;

const Content = styled.div`
  > div {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default {
  id: 'texteditor',
  label: 'Text Editor',
  component: TextEditor,
  category: 'default',
  fields: [
    {
      id: 'flex',
      type: 'flexible_content',
      label: 'Flexible Content',
      items: [
        {
          id: 'layout1',
          label: 'Text',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
            },
          ],
        },
        {
          id: 'layout2',
          label: 'Text & Image',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
            },
            {
              id: 'image',
              type: 'image',
              label: 'Image',
            },
            {
              id: 'alignment',
              type: 'select',
              label: 'Image Alignment',
              defaultValue: 'left',
              options: [
                {
                  name: 'Left',
                  value: 'left',
                },
                {
                  name: 'Right',
                  value: 'right',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
