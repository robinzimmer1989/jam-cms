import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'

import { useStore } from 'store'

const SettingsSeo = () => {
  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  return (
    <CmsLayout pageTitle={`SEO`}>
      <PageHeader>
        <Button children={`Add`} type="primary" />
      </PageHeader>
    </CmsLayout>
  )
}

export default SettingsSeo
