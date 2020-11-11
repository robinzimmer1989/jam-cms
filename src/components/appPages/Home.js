import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { PageHeader, Space, Button } from 'antd'

// import app components
import BaseLayout from '../BaseLayout'
import Edges from '../Edges'
import SiteForm from '../SiteForm'
import ListItem from '../ListItem'
import Loader from '../Loader'

import { siteActions } from '../../actions'
import { useStore } from '../../store'
import getRoute from '../../routes'

const Home = () => {
  const [
    {
      cmsState: { sites },
    },
    dispatch,
  ] = useStore()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadSites = async () => {
      // Directly redirect to site if env variable GATSBY_CMS_SITE_ID is enabled. We don't need to load it here, because it will be loaded in the next step.
      // Otherwise get all sites, but redirect if first site isn't multisite
      if (process.env.GATSBY_CMS_SITE_ID) {
        navigate(getRoute(`dashboard`, { siteID: process.env.GATSBY_CMS_SITE_ID }))
      } else {
        const result = await siteActions.getSites({}, dispatch)

        if (result.length > 0 && !result[0].multisite) {
          navigate(getRoute(`dashboard`, { siteID: sites[0].id }))
        }
      }

      setLoaded(true)
    }
    loadSites()
  }, [])

  return (
    <BaseLayout>
      {loaded ? (
        <Edges size="md">
          <PageHeader
            title="My Websites"
            extra={[
              <Button
                key="1"
                onClick={() =>
                  dispatch({
                    type: 'SET_DIALOG',
                    payload: {
                      open: true,
                      title: 'Add Website',
                      component: <SiteForm />,
                    },
                  })
                }
                type="primary"
                children={`Add Site`}
              />,
            ]}
          />

          <Space direction="vertical">
            {Object.keys(sites).map((key) => {
              const { id, title } = sites[key]

              return (
                <ListItem
                  key={id}
                  title={title}
                  actions={[
                    <Button
                      key="1"
                      onClick={() => navigate(getRoute(`dashboard`, { siteID: id }))}
                      children={`Dashboard`}
                    />,
                  ]}
                  link={getRoute(`dashboard`, { siteID: id })}
                  hideImage={true}
                />
              )
            })}
          </Space>
        </Edges>
      ) : (
        <Loader />
      )}
    </BaseLayout>
  )
}

export default Home
