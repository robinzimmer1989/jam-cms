import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

// import app components
import Layout from '../../../components/Layout';
import Edges from '../../../components/Edges';
import Banner from '../../../components/banner/Banner';

import { colors } from '../../../theme';

const Template = (props) => {
  const {
    data: {
      wpCategory: { name, posts },
    },
  } = props;

  console.log(props);

  return (
    <Layout {...props}>
      <Banner headline={name} height="small" />
      <Edges size="sm"></Edges>
    </Layout>
  );
};

export const Query = graphql`
  query Category($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      name
      posts {
        nodes {
          title
        }
      }
    }
  }
`;

export default Template;
