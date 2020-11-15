import React from 'react'

// import external css files
import 'minireset.css'
import 'antd/dist/antd.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js-image-plugin/lib/plugin.css'

// import app components
import Master from './src/components/Master'
import { StoreProvider } from './src/store'
import { GlobalStyles } from './src/theme'

const Layout = (props) => {
  const { theme, blocks } = props

  return (
    <>
      <GlobalStyles />

      <StoreProvider>
        <Master theme={theme} blocks={blocks} />
      </StoreProvider>
    </>
  )
}

export default Layout
