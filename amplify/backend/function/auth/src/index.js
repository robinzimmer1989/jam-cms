const fetch = require('node-fetch')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const graphqlEndpoint = `https://57nzp46d5jfaln3gizr6sjpeoy.appsync-api.ca-central-1.amazonaws.com/graphql`
const apiKey = `da2-ax4b7yn3v5arjgxqovk3yzo6mm`
const bucket = `my-aws-project7deb432f10d54bd29e13786dda5e7f97project-gatsbycms`

exports.handler = async (event, context) => {
  const body = event.body
  const params = new URLSearchParams(body)
  const siteID = params.get('siteID')

  if (!siteID) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Please provide a siteID` }),
    }
  }

  const result = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: JSON.stringify({
      query: `{
          getSite(id: "${siteID}") {
            id
            title
            postTypes {
              items {
                id
                title
                slug
                posts {
                  items {
                    id
                    title
                    slug
                    content
                  }
                }
              }
            }
          }
          listMediaItems(filter: {siteID: {eq: "${siteID}"}}) {
            items {
              id
              title
              storageKey
            }
          }
        }`,
    }),
  })

  const {
    data: {
      getSite: site,
      listMediaItems: { items: mediaItems },
    },
  } = await result.json()

  const mediaItemsWithUrls = mediaItems.map(o => {
    const url = s3.getSignedUrl('getObject', { Bucket: bucket, Key: `public/${o.storageKey}` })
    return { ...o, url }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ site, mediaItems: mediaItemsWithUrls }),
  }
}
