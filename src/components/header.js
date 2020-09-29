import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Auth } from 'aws-amplify'

// import app components
import { logout, isLoggedIn } from '../utils/auth'

const Header = () => {
  const handleSignOut = async () => {
    await Auth.signOut()

    logout(() => navigate('/app/login'))
  }

  return (
    <Container>
      <Grid>
        <Link to="/">Gatsby CMS</Link>

        {isLoggedIn() ? (
          <div>
            <Link to={`/app/profile`} children={`Profile`} />
            <Link to={`/app`} children={`My Websites`} />
            <Button onClick={handleSignOut} children={`Sign Out`} />
          </div>
        ) : (
          <div>
            <Link to={`/app/signup`}>Sign Up</Link>
            <Link to={`/app/login`}>Sign In</Link>
          </div>
        )}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 20px;
  background: #f7f7f7;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`

export default Header
