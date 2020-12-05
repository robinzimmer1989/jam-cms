export default function convertToPropsSchema(blocks) {
  return blocks.map((o) => {
    const data = {};
    o.fields.forEach((o) => (data[o.id] = o.value));

    return {
      id: o.id,
      data,
    };
  });
}
