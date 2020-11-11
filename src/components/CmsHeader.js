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

    axios.post(site.netlifyBuildHook)
  }

  const buttons = []

  if (actionBar === 'editor') {
    buttons.push(<ViewToggle key={'view-toggle'} />)
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
