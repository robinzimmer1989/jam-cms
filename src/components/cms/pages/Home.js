import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { PageHeader, Space, Button, Card } from 'antd'

// import app components
import BaseLayout from 'components/BaseLayout'
import Edges from 'components/Edges'

import SiteForm from '../forms/SiteForm'

import { siteActions } from 'actions'
import { useStore } from 'store'

const Home = () => {
  const [
    {
      postState: { sites },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const loadSites = async () => {
      await siteActions.getSites({}, dispatch)
    }
    loadSites()
  }, [])

  return (
    <BaseLayout>
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
              children={`Add`}
            />,
          ]}
        />

        <Space direction="vertical">
          {Object.keys(sites).map(key => {
            const { id, title, netlifyID } = sites[key]

            return (
              <Card key={id} title={title} onClick={() => navigate(`/app/site/${id}`)}>
                {netlifyID && <img src={`https://api.netlify.com/api/v1/badges/${netlifyID}/deploy-status`} />}
              </Card>
            )
          })}
        </Space>
      </Edges>
    </BaseLayout>
  )
}

export default Home
