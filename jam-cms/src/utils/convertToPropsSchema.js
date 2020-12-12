export default function convertToPropsSchema(blocks) {
  return blocks.map((o) => {
    const data = {};
    Object.values(o.fields).map((o) => (data[o.id] = o.value));

    return {
      id: o.id,
      data,
    };
  });
}
