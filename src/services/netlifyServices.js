import NetlifyAPI from 'netlify'

const client = new NetlifyAPI(process.env.GATSBY_NETLIFY_API_KEY)
// https://open-api.netlify.com/#/default/createSite

export const addSite = async ({ siteID, apiKey }) => {
  try {
    const site = await client.createSite({
      body: {
        repo: {
          id: 298647592,
          provider: 'github',
          repo_path: 'robinzimmer1989/gatsby-cms-client',
          repo_branch: 'master',
          repo_url: 'https://github.com/robinzimmer1989/gatsby-cms-client',
          public_repo: true,
          cmd: 'yarn build',
          dir: 'public',
        },
        build_settings: {
          env: {
            GATSBY_SITE_ID: siteID,
            GATSBY_API_KEY: apiKey,
          },
        },
      },
    })
    return site
  } catch (err) {
    console.log(err)
    return err
  }
}

export const updateSite = async ({ netlifyID, siteID, apiKey, customDomain }) => {
  try {
    const site = await client.updateSite({
      site_id: netlifyID,
      body: {
        custom_domain: customDomain,
        build_settings: {
          env: {
            GATSBY_SITE_ID: siteID,
            GATSBY_API_KEY: apiKey,
          },
        },
      },
    })

    return site
  } catch (err) {
    console.log(err)
    return err
  }
}

export const deleteSite = async ({ netlifyID }) => {
  try {
    const site = await client.deleteSite({ site_id: netlifyID })
    return site
  } catch (err) {
    console.log(err)
    return err
  }
}

export const deploySite = async ({ netlifyID }) => {
  try {
    const site = await client.createSiteBuild({ site_id: netlifyID })
    return site
  } catch (err) {
    console.log(err)
    return err
  }
}
