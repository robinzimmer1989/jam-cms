import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader, Card } from 'antd'
import { Link } from 'gatsby'

// import app components
import CmsLayout from '../CmsLayout'

import getRoute from 'routes'
import { useStore } from 'store'

const SettingsTheme = () => {
  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  return (
    <CmsLayout pageTitle={`Theme`}>
      <PageHeader>
        <Link to={getRoute(`theme-editor`, { siteID })}>
          <Button children={`Open Editor`} type="primary" />
        </Link>
      </PageHeader>

      <Card title="Overview">...</Card>
    </CmsLayout>
  )
}

export default SettingsTheme
