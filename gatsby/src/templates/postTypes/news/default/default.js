import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import Edges from '../../../../components/Edges';
import Banner from '../../../../components/banner/Banner';
import TextEditor from '../../../../components/textEditor/TextEditor';

const Template = (props) => {
  const {
    data: {
      wpNews: { title, acf },
    },
  } = props;

  return (
    <Layout {...props}>
      <Banner headline={title} height="small" />
      <Edges size="sm">
        <Content>
          <TextEditor {...acf.text} />
        </Content>
      </Edges>
    </Layout>
  );
};

const Content = styled.div`
  padding-bottom: 60px;
`;

export const Query = graphql`
  query NewsDefault($id: String!) {
    wpNews(id: { eq: $id }) {
      title
      acf {
        text {
          flex {
            ... on WpNews_Acf_Text_Flex_Layout1 {
              fieldGroupName
              text
            }
            ... on WpNews_Acf_Text_Flex_Layout2 {
              alignment
              fieldGroupName
              text
              image {
                id
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 400, placeholder: BLURRED)
                  }
                }
              }
            }
            ... on WpNews_Acf_Text_Flex_Images {
              columns
              fieldGroupName
              gallery {
                id
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 400, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Template;
