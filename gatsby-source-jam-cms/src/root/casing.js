const casing = (string, type = 'camel') => {
  if (!string) {
    return '';
  }

  string = string.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

  string = string.substr(0, 1).toLowerCase() + string.substr(1);

  if (type === 'pascal') {
    string = string.charAt(0).toUpperCase() + string.slice(1);
  }

  return string;
};

export default casing;
