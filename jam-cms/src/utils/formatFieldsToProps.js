import formatFieldForEditor from './formatFieldForEditor';

export default function formatFieldsToProps(content, site) {
  const obj = {};

  if (content) {
    Object.keys(content).map((k) => {
      const formattedField = formatFieldForEditor(content[k], site);
      return (obj[k] = formattedField.value);
    });
  }

  return obj;
}
