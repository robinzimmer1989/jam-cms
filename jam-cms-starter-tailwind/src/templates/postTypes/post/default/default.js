import React from 'react';
import { graphql, Link } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import TextEditor from '../../../../components/textEditor/TextEditor';

const Template = (props) => {
  const {
    data: {
      wpPost: { title, date, acf, categories, seo },
    },
  } = props;

  return (
    <Layout {...props} seo={seo}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          {categories?.nodes.map((o) => (
            <Link
              to={o.uri}
              key={o.databaseId}
              className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-secondary-contrast uppercase rounded-full bg-secondary"
            >
              {o.name}
            </Link>
          ))}

          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            {title}
          </h2>
          <p className="text-base text-gray-700 md:text-lg sm:px-4">{date}</p>
          <hr className="w-full my-8 border-gray-300" />
        </div>

        {acf?.text && <TextEditor {...acf.text} />}
      </div>
    </Layout>
  );
};

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
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
      # acf {
      #   text {
      #     fieldGroupName
      #     flex {
      #       ... on WpPost_Acf_Text_Flex_Text {
      #         fieldGroupName
      #         text
      #       }
      #       ... on WpPost_Acf_Text_Flex_Textimage {
      #         alignment
      #         fieldGroupName
      #         image {
      #           altText
      #           localFile {
      #             childImageSharp {
      #               gatsbyImageData(width: 600, placeholder: BLURRED)
      #             }
      #           }
      #         }
      #         text
      #       }
      #       ... on WpPost_Acf_Text_Flex_Gallery {
      #         columns
      #         fieldGroupName
      #         gallery {
      #           altText
      #           localFile {
      #             childImageSharp {
      #               gatsbyImageData(width: 600, placeholder: BLURRED)
      #             }
      #           }
      #         }
      #       }
      #       ... on WpPost_Acf_Text_Flex_Embed {
      #         fieldGroupName
      #         url
      #       }
      #       ... on WpPost_Acf_Text_Flex_Quote {
      #         author
      #         fieldGroupName
      #         position
      #         text
      #       }
      #     }
      #   }
      # }
    }
  }
`;

export default Template;
