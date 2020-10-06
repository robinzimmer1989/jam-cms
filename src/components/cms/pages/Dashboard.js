import React from 'react'
import styled from 'styled-components'

// import app components
import CmsLayout from '../CmsLayout'

const Dashboard = props => {
  const { siteID } = props

  return (
    <>
      <CmsLayout pageTitle={`Dashboard`}>
        <Container></Container>
      </CmsLayout>
    </>
  )
}

const Container = styled.div``

export default Dashboard
