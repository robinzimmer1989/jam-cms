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
      value: 'Write something...',
    };
  }

  if (field.type === 'text' && !field?.value) {
    return {
      ...field,
      value: 'Write something...',
    };
  }

  return field;
}
