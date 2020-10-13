const slugify = require('slugify')

const formatSlug = slug => {
  let formattedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g })

  formattedSlug = formattedSlug
    .split('/')
    .filter(s => !!s)
    .join('/')

  formattedSlug = `/${formattedSlug}`

  return formattedSlug
}

module.exports = formatSlug
