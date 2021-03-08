import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';

// import app components
import Edges from '../Edges';
import Button from '../button/Button';

const Posts = (props) => {
  let { buttontitle, numberofposts, columns } = props;

  let posts = usePostsQuery();

  if (posts && numberofposts && numberofposts > 0) {
    posts = posts.slice(0, numberofposts);
  }

  return (
    <Container>
      <Edges size="md">
        <BoxesContainer>
          {posts &&
            posts.map((post, index) => {
              return (
                <Box key={index} columns={columns}>
                  <ImageContainer to={post.uri}>
                    {getImage(post?.featuredImage?.node?.localFile) && (
                      <GatsbyImage
                        image={getImage(post.featuredImage.node.localFile)}
                        alt={post.featuredImage.node.altText}
                        objectFit="contain"
                        style={{ width: '100%', height: '100%' }}
                        imgStyle={{
                          maxWidth: post.featuredImage.width,
                          maxHeight: post.featuredImage.height,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                  </ImageContainer>

                  {post.title && (
                    <HeadlineContainer>
                      <h4 children={post.title} />
                    </HeadlineContainer>
                  )}

                  <Button url={post.uri} title={buttontitle} />
                </Box>
              );
            })}

          <Box columns={columns} style={{ height: 0, opacity: 0, margin: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, margin: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, margin: 0 }} />
        </BoxesContainer>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 300px;
  padding: 40px 0;
`;

const BoxesContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageContainer = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 120px;
  margin-bottom: 12px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(4, 73, 89, 0.05);
`;

const Box = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    ${({ columns }) =>
      columns > 1 &&
      `
      width: calc(50% - 10px);
    `}
  }

  @media (min-width: 900px) {
    ${({ columns }) =>
      columns > 2 &&
      `
      width: calc(100% / 3 - 10px);
    `}
  }

  @media (min-width: 1200px) {
    ${({ columns }) =>
      columns > 3 &&
      `
      width: calc(100% / 4 - 10px);
    `}
  }
`;

const HeadlineContainer = styled.div`
  margin-bottom: 20px;
`;

const usePostsQuery = () => {
  const {
    allWpNews: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allWpNews {
          nodes {
            id
            title
            uri
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 300, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  return nodes;
};

export default Posts;
