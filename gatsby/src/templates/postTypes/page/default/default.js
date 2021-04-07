import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import banner from '../../../../components/banner/Banner';
import boxes from '../../../../components/boxes/Boxes';
import textimage from '../../../../components/textImage/TextImage';
import texteditor from '../../../../components/textEditor/TextEditor';
import form from '../../../../components/form/Form';

const blocks = {
  banner,
  boxes,
  textimage,
  texteditor,
  form,
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
        acf.blocks.flex.map(({ id: fieldId, fieldGroupName, ...fields }, index) => {
          const id = fieldId || fieldGroupName.split('_').pop().toLowerCase();

          const Component = blocks?.[id];
          return Component && <Component key={index} {...fields} globalOptions={globalOptions} />;
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
      acf {
        blocks {
          flex {
            ... on WpPage_Acf_Blocks_Flex_Banner {
              fieldGroupName
              buttons {
                button {
                  target
                  title
                  url
                }
                variant
              }
              headline
              height
              image {
                id
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 1920, placeholder: BLURRED)
                  }
                }
              }
              subline
            }
            ... on WpPage_Acf_Blocks_Flex_Boxes {
              fieldGroupName
              items {
                text
                button {
                  target
                  title
                  url
                }
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
              columns
              introduction
            }
            ... on WpPage_Acf_Blocks_Flex_Form {
              fieldGroupName
              formid
            }
            ... on WpPage_Acf_Blocks_Flex_Textimage {
              fieldGroupName
              alignment
              buttons {
                button {
                  target
                  title
                  url
                }
                variant
              }
              image {
                id
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 600, placeholder: BLURRED)
                  }
                }
              }
              text
            }
            ... on WpPage_Acf_Blocks_Flex_Texteditor {
              fieldGroupName
              flex {
                ... on WpPage_Acf_Blocks_Flex_Texteditor_Flex_Layout1 {
                  text
                  fieldGroupName
                }
                ... on WpPage_Acf_Blocks_Flex_Texteditor_Flex_Layout2 {
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
                ... on WpPage_Acf_Blocks_Flex_Texteditor_Flex_Images {
                  fieldGroupName
                  columns
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
    }
  }
`;

export default Template;
