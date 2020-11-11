import React from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'

import { useStore } from '../../store'

const SettingsSeo = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  return (
    <CmsLayout pageTitle={`SEO`}>
      <PageHeader></PageHeader>
    </CmsLayout>
  )
}

export default SettingsSeo
