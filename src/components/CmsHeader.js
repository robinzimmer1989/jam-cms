import React from 'react'
import styled from 'styled-components'
import { PageHeader, Button, notification } from 'antd'
import axios from 'axios'

// import app components
import ViewToggle from './ViewToggle'
import AvatarMenu from './AvatarMenu'
import { useStore } from '../store'

const CmsHeader = (props) => {
  const { title, actionBar } = props

  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore()

  const site = sites[siteID] || null

  const handleDeploy = async () => {
    if (!site?.frontPage) {
      return notification.error({
        message: 'Error',
        description: 'Please add a front page',
        placement: 'bottomRight',
      })
    }

    axios.post(site.deploymentBuildHook)
  }

  const buttons = []

  if (actionBar === 'editor') {
    buttons.push(<ViewToggle key={'view-toggle'} />)
  } else {
    if (site?.deploymentBadgeImage) {
      buttons.push(
        <DeploymentStatus
          key="deployment-status"
          src={`${site.deploymentBadgeImage}?key=${Math.floor(Math.random() * Math.floor(100))}`}
        />
      )
    }

    if (site?.deploymentBuildHook) {
      buttons.push(<Button key="deployment-button" size="small" children={`Deploy`} onClick={handleDeploy} />)
    }

    if (site?.frontendUrl) {
      buttons.push(
        <Button key="visit-site-button" size="small" children={`Visit Site`} href={site?.frontendUrl} target="_blank" />
      )
    }

    buttons.push(<AvatarMenu key="avatar-menu" />)
  }

  return <PageHeader title={title} extra={buttons} />
}

const DeploymentStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`

export default CmsHeader
