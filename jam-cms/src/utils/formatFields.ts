// Format the fields object passed in via props to a more readable format
// For this we're transforming the arrays for post types and templates to objects with id keys
export default function formatFields(fields: any) {
  const formattedFields = {
    postTypes: {},
    taxonomies: fields?.taxonomies,
    themeOptions: fields?.themeOptions,
  };

  fields?.postTypes?.map((o: any) => {
    const templates = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    o?.templates?.map((p: any) => templates[p.id] = p);

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    formattedFields.postTypes[o.id] = { ...o, templates };
  });

  return formattedFields;
}
