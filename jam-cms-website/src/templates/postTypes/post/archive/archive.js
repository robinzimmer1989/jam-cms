import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'jam-cms';

// import app components
import Layout from '../../../../components/Layout';
import Edges from '../../../../components/Edges';
import Banner from '../../../../components/banner/Banner';

const Template = (props) => {
  const {
    data: {
      wpPage: { title, seo },
      allWpPost: { nodes: posts },
    },
    pageContext: {
      pagination: {
        basePath,
        page,
        // numberOfPosts,
        numberOfPages,
        postsPerPage,
      },
    },
  } = props;

  const renderPagination = () => {
    const items = [];

    for (let i = 1; i <= numberOfPages; i++) {
      let pathname = basePath;

      if (i > 1) {
        pathname = `${basePath}page/${i}`;
      }

      items.push(
        <PaginationItem
          key={i}
          to={pathname}
          className={i === page ? 'active' : ''}
          children={`${i}`}
        />
      );
    }

    return items;
  };

  return (
    <Layout {...props} seo={seo}>
      <Banner headline={title} height="small" />
      <Edges size="sm">
        <Content>
          <Posts>
            {posts &&
              posts
                .slice((page - 1) * postsPerPage, (page - 1) * postsPerPage + postsPerPage)
                .map((o) => (
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

          <Pagination>{renderPagination()}</Pagination>
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
  margin-bottom: 20px;

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

const Pagination = styled.div`
  display: flex;
  padding: 20px 0;
`;

const PaginationItem = styled(Link)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primarycontrast};
  border-radius: 4px;
  margin: 0 10px;

  &:hover,
  &.active {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Query = graphql`
  query PostArchive($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
    allWpPost {
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
`;

export default Template;
