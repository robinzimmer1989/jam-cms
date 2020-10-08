import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'

import { useStore } from 'store'

const SettingsTheme = () => {
  const [
    {
      postState: { siteID, sites },
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

export default SettingsTheme
