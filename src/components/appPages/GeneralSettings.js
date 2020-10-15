import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { Button, Card, Popconfirm, Space, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import Input from 'components/Input'
import CmsLayout from 'components/CmsLayout'

import { useStore } from 'store'
import { netlifyServices } from 'services'
import { siteActions } from 'actions'

const GeneralSettings = () => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const [loading, setLoading] = useState(null)

  useEffect(() => {
    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch)
  }, [])

  const handleChange = e => {
    const nextSite = produce(site, draft => {
      return set(draft, `${e.target.name}`, e.target.value)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  const handleUpdateTitle = async () => {
    const { id, title } = site

    setLoading('updateTitle')
    await siteActions.updateSite({ id, title }, dispatch)
    setLoading(null)
  }

  const handleUpdateCustomDomain = async () => {
    const { id, customDomain, netlifyID } = site

    setLoading('updateDomain')

    const netlifyResult = await netlifyServices.updateSite({ netlifyID, siteID: id, customDomain })

    if (netlifyResult?.code === 200 || netlifyResult?.code === 201) {
      const result = await siteActions.updateSite({ id, netlifyID, customDomain }, dispatch)

      if (result?.data?.updateSite) {
        siteActions.addSiteToEditor({ site: result.data.updateSite }, dispatch)
      }
    }

    setLoading(null)
  }

  const handleDelete = async () => {
    const { id } = site

    setLoading('delete')
    const result = await siteActions.deleteSite({ id }, dispatch)
    setLoading(null)

    if (result?.data?.deleteSite) {
      navigate(`/app`)
    }
  }

  const handleUpdateApiKey = async () => {
    const { id, netlifyID } = site

    const apiKey = uuidv4()

    setLoading('generateApiKey')

    const netlifyResult = await netlifyServices.updateSite({ netlifyID, siteID: id, apiKey })

    if (netlifyResult?.code === 200 || netlifyResult?.code === 201) {
      const result = await siteActions.updateSite({ id, netlifyID, apiKey }, dispatch)

      if (result?.data?.updateSite) {
        siteActions.addSiteToEditor({ site: result.data.updateSite }, dispatch)
      }
    }
    setLoading(null)
  }

  return (
    <CmsLayout pageTitle={`General`}>
      <Space direction="vertical" size={20}>
        <Card title={`General`}>
          <Space direction="vertical" size={20}>
            <Input label="Title" value={site?.title} name="title" onChange={handleChange} />
            <Button
              loading={loading === 'updateTitle'}
              onClick={handleUpdateTitle}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={`Domain Management`}>
          <Space direction="vertical" size={20}>
            <Input label="Development Domain" value={site?.netlifyUrl} readOnly />
            <Input label="Custom Domain" value={site?.customDomain} name="customDomain" onChange={handleChange} />

            {sites[siteID].customDomain && (
              <Space direction="vertical">
                <Typography
                  children={`Create an A record for ${sites[siteID].customDomain} pointing to our load balancer’s IP address 104.198.14.52.`}
                />
                <Typography.Text code children={`${sites[siteID].customDomain} A 104.198.14.52`} />
              </Space>
            )}
            <Button
              loading={loading === 'updateDomain'}
              onClick={handleUpdateCustomDomain}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={`Security`}>
          <Space direction="vertical" size={20}>
            <Input label="API Key" value={site?.apiKey} readOnly />
            <Space>
              <Button
                loading={loading === 'generateApiKey'}
                onClick={handleUpdateApiKey}
                children={`Generate`}
                type="primary"
              />
            </Space>
          </Space>
        </Card>

        <Card title={`Danger Zone`}>
          <Popconfirm title="Are you sure?" onConfirm={handleDelete} okText="Yes" cancelText="No">
            <Button loading={loading === 'delete'} children={`Delete Site`} type="primary" danger />
          </Popconfirm>
        </Card>
      </Space>
    </CmsLayout>
  )
}

export default GeneralSettings
