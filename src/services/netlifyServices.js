import NetlifyAPI from 'netlify'

const client = new NetlifyAPI(process.env.GATSBY_NETLIFY_API_KEY)

export const addSite = async ({ siteID }) => {
  // https://open-api.netlify.com/#/default/createSite
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
        },
      },
    },
  })

  return site
}
