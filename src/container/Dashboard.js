import React from 'react'
import styled from 'styled-components'

// import app components
import Layout from '../components/cms/Layout'

const Dashboard = props => {
  const { siteID } = props

  return (
    <>
      <Layout pageTitle={`Dashboard`}>
        <Container></Container>
      </Layout>
    </>
  )
}

const Container = styled.div``

export default Dashboard
