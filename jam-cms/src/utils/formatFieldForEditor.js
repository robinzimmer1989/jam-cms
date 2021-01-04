import { set } from 'lodash';
import produce from 'immer';

import generateSlug from './generateSlug';

// This function formats the value for the editor.
// Especially for collections this ie necessary, because the value is stored as a string
// and the post elements are added on the fly

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

  if (field.type === 'group') {
    const nextGroupField = produce(field, (draft) => {
      Object.keys(draft.value).map((key) => {
        const subField = draft.fields.find((p) => p.id === key);

        const formattedSubField = formatFieldForEditor(
          { ...subField, value: draft.value[key] },
          site
        );

        return set(draft, `value.${key}`, formattedSubField.value);
      });
    });

    return nextGroupField;
  }

  if (field.type === 'repeater') {
    if (!field.value) {
      return { ...field, value: [] };
    }

    const nextRepeaterField = produce(field, (draft) => {
      draft.value.map((o, i) => {
        Object.keys(o).map((key) => {
          const subField = draft.items.find((p) => p.id === key);

          const formattedSubField = formatFieldForEditor(
            { ...subField, value: draft.value[i][key] },
            site
          );

          return set(draft, `value.${i}.${key}`, formattedSubField.value);
        });
      });
    });

    return nextRepeaterField;
  }

  if (field.type === 'flexible_content') {
    if (!field.value) {
      return { ...field, value: [] };
    }

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
