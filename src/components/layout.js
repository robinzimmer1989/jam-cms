import React from 'react'
import Helmet from 'react-helmet'
import 'minireset.css'

// import app components
import { StoreProvider } from '../store'
import Header from './Header'

const Layout = props => {
  const { children } = props

  return (
    <>
      <Helmet
        title={``}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <StoreProvider>
        <>
          <Header />
          {children}
        </>
      </StoreProvider>
    </>
  )
}

export default Layout
