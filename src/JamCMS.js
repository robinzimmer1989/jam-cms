import React from 'react'
import { ThemeProvider } from 'styled-components'

// import external css files
import 'minireset.css'
import 'antd/dist/antd.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js/dist/Draft.css'

// import app components
import Master from './components/Master'
import { StoreProvider } from './store'
import { CmsStyles } from './theme'

const Index = (props) => {
  const { theme, blocks } = props

  return (
    <>
      <CmsStyles />

      <ThemeProvider theme={theme || {}}>
        <StoreProvider>
          <Master theme={theme} blocks={blocks} />
        </StoreProvider>
      </ThemeProvider>
    </>
  )
}

export default Index
