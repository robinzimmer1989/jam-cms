import formatFieldForEditor from './formatFieldForEditor';

export default function formatFieldsToProps({
  global,
  themeOptions,
  content,
  site,
  template,
}: any) {
  const obj = {} as any;

  // We'll loop through the template fields because this is the source of truth.
  // The content could be empty(initially) or the field schema has changed in the meantime.
  // However, in case there is no template (i.e. taxonomy single page), we need to loop through the themeOptions instead.
  template?.fields && !global
    ? template.fields
        .filter((o: any) => !!o.global === false)
        .map((o: any) => {
          let field;

          // Then we'll grab the field information from the content and alternativly from the themeOptions array or the template itself.
          // This is necessary for initial content loading.

          if (o.global) {
            field = content[o.id] || themeOptions.find((p: any) => p.id === o.id);
          } else {
            field = content[o.id] || o;
          }

          const formattedField = formatFieldForEditor({ field, site });

          return (obj[o.id] = formattedField?.value);
        })
    : themeOptions &&
      themeOptions.map((o: any) => {
        const formattedField = formatFieldForEditor({ field: content?.[o.id] || o, site });

        return (obj[o.id] = formattedField?.value);
      });

  return obj;
}
