import React from 'react'
import styled from 'styled-components'
import { Layout, Divider } from 'antd'

// import app components
import EditorHeader from './EditorHeader'
import Edges from 'components/Edges'

const EditorLayout = props => {
  const { sidebar, backLink, children } = props

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
        {sidebar}
      </Layout.Sider>

      <Layout style={{ paddingRight: 300 }}>
        <Layout.Header style={{ padding: 0 }}>
          <Edges size="md">
            <EditorHeader backLink={backLink} />
          </Edges>
        </Layout.Header>

        <Layout.Content>
          <Divider style={{ margin: '8px 0 32px' }} />
          <Edges size="md">{children}</Edges>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default EditorLayout
