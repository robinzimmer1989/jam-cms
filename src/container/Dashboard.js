import React from 'react'
import styled from 'styled-components'

// import app components
import Sidebar from '../components/cms/Sidebar'

const Dashboard = props => {
  const { siteID } = props

  return (
    <>
      <Sidebar>
        <Container>Dashboard</Container>
      </Sidebar>
    </>
  )
}

const Container = styled.div``

export default Dashboard
