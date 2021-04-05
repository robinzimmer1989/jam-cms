import { set } from 'lodash';
import produce from 'immer';

// This function formats the value for the editor.

export default function formatFieldForEditor(field, site) {
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
