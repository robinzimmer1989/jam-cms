import formatFieldForEditor from './formatFieldForEditor';

export default function formatFieldsToProps({ global, globalOptions, content, site, template }) {
  const obj = {};

  // We'll loop through the template fields because this is the source of truth.
  // The content could be empty(initially) or the field schema has changed in the meantime.
  // However, in case there is no template (i.e. taxonomy single page), we need to loop through the globalOptions instead.
  template?.fields
    ? template.fields
        .filter((o) => !!o.global === global)
        .map((o) => {
          let field;

          // Then we'll grab the field information from the content and alternativly from the globalOptions array or the template itself.
          // This is necessary for initial content loading.

          if (o.global) {
            field = content[o.id] || globalOptions.find((p) => p.id === o.id);
          } else {
            field = content[o.id] || o;
          }

          const formattedField = formatFieldForEditor({ field, site });

          return (obj[o.id] = formattedField?.value);
        })
    : globalOptions &&
      globalOptions.map((o) => {
        const formattedField = formatFieldForEditor({ field: content?.[o.id] || o, site });

        return (obj[o.id] = formattedField?.value);
      });

  return obj;
}
