import React from 'react';
import { graphql, Link } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  const {
    data: {
      wpPage: {
        seo,
        template: { acf },
      },
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

    if (numberOfPages < 2) {
      return null;
    }

    for (let i = 1; i <= numberOfPages; i++) {
      let pathname = basePath;

      if (i > 1) {
        pathname = `${basePath}page/${i}`;
      }

      items.push(
        <li key={i}>
          <Link
            to={pathname}
            className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-indigo-50 bg-${
              i === page ? 'indigo-900' : 'white'
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }

    return (
      <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">{items}</ul>
        </nav>
      </div>
    );
  };

  return (
    <Layout {...props} seo={seo}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            {acf?.content?.tag && (
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                {acf.content.tag}
              </p>
            )}
          </div>
          {acf?.content?.headline && (
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="db164e35-2a0e-4c0f-ab05-f14edc6d4d30"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect fill="url(#db164e35-2a0e-4c0f-ab05-f14edc6d4d30)" width="52" height="24" />
                </svg>
              </span>
              <span className="relative z-1">{acf.content.headline}</span>
            </h2>
          )}
          {acf?.content?.text && (
            <p className="text-base text-gray-700 md:text-lg">{acf.content.text}</p>
          )}
        </div>
        <div className="grid max-w-sm gap-5 mb-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
          {posts &&
            posts
              .slice((page - 1) * postsPerPage, (page - 1) * postsPerPage + postsPerPage)
              .map((o) => (
                <div
                  key={o.id}
                  className="px-10 py-20 text-center border rounded lg:px-5 lg:py-10 xl:py-20"
                >
                  <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                    {o.date}
                  </p>
                  <Link
                    to={o.uri}
                    className="block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    aria-label="Read article"
                    title={o.title}
                  >
                    {o.title}
                  </Link>
                  <Link
                    to={o.uri}
                    aria-label=""
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    Read more
                  </Link>
                </div>
              ))}
        </div>
        {renderPagination()}
      </div>
    </Layout>
  );
};

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
      template {
        ... on WpTemplate_ArchivePost {
          templateName
          acf {
            content {
              tag
              headline
              text
            }
          }
        }
      }
    }
    allWpPost {
      nodes {
        id
        title
        uri
        date
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
