import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { Button, Card, Popconfirm, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import Input from 'components/Input'
import CmsLayout from 'components/CmsLayout'

import { useStore } from 'store'
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

    setLoading('generateApiKey')
    await siteActions.updateSite({ id, netlifyID, apiKey: uuidv4() }, dispatch)
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
            <Input label="Custom Domain" value={site?.customURL} name="customURL" onChange={handleChange} />
            {/* <Button loading={loading === 'updateDomain'} onClick={handleUpdateTitle} children={`Update`} type="primary" /> */}
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
