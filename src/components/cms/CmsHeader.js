import React from 'react'
import styled from 'styled-components'
import { PageHeader, Button } from 'antd'

// import app components
import { siteActions } from 'actions'
import { useStore } from 'store'

const CmsHeader = props => {
  const { title } = props

  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  const handleDeploy = async () => {
    await siteActions.deploySite(site, dispatch)
  }

  const buttons = []

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

  return <PageHeader title={title} extra={buttons} />
}

const NetlifyStatus = styled.img`
  height: 16px;
  margin: 0 10px;
`

export default CmsHeader
