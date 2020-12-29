export default function formatFieldsToProps(content) {
  const obj = {};

  if (content) {
    Object.keys(content).map((k) => (obj[k] = content[k].value));
  }

  return obj;
}
