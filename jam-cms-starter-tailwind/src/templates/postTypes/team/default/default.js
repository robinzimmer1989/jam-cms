import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  const {
    data: {
      wpTeam: { seo },
    },
  } = props;

  return (
    <Layout {...props} seo={seo}>
      Test
    </Layout>
  );
};

export const Query = graphql`
  query TeamDefault($id: String!) {
    wpTeam(id: { eq: $id }) {
      id
      databaseId
      title
      template {
        templateName
      }
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export default Template;
