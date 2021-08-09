const casing = (string, type = 'camel') => {
  if (!string) {
    return '';
  }

  string = string.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

  if (type === 'pascal') {
    string = string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    string = string.charAt(0).toLowerCase() + string.slice(1);
  }

  return string;
};

export default casing;
