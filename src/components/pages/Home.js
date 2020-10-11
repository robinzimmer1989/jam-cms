import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { PageHeader, Space, Button, Card, Row, Col, Typography } from 'antd'

// import app components
import BaseLayout from 'components/BaseLayout'
import Edges from 'components/Edges'
import SiteForm from 'components/SiteForm'
import { siteActions } from 'actions'
import { useStore } from 'store'

const Home = () => {
  const [
    {
      cmsState: { sites },
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
              children={`Add Site`}
            />,
          ]}
        />

        <Space direction="vertical">
          {Object.keys(sites).map(key => {
            const { id, title, netlifyID, netlifyUrl } = sites[key]

            return (
              <Card
                key={id}
                title={title}
                extra={[<Button key="1" onClick={() => navigate(`/app/site/${id}`)} children={`Dashboard`} />]}
              >
                <Row>
                  <Col span={12}>
                    <Typography.Title level={5} children="Website" />
                    {netlifyUrl && <a href={netlifyUrl} target="_blank" rel="noopener" children={netlifyUrl} />}
                  </Col>
                  <Col span={6}>
                    <Typography.Title level={5} children="Status" />
                    {netlifyID && (
                      <img
                        src={`https://api.netlify.com/api/v1/badges/${netlifyID}/deploy-status`}
                        alt="Netlify Status"
                      />
                    )}
                  </Col>
                  <Col span={6}>
                    <Typography.Title level={5} children="Billing Information" />
                    <Typography children="..." />
                  </Col>
                </Row>
              </Card>
            )
          })}
        </Space>
      </Edges>
    </BaseLayout>
  )
}

export default Home
