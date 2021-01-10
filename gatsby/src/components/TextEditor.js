import React from 'react';
import styled from 'styled-components';

// import app components
import Text from './textEditor/Text';
import TextImage from './textEditor/TextImage';

import Edges from './Edges';

const TextEditor = (props) => {
  const { flex } = props;

  const getFlexElement = (block) => {
    let el;

    switch (block.id) {
      case 'layout1':
        el = <Text {...block} />;
        break;

      case 'layout2':
        el = <TextImage {...block} />;
        break;

      default:
    }

    return el;
  };

  return (
    <Container>
      <Edges size="md">
        <Content>
          {flex && flex.map((block) => <div key={block.id}>{getFlexElement(block)}</div>)}
        </Content>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0;
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
  fields: [
    {
      id: 'flex',
      type: 'flexible_content',
      label: 'Rich Text',
      items: [
        {
          id: 'layout1',
          type: 'layout',
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
          type: 'layout',
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
