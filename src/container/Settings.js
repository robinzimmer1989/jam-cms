import React from 'react'
import styled from 'styled-components'

// import app components
import Layout from '../components/cms/Layout'
import GeneralSettings from '../components/cms/GeneralSettings'

const Settings = props => {
  return (
    <Layout pageTitle={`Settings`}>
      <GeneralSettings />
    </Layout>
  )
}

const Container = styled.div``

export default Settings
