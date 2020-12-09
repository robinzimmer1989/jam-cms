import React, { Fragment } from 'react';
import styled from 'styled-components';
import slugify from 'slugify';

// import app components
import Text from './documentation/Text';
import TextImage from './documentation/TextImage';
import Edges from '../Edges';

import { colors } from '../../theme';

const Documentation = (props) => {
  const { topics } = props;

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
        <Grid>
          <Sidebar>
            {topics &&
              topics.map((o, i) => {
                return (
                  <SidebarItem key={i} href={`#${slugify(o.title)}`}>
                    {o.title}
                  </SidebarItem>
                );
              })}
          </Sidebar>
          <Content>
            {topics &&
              topics.map((o, i) => {
                return (
                  <Section id={slugify(o.title)} key={i}>
                    <h3>{o.title}</h3>
                    {o.flex &&
                      o.flex.map((p, j) => {
                        return <Fragment key={j}>{getFlexElement(p)}</Fragment>;
                      })}
                  </Section>
                );
              })}
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

const SidebarItem = styled.a`
  display: block;
  padding: 10px 20px;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 200px);
    padding-left: 40px;
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

const Section = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid #eee;
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
