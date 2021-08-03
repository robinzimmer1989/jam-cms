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
    pageContext: { themeOptions },
    data: {
      wpPage: {
        template: { acf },
      },
    },
  } = props;

  return (
    <Layout {...props}>
      {acf?.flex &&
        acf.flex.map(({ id: fieldId, fieldGroupName, ...rest }, index) => {
          const id = fieldId || fieldGroupName?.split('_').pop().toLowerCase();

          const Component = blocks?.[id];
          return Component && <Component key={index} {...rest} themeOptions={themeOptions} />;
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
        ... on WpDefaultTemplate {
          templateName
          acf {
            flex {
              ... on WpDefaultTemplate_Acf_Flex_Hero {
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
              ... on WpDefaultTemplate_Acf_Flex_Cards {
                columns
                introduction
                fieldGroupName
                items {
                  headline
                  fieldGroupName
                  text
                  link {
                    target
                    title
                    url
                  }
                }
              }
              ... on WpDefaultTemplate_Acf_Flex_Textimage {
                fieldGroupName
                alignment
                buttons {
                  button {
                    target
                    title
                    url
                  }
                  variant
                  fieldGroupName
                }
                image {
                  altText
                  sourceUrl
                  svg
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 800, placeholder: BLURRED)
                    }
                  }
                }
                text
              }
              ... on WpDefaultTemplate_Acf_Flex_Texteditor {
                fieldGroupName
                flex {
                  ... on WpDefaultTemplate_Acf_Flex_Texteditor_Flex_Text {
                    fieldGroupName
                    text
                  }
                  ... on WpDefaultTemplate_Acf_Flex_Texteditor_Flex_Textimage {
                    alignment
                    fieldGroupName
                    image {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(width: 600, placeholder: BLURRED)
                        }
                      }
                    }
                    text
                  }
                  ... on WpDefaultTemplate_Acf_Flex_Texteditor_Flex_Gallery {
                    columns
                    fieldGroupName
                    gallery {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(width: 600, placeholder: BLURRED)
                        }
                      }
                    }
                  }
                  ... on WpDefaultTemplate_Acf_Flex_Texteditor_Flex_Embed {
                    fieldGroupName
                    url
                  }
                  ... on WpDefaultTemplate_Acf_Flex_Texteditor_Flex_Quote {
                    author
                    fieldGroupName
                    position
                    text
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
