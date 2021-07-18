import React from 'react';
import { graphql, Link } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  const {
    data: {
      wpPage: { seo },
      allWpProduct: { nodes: products },
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
              i === page ? 'secondary' : 'white'
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
        <div className="grid max-w-sm gap-5 mb-8 lg:grid-cols-3 sm:mx-auto lg:max-w-full">
          {products &&
            products
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
                    className="block max-w-xs mx-auto mb-3 text-2xl font-extrabold leading-7 transition-colors duration-200 hover:underline"
                    aria-label="Read article"
                    title={o.title}
                  >
                    {o.title}
                  </Link>
                  <Link
                    to={o.uri}
                    aria-label=""
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-primary hover:underline"
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
  query ProductArchive($id: String!) {
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
    allWpProduct {
      nodes {
        id
        title
        uri
        date
      }
    }
  }
`;

export default Template;
