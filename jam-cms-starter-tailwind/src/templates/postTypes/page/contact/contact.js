import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  return <Layout {...props}>Custom page template</Layout>;
};

export const Query = graphql`
  query PageContact($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      databaseId
      title
    }
  }
`;

export default Template;
