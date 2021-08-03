import React from 'react';
import { graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';

const Template = (props) => {
  const {
    data: {
      wpPage: {
        template: {
          acf: {
            checkbox,
            color,
            date,
            file,
            flexible,
            gallery,
            group,
            image,
            link,
            url,
            map,
            number,
            radio,
            repeater,
            select,
            text,
            wysiwyg,
          },
        },
      },
    },
  } = props;

  return (
    <Layout {...props}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-sm sm:mx-auto">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>checkbox</td>
                <td id="checkbox-result">{JSON.stringify(checkbox)}</td>
              </tr>
              <tr>
                <td>color</td>
                <td id="color-result">{color}</td>
              </tr>
              <tr>
                <td>date</td>
                <td id="date-result">{JSON.stringify(date)}</td>
              </tr>
              <tr>
                <td>file</td>
                <td id="file-result">{file && file.slug}</td>
              </tr>
              <tr>
                <td>flexible</td>
                <td id="flexible-result">{JSON.stringify(flexible)}</td>
              </tr>
              <tr>
                <td>gallery</td>
                <td id="gallery-result">{gallery && JSON.stringify(gallery.map((o) => o.slug))}</td>
              </tr>
              <tr>
                <td>group</td>
                <td id="group-result">{JSON.stringify(group)}</td>
              </tr>
              <tr>
                <td>image</td>
                <td id="image-result">{image && image.slug}</td>
              </tr>
              <tr>
                <td>link</td>
                <td id="link-result">{JSON.stringify(link)}</td>
              </tr>
              <tr>
                <td>url</td>
                <td id="url-result">{JSON.stringify(url)}</td>
              </tr>
              <tr>
                <td>map</td>
                <td id="map-result">{JSON.stringify(map)}</td>
              </tr>
              <tr>
                <td>number</td>
                <td id="number-result">{JSON.stringify(number)}</td>
              </tr>
              <tr>
                <td>radio</td>
                <td id="radio-result">{JSON.stringify(radio)}</td>
              </tr>
              <tr>
                <td>repeater</td>
                <td id="repeater-result">{JSON.stringify(repeater)}</td>
              </tr>
              <tr>
                <td>select</td>
                <td id="select-result">{JSON.stringify(select)}</td>
              </tr>
              <tr>
                <td>text</td>
                <td id="text-result">{JSON.stringify(text)}</td>
              </tr>
              <tr>
                <td>wysiwyg</td>
                <td id="wysiwyg-result">{JSON.stringify(wysiwyg)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export const Query = graphql`
  query PageContact($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      databaseId
      title
      # template {
      #   ... on WpTemplate_Test {
      #     templateName
      #     acf {
      #       checkbox
      #       color
      #       date
      #       fieldGroupName
      #       file {
      #         slug
      #       }
      #       flexible {
      #         ... on WpTemplate_Test_Acf_Flexible_Layout1 {
      #           text
      #         }
      #         ... on WpTemplate_Test_Acf_Flexible_Layout2 {
      #           text
      #           image {
      #             slug
      #           }
      #         }
      #       }
      #       gallery {
      #         slug
      #       }
      #       group {
      #         text
      #       }
      #       image {
      #         slug
      #       }
      #       link {
      #         target
      #         title
      #         url
      #       }
      #       map {
      #         streetAddress
      #         latitude
      #         longitude
      #       }
      #       number
      #       radio
      #       repeater {
      #         image {
      #           slug
      #         }
      #       }
      #       select
      #       text
      #       wysiwyg
      #     }
      #   }
      # }
    }
  }
`;

export default Template;
