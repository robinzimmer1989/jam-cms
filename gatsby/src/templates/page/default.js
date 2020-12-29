import React from 'react';
import styled from 'styled-components';

// import app components
import Layout from '../../components/Layout';
import banner from '../../components/Banner';
import boxes from '../../components/Boxes';
import posts from '../../components/Posts';
import textimage from '../../components/TextImage';
import texteditor from '../../components/TextEditor';
import documentation from '../../components/Documentation';

const blocks = {
  banner,
  boxes,
  posts,
  textimage,
  texteditor,
  documentation,
};

const Template = (props) => {
  const {
    pageContext: { content, globalOptions },
  } = props;

  return (
    <Layout {...props.pageContext}>
      <SidebarContent>
        <Sidebar>{content?.sidebar?.title}</Sidebar>
        <Content>
          {content?.flex &&
            content.flex.map(({ id, ...fields }, index) => {
              const Component = blocks?.[id]?.component;
              return (
                Component && <Component key={index} {...fields} globalOptions={globalOptions} />
              );
            })}
        </Content>
      </SidebarContent>
    </Layout>
  );
};

const SidebarContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
`;

const Sidebar = styled.div`
  width: 100%;

  @media (min-width: 960px) {
    width: 250px;
  }
`;

const Content = styled.div`
  width: 100%;

  @media (min-width: 960px) {
    width: calc(100% - 250px);
    padding-left: 50px;
  }
`;

export default Template;

export const PageDefaultTemplate = {
  id: 'default',
  label: 'Default',
  postTypeID: 'page',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'sidebar',
      label: 'Sidebar',
      type: 'group',
      fields: [
        {
          id: 'title',
          label: 'Title',
          type: 'text',
        },
      ],
    },
    {
      id: 'flex',
      label: 'Blocks',
      type: 'flexible_content',
      items: Object.values(blocks),
    },
  ],
};
