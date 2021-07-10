import slugify from 'slugify';

export default function formatSlug(slug: any, trailingSlash = false) {
  let formattedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });

  formattedSlug = formattedSlug
    .split('/')
    .filter((s) => !!s)
    .join('/');

  if (formattedSlug.substr(-1) !== '/') {
    formattedSlug = `${formattedSlug}/`;
  }

  if (trailingSlash) {
    formattedSlug = `/${formattedSlug}`;
  }

  return formattedSlug;
}
