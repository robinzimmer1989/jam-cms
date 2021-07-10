// Format the fields object passed in via props to a more readable format
// For this we're transforming the arrays for post types and templates to objects with id keys
export default function formatFields(fields) {
  const formattedFields = {
    postTypes: {},
    taxonomies: fields?.taxonomies,
    themeOptions: fields?.themeOptions,
  };

  fields?.postTypes?.map((o) => {
    const templates = {};
    o?.templates?.map((p) => (templates[p.id] = p));

    formattedFields.postTypes[o.id] = { ...o, templates };
  });

  return formattedFields;
}
