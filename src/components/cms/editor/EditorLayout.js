import React from 'react'
import styled from 'styled-components'
import { Layout, Divider } from 'antd'

// import app components
import Sidebar from './sidebar/Sidebar'
import EditorHeader from './EditorHeader'
import Edges from 'components/Edges'

const EditorLayout = props => {
  const { children } = props

  return (
    <Layout>
      <Layout.Sider
        theme="light"
        width={300}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
        }}
      >
        <Sidebar />
      </Layout.Sider>

      <Layout style={{ paddingRight: 300 }}>
        <Layout.Header style={{ padding: 0 }}>
          <Edges size="md">
            <EditorHeader />
          </Edges>
        </Layout.Header>

        <Layout.Content>
          <StyledDivider />
          <Edges size="md">{children}</Edges>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

const StyledDivider = styled(Divider)`
  margin: 8px 0 32px;
`

export default EditorLayout
