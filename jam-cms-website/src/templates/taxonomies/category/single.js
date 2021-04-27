import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'jam-cms';

// import app components
import Layout from '../../../components/Layout';
import Edges from '../../../components/Edges';
import Banner from '../../../components/banner/Banner';

const Template = (props) => {
  const {
    data: {
      wpCategory: { name, posts },
    },
  } = props;

  return (
    <Layout {...props}>
      <Banner headline={name} height="small" />
      <Edges size="sm">
        <Content>
          <Posts>
            {posts?.nodes &&
              posts.nodes.map((o) => (
                <Post key={o.id} to={o.uri}>
                  <ImageContainer>
                    {o?.featuredImage?.node && (
                      <GatsbyImage objectFit="contain" image={o.featuredImage.node} />
                    )}
                  </ImageContainer>

                  <h3>{o.title}</h3>
                </Post>
              ))}

            <Post to={'/'} style={{ margin: 0, padding: 0, height: 0 }} />
          </Posts>
        </Content>
      </Edges>
    </Layout>
  );
};

const Content = styled.div`
  padding-top: 40px;
  padding-bottom: 60px;
`;

const Posts = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Post = styled(Link)`
  width: 100%;
  margin-bottom: 40px;

  @media (min-width: 640px) {
    width: calc(100% / 2 - 10px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 120px;
  background: #fff;
  margin-bottom: 20px;

  .gatsby-image-wrapper {
    max-height: 100%;
    max-width: 100%;
  }
`;

export const Query = graphql`
  query Category($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      name
      posts {
        nodes {
          id
          title
          uri
          featuredImage {
            node {
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
`;

export default Template;
