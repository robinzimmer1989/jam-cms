import React, { useEffect, useState } from 'react'
import { Button, Card, Space, notification } from 'antd'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import Input from '../Input'
import CmsLayout from '../CmsLayout'

import { useStore } from '../../store'
import { siteActions } from '../../actions'

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
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    })
  }, [])

  const handleChange = (e) => {
    const nextSite = produce(site, (draft) => {
      return set(draft, `${e.target.name}`, e.target.value)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  const handleUpdate = async () => {
    const { id, title, netlifyBuildHook, netlifyBadgeImage, netlifyBadgeLink } = site

    setLoading('updateGeneralSettings')
    await siteActions.updateSite({ id, title, netlifyBuildHook, netlifyBadgeImage, netlifyBadgeLink }, dispatch)
    setLoading(null)

    notification.success({
      message: 'Success',
      description: 'Updated successfully',
      placement: 'bottomRight',
    })
  }

  return (
    <CmsLayout pageTitle={`General`}>
      <Space direction="vertical" size={20}>
        <Card title={`General`}>
          <Space direction="vertical" size={20}>
            <Input label="Title" value={site?.title} name="title" onChange={handleChange} />

            <Input label="Build Hook" value={site?.netlifyBuildHook} name="netlifyBuildHook" onChange={handleChange} />

            <Input
              label="Badge Image"
              value={site?.netlifyBadgeImage}
              name="netlifyBadgeImage"
              onChange={handleChange}
            />

            <Input label="Badge Link" value={site?.netlifyBadgeLink} name="netlifyBadgeLink" onChange={handleChange} />

            <Button
              loading={loading === 'updateGeneralSettings'}
              onClick={handleUpdate}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>
      </Space>
    </CmsLayout>
  )
}

export default GeneralSettings
