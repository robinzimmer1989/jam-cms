import React from 'react'
import styled from 'styled-components'

// import app components
import Sidebar from '../components/cms/Sidebar'
import { useStore } from '../store'

const Settings = props => {
  const { siteID } = props

  const [
    {
      postState: { sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  return (
    <Sidebar>
      <Container>Settings</Container>
    </Sidebar>
  )
}

const Container = styled.div``

export default Settings
