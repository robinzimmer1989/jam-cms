import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  return <Layout {...props}>Test</Layout>;
};

export const Query = graphql`
  query TeamDefault($id: String!) {
    wpProduct(id: { eq: $id }) {
      id
      databaseId
      title
    }
  }
`;

export default Template;
