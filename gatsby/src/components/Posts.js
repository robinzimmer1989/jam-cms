import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import Edges from './Edges';
import Button from './Button';

const Posts = (props) => {
  let { posts, buttonTitle, numberofposts, columns } = props;

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
                  <ImageContainer>
                    {post?.featuredImage?.childImageSharp?.fluid && (
                      <Img
                        fluid={post.featuredImage.childImageSharp.fluid}
                        imgStyle={{
                          objectFit: 'contain',
                          maxWidth: post.featuredImage.width,
                          maxHeight: post.featuredImage.height,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        alt={post.featuredImage.alt}
                        style={{ width: '100%', height: '100%' }}
                      />
                    )}
                  </ImageContainer>

                  {post.title && (
                    <HeadlineContainer>
                      <h4 children={post.title} />
                    </HeadlineContainer>
                  )}

                  <Button url={post.slug} title={buttonTitle} />
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

const ImageContainer = styled.div`
  position: relative;
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

export default {
  id: 'posts',
  label: 'Posts',
  component: Posts,
  fields: [
    {
      id: 'posts',
      type: 'collection',
      label: 'Collection',
    },
    {
      id: 'buttonTitle',
      type: 'text',
      defaultValue: 'Read More',
      label: 'Button Title',
    },
    {
      id: 'numberofposts',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 3,
      min: -1,
      step: 2,
    },
    {
      id: 'columns',
      type: 'number',
      label: 'Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
      step: 1,
    },
  ],
};
