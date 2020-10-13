const fetch = require('node-fetch')

const transformSite = require('./utils/transformSite')

const graphqlEndpoint = `https://57nzp46d5jfaln3gizr6sjpeoy.appsync-api.ca-central-1.amazonaws.com/graphql`
const graphqlApiKey = `da2-ax4b7yn3v5arjgxqovk3yzo6mm`

exports.handler = async (event, context) => {
  const body = event.body
  const params = new URLSearchParams(body)

  const siteID = params.get('siteID')
  const apiKey = params.get('apiKey')

  if (!siteID) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Please provide a site ID` }),
    }
  }

  if (!apiKey) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Please provide an API Key` }),
    }
  }

  const result = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'x-api-key': graphqlApiKey },
    body: JSON.stringify({
      query: `{
          getSite(id: "${siteID}") {
            id
            title
            apiKey
            settings
            postTypes {
              items {
                id
                title
                slug
                posts {
                  items {
                    id
                    slug
                    postTypeID
                    parentID
                    status
                    title
                    content
                    seoTitle
                    seoDescription
                  }
                }
              }
            }
            forms {
              items {
                id
                title
                content
                settings
              }
            }
            mediaItems {
              items {
                id
                title
                storageKey
                altText
              }
            }
          }
        }`,
    }),
  })

  const {
    data: { getSite: site },
  } = await result.json()

  if (site.apiKey !== apiKey) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: `Not Authorized` }),
    }
  }

  const transformedSite = transformSite(site)

  return {
    statusCode: 200,
    body: JSON.stringify(transformedSite),
  }
}
