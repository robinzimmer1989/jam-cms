import React from 'react';
import styled from 'styled-components';

// import app components
import Layout from '../../../components/Layout';
import Edges from '../../../components/Edges';
import banner from '../../../components/banner/Banner';
import textEditor from '../../../components/textEditor/TextEditor';

const Banner = banner.component;
const TextEditor = textEditor.component;

const Template = (props) => {
  const {
    pageContext: { title, content },
  } = props;

  return (
    <Layout {...props}>
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
