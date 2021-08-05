import fs from 'fs';

const getTemplatePath = ({ prefix, template }) => {
  const base = './src/templates';

  if (!fs.existsSync(`${base}/${prefix}`) || !template) {
    return null;
  }

  // Make sure template path is lowercase
  const templateName = template.toLowerCase();

  let path = '';

  try {
    // Option 1: Templates can be stored in i.e. 'src/templates/postTypes/page/default.tsx'
    fs.readdirSync(`${base}/${prefix}`).forEach((file) => {
      if (file.includes(`${templateName}.`)) {
        path = `${base}/${prefix}/${file}`;
      }
    });

    if (path) {
      return path;
    }
  } catch (err) {}

  try {
    // Option 2: Templates can be stored in i.e. 'src/templates/postTypes/page/default/default.tsx'
    fs.readdirSync(`${base}/${prefix}/${templateName}`).forEach((file) => {
      if (file.includes(`${templateName}.`)) {
        path = `${base}/${prefix}/${templateName}/${file}`;
      }
    });

    if (path) {
      return path;
    }
  } catch (err) {}

  return null;
};

export default getTemplatePath;
