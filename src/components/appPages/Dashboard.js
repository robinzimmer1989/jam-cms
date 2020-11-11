import React from 'react'
import styled from 'styled-components'

// import app components
import CmsLayout from '../CmsLayout'

import { useStore } from '../../store'

const Dashboard = () => {
  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore()

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
