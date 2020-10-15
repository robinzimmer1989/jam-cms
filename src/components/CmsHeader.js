import React from 'react'
import styled from 'styled-components'
import { PageHeader, Button, Tooltip, notification } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'

// import app components
import AvatarMenu from 'components/AvatarMenu'
import { siteActions } from 'actions'
import { useStore } from 'store'

const CmsHeader = props => {
  const { title, actionBar } = props

  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  const handleDeploy = async () => {
    if (!site?.settings?.frontPage) {
      return notification.error({
        message: 'Error',
        description: 'Please add a front page',
        placement: 'bottomRight',
      })
    }

    await siteActions.deploySite(site, dispatch)
  }

  const buttons = []

  if (actionBar === 'editor') {
    buttons.push(
      <Tooltip key={`view-fullscreen`} title={`Fullscreen`}>
        <Button
          onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: `fullscreen` })}
          icon={<FullscreenOutlined style={{ fontSize: '12px' }} />}
          shape="circle"
        />
      </Tooltip>
    )
  } else {
    if (site?.netlifyID) {
      buttons.push(
        <NetlifyStatus
          key="netlify-status"
          src={`https://api.netlify.com/api/v1/badges/${site.netlifyID}/deploy-status?key=${Math.floor(
            Math.random() * Math.floor(100)
          )}`}
        />,
        <Button key="netlify-deploy-button" size="small" children={`Deploy`} onClick={handleDeploy} />
      )
    }

    if (site?.netlifyUrl) {
      buttons.push(
        <Button key="visit-site-button" size="small" children={`Visit Site`} href={site?.netlifyUrl} target="_blank" />
      )
    }

    buttons.push(<AvatarMenu key="avatar-menu" />)
  }

  return <PageHeader title={title} extra={buttons} />
}

const NetlifyStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`

export default CmsHeader
