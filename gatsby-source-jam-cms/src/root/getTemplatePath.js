const getTemplatePath = (directory, { prefix, template }) => {
  const templatePath = directory.find(
    (s) => s.includes(prefix) && s.includes(`${template.toLowerCase()}.`)
  );

  return templatePath;
};

export default getTemplatePath;
