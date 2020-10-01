import React from 'react'
import Helmet from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'minireset.css'

// import app components
import { StoreProvider } from '../store'
import { mui, typography, GlobalStyles } from '../theme'
import Header from './Header'

const Layout = props => {
  const { children } = props

  return (
    <>
      <Helmet title={``} meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}>
        <html lang="en" />

        {typography.injectStyles()}
      </Helmet>

      <GlobalStyles />

      <StoreProvider>
        <MuiThemeProvider theme={mui}>{children}</MuiThemeProvider>
      </StoreProvider>
    </>
  )
}

export default Layout
