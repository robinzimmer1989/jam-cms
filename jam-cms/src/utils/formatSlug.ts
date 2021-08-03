import slugify from 'slugify';

export default function formatSlug(slug: string, leadingSlash = false, trailingSlash = false) {
  let formattedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });

  formattedSlug = formattedSlug
    .split('/')
    .filter((s) => !!s)
    .join('/');

  if (formattedSlug.substr(1) !== '/' && leadingSlash) {
    formattedSlug = `/${formattedSlug}`;
  }

  if (formattedSlug.substr(-1) !== '/' && trailingSlash) {
    formattedSlug = `${formattedSlug}/`;
  }

  return formattedSlug;
}
