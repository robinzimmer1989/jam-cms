import slugify from 'slugify'

export default function(slug) {
  let formattedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g })

  formattedSlug = formattedSlug
    .split('/')
    .filter(s => !!s)
    .join('/')

  formattedSlug = `/${formattedSlug}`

  return formattedSlug
}
