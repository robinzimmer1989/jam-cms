import React from 'react'
import styled from 'styled-components'

// import app components
import Sidebar from './sidebar/Sidebar'
import TopBar from './TopBar'
import Edges from 'components/Edges'

const Layout = props => {
  const { children } = props

  return (
    <Container>
      <Sidebar />
      <Content>
        <TopBar />

        <Edges size="md">{children}</Edges>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding-right: 250px;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
`

export default Layout
