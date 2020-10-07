import React from 'react'
import Helmet from 'react-helmet'
import { ToastContainer } from 'react-toastify'

// import external css files
import 'react-toastify/dist/ReactToastify.css'
import 'minireset.css'
import 'react-sortable-tree/style.css'
import 'antd/dist/antd.css'

// import app components
import { StoreProvider } from 'store'
import { GlobalStyles } from 'theme'

const Layout = props => {
  const { children } = props

  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>

      <GlobalStyles />

      <StoreProvider>
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
      </StoreProvider>
    </>
  )
}

export default Layout
