import slugify from 'slugify';

export default function formatSlug(slug, trailingSlash = false) {
  let formattedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });

  formattedSlug = formattedSlug
    .split('/')
    .filter((s) => !!s)
    .join('/');

  return trailingSlash ? `/${formattedSlug}` : formattedSlug;
}
