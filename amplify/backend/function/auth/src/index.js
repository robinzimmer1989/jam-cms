const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const graphqlEndpoint = `https://57nzp46d5jfaln3gizr6sjpeoy.appsync-api.ca-central-1.amazonaws.com/graphql`
  const apiKey = `da2-ax4b7yn3v5arjgxqovk3yzo6mm`

  const body = event.body
  const params = new URLSearchParams(body)
  const siteID = params.get('siteID')

  if (!siteID) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Please provide a siteID` }),
    }
  }

  const site = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: JSON.stringify({
      query: `{
          getSite(id: "${siteID}") {
            title
            postTypes {
              items {
                id
                title
              }
            }
            posts {
              items {
                id
                title
                slug
                content
              }
            }
          }
        }`,
    }),
  })

  const { data } = await site.json()

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
