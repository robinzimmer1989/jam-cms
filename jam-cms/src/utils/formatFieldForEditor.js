import { set } from 'lodash';
import produce from 'immer';

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

  if (field.type === 'flexible_content') {
    const nextFlexibleContentField = produce(field, (draft) => {
      draft.value.map((o, i) => {
        Object.keys(o).map((key) => {
          if (key !== 'id') {
            const subField = draft.items
              .find((p) => p.id === o.id)
              .fields.find((q) => q.id === key);
            const formattedSubField = formatFieldForEditor(
              { ...subField, value: draft.value[i][key] },
              site
            );

            return set(draft, `value.${i}.${key}`, formattedSubField.value);
          }
        });
      });
    });

    return nextFlexibleContentField;
  }

  return field;
}
