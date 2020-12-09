import React from 'react';
import styled from 'styled-components';

// import app components
import Text from './textEditor/Text';
import TextImage from './textEditor/TextImage';
import Edges from '../Edges';

import { colors } from '../../theme';

const Documentation = (props) => {
  const { topics } = props;

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
      <Edges size="md">
        <Grid>
          <Sidebar></Sidebar>
          <Content>
            {/* {flex && flex.map((block) => <div key={block.id}>{getFlexElement(block)}</div>)} */}
          </Content>
        </Grid>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0;
  min-height: 40px;
`;

const Grid = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
`;

const Content = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 200px);
  }

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
  id: 'documentation',
  label: 'Documentation',
  component: Documentation,
  category: 'default',
  fields: [
    {
      id: 'topics',
      type: 'repeater',
      label: 'Topics',
      items: [
        {
          id: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          id: 'flex',
          type: 'flexible_content',
          label: 'Flexible Content',
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
    },
  ],
};