import React from 'react'
import styled from 'styled-components'

// import app components
import CmsLayout from '../CmsLayout'
import GeneralSettings from '../GeneralSettings'

const Settings = props => {
  return (
    <CmsLayout pageTitle={`Settings`}>
      <GeneralSettings />
    </CmsLayout>
  )
}

const Container = styled.div``

export default Settings
