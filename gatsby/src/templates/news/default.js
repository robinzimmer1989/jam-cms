import React from 'react';
import styled from 'styled-components';

// import app components
import Layout from '../../components/Layout';
import Edges from '../../components/Edges';
import banner from '../../components/Banner';
import textEditor from '../../components/TextEditor';

const Banner = banner.component;
const TextEditor = textEditor.component;

const Template = (props) => {
  const {
    pageContext: { title, content },
  } = props;

  return (
    <Layout {...props.pageContext}>
      <Banner headline={title} height="small" />
      <Edges size="sm">
        <Content>
          <TextEditor {...content.text} />
        </Content>
      </Edges>
    </Layout>
  );
};

const Content = styled.div`
  padding-bottom: 60px;
`;

export default Template;

export const NewsDefaultTemplate = {
  id: 'default',
  label: 'News',
  postTypeID: 'news',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'text',
      label: 'Content',
      type: 'group',
      fields: textEditor.fields,
    },
    {
      id: 'gallery',
      label: 'Gallery',
      type: 'gallery',
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};
