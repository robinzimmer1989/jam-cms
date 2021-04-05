import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import Edges from '../../../../components/Edges';
import Banner from '../../../../components/banner/Banner';
import TextEditor from '../../../../components/textEditor/TextEditor';

import { colors } from '../../../../theme';

const Template = (props) => {
  const {
    data: {
      wpPost: { title, acf, categories },
    },
  } = props;

  return (
    <Layout {...props}>
      <Banner headline={title} height="small" />
      <Edges size="sm">
        <Content>
          <Tags>
            {categories?.nodes.map((o) => (
              <Tag key={o.databaseId} to={o.uri} children={o.name} />
            ))}
          </Tags>
          <TextEditor {...acf.text} />
        </Content>
      </Edges>
    </Layout>
  );
};

const Content = styled.div`
  padding-top: 40px;
  padding-bottom: 60px;
`;

const Tags = styled.div`
  display: flex;
`;

const Tag = styled(Link)`
  margin-right: 20px;
  display: flex;
  padding: 5px 12px;
  border-radius: 4px;
  background: ${colors.primary};
  font-size: 12px;
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.8;
  }
`;

export const Query = graphql`
  query PostDefault($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      categories {
        nodes {
          databaseId
          name
          uri
        }
      }
      acf {
        text {
          flex {
            ... on WpPost_Acf_Text_Flex_Layout1 {
              fieldGroupName
              text
            }
            ... on WpPost_Acf_Text_Flex_Layout2 {
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
            ... on WpPost_Acf_Text_Flex_Images {
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
