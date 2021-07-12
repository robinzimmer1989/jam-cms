// Format the fields object passed in via props to a more readable format
// For this we're transforming the arrays for post types and templates to objects with id keys
export default function formatFields(fields: any) {
  const formattedFields = {
    postTypes: {},
    taxonomies: fields?.taxonomies,
    themeOptions: fields?.themeOptions,
  } as any;

  fields?.postTypes?.map((o: any) => {
    const templates = {} as any;
    o?.templates?.map((p: any) => (templates[p.id] = p));

    formattedFields.postTypes[o.id] = { ...o, templates };
  });

  return formattedFields;
}
