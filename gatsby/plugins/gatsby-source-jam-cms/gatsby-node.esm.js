const axios = require("axios")
const path = require("path")

exports.createPages = async ({ actions, reporter }, pluginOptions) => {
  const { createPage } = actions
  const { template } = pluginOptions

  const source = process.env.GATSBY_CMS_SOURCE
  const apiKey = process.env.GATSBY_CMS_API_KEY

  if (!source) {
    reporter.error("Source url is required")
    return
  }

  if (!apiKey) {
    reporter.error("Api key is required")
    return
  }

  let activity

  try {
    activity = reporter.activityTimer(`Fetching data...`)
    activity.start()

    const url = `${source.replace(/\/+$/, "")}/getBuildSite?apiKey=${apiKey}`
    const response = await axios.get(url)

    activity.end()

    const {
      data: { header, footer, posts },
    } = await response

    const templatePath = path.resolve(template)

    await Promise.all(
      posts &&
        posts.map(async (post) => {
          await createPage({
            path: post.slug,
            component: templatePath,
            context: {
              header,
              footer,
              post,
            },
          })
        })
    )
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message)
    }
  }
}
