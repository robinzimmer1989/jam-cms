import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import hero from '../../../../components/hero/Hero';
import cards from '../../../../components/cards/Cards';
import textimage from '../../../../components/textImage/TextImage';
import texteditor from '../../../../components/textEditor/TextEditor';

const blocks = {
  hero,
  cards,
  textimage,
  texteditor,
};

const Template = (props) => {
  const {
    pageContext: { globalOptions },
    data: {
      wpPage: { acf, seo },
    },
  } = props;

  return (
    <Layout {...props} seo={seo}>
      {acf?.blocks?.flex &&
        acf.blocks.flex.map(({ id: fieldId, fieldGroupName, ...rest }, index) => {
          const id = fieldId || fieldGroupName?.split('_').pop().toLowerCase();

          const Component = blocks?.[id];
          return Component && <Component key={index} {...rest} globalOptions={globalOptions} />;
        })}
    </Layout>
  );
};

export const Query = graphql`
  query PageDefault($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      databaseId
      title
      template {
        templateName
      }
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
      # acf {
      #   blocks {
      #     flex {
      #       ... on WpPage_Acf_Blocks_Flex_Hero {
      #         fieldGroupName
      #         buttons {
      #           button {
      #             target
      #             title
      #             url
      #           }
      #           variant
      #         }
      #         headline
      #         image {
      #           id
      #           altText
      #           localFile {
      #             childImageSharp {
      #               gatsbyImageData(width: 1920, placeholder: BLURRED)
      #             }
      #           }
      #         }
      #         subline
      #       }
      #     }
      #   }
      # }
    }
  }
`;

export default Template;
