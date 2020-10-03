import React from 'react'

// import app components
import Header from './Header'

const PageWrapper = props => {
  const { children } = props

  return (
    <>
      <Header />

      {children}
    </>
  )
}

export default PageWrapper
