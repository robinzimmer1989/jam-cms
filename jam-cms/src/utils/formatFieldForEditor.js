import Parser from 'html-react-parser';

import generateSlug from './generateSlug';

export default function formatFieldForEditor(field, site) {
  // Post relationship fields
  if (field.type === 'collection' && field?.value) {
    const posts = Object.values(site?.postTypes?.[field.value]?.posts || {}).filter(
      (post) => post.status === 'publish'
    );

    return {
      ...field,
      value: posts.map((o) => {
        return { ...o, slug: generateSlug(site?.postTypes?.[field.value], o.id, site.frontPage) };
      }),
    };
  }

  if (
    field.type === 'wysiwyg' &&
    (!field?.value || field?.value.replace(/(\r\n|\n|\r)/gm, '') === '<p></p>')
  ) {
    return {
      ...field,
      value: '<i>Write something...</i>',
    };
  }

  if (field.type === 'text' && !field?.value) {
    return {
      ...field,
      value: Parser('<i>Write something...</i>'),
    };
  }

  if (field.type === 'image' && !field?.value) {
    return {
      ...field,
      value: {
        alt: '',
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            base64: '',
            sizes: '(max-width: 1200px) 100vw, 1200px',
            src: 'https://www.fpcanada.org/wp-content/uploads/woocommerce-placeholder.png',
            srcSet: '',
          },
        },
        filename: 'placeholder.jpeg',
        height: 1200,
        width: 1200,
        title: 'placeholder',
        type: 'image',
        url: 'https://www.fpcanada.org/wp-content/uploads/woocommerce-placeholder.png',
      },
    };
  }

  return field;
}
