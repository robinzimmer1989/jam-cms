import React from 'react'
import Helmet from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'

// import external css files
import 'react-toastify/dist/ReactToastify.css'
import 'minireset.css'
import 'react-sortable-tree/style.css'

// import app components
import { StoreProvider } from 'store'
import { mui, typography, GlobalStyles } from 'theme'

const Layout = props => {
  const { children } = props

  return (
    <>
      <Helmet>
        <html lang="en" />
        {typography.injectStyles()}
      </Helmet>

      <GlobalStyles />

      <StoreProvider>
        <MuiThemeProvider theme={mui}>
          {children}

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MuiThemeProvider>
      </StoreProvider>
    </>
  )
}

export default Layout
