import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import AvatarIcon from 'react-ionicons/lib/IosPersonOutline'

// import app components
import Menu from './Menu'
import { logout, isLoggedIn } from '../utils/auth'

const Header = () => {
  const handleSignOut = async () => {
    await Auth.signOut()

    logout(() => navigate('/app/login'))
  }

  return (
    <Container>
      <Grid>
        <Logo to="/">Gatsby CMS</Logo>

        {isLoggedIn() ? (
          <div>
            <Menu
              items={[
                {
                  text: `Profile`,
                  onClick: () => navigate(`/app/profile`),
                },
                {
                  text: `Sign Out`,
                  onClick: handleSignOut,
                },
              ]}
            >
              <IconButton>
                <AvatarIcon />
              </IconButton>
            </Menu>
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
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  width: 250px;
  height: 100%;
  padding: 0 20px;
  background: #fff;
`

export default Header
