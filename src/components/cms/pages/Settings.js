import React from 'react'
import styled from 'styled-components'

// import app components
import CmsLayout from '../CmsLayout'
import General from '../settings/General'

const Settings = props => {
  return (
    <CmsLayout pageTitle={`Settings`}>
      <General />
    </CmsLayout>
  )
}

const Container = styled.div``

export default Settings
