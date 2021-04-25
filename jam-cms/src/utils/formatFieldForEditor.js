import { set } from 'lodash';
import produce from 'immer';

// This function formats the value for the editor.

export default function formatFieldForEditor({ field, site }) {
  if (field?.type === 'group') {
    const nextGroupField = produce(field, (draft) => {
      // On initial load the field won't have a value (assigned in database)
      // If this is the case we use the defaultValue or null instead
      if (draft.value) {
        // If it has a value, we want to loop through each subfield and check recursively (group items can be another group or repeater or fc)
        Object.keys(draft.value).map((key) => {
          const subField = draft.fields.find((p) => p.id === key);

          const formattedSubField = formatFieldForEditor({
            field: { ...subField, value: draft.value[key] },
            site,
          });

          return set(draft, `value.${key}`, formattedSubField.value);
        });
      } else {
        draft.fields.map((o) => set(draft, `value.${o.id}`, o.defaultValue || null));
      }
    });

    return nextGroupField;
  }

  if (field?.type === 'repeater') {
    if (!field.value) {
      return { ...field, value: [] };
    }

    const nextRepeaterField = produce(field, (draft) => {
      draft.value.map((o, i) => {
        Object.keys(o).map((key) => {
          const subField = draft.items.find((p) => p.id === key);

          const formattedSubField = formatFieldForEditor({
            field: { ...subField, value: draft.value[i][key] },
            site,
          });

          return set(draft, `value.${i}.${key}`, formattedSubField.value);
        });
      });
    });

    return nextRepeaterField;
  }

  if (field?.type === 'flexible_content') {
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
            const formattedSubField = formatFieldForEditor({
              field: { ...subField, value: draft.value[i][key] },
              site,
            });

            return set(draft, `value.${i}.${key}`, formattedSubField.value);
          }
        });
      });
    });

    return nextFlexibleContentField;
  }

  return field;
}
