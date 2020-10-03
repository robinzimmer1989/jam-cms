import React from 'react'
import styled from 'styled-components'
import { IconButton, Button } from '@material-ui/core'
import ViewIcon from 'react-ionicons/lib/IosEye'

// import app components
import { siteActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'

const Header = props => {
  const { pageTitle } = props

  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  const handleDeploy = async () => {
    await siteActions.deploySite(site, dispatch)
  }

  return (
    <Container>
      <Grid>
        {pageTitle && <Title children={pageTitle} />}
        <Grid>
          {site?.netlifyID && (
            <NetlifyStatus src={`https://api.netlify.com/api/v1/badges/${site.netlifyID}/deploy-status`} />
          )}
          {site?.netlifyID && <Button children={`Deploy`} onClick={handleDeploy} />}
          {site?.netlifyUrl && (
            <a href={site?.netlifyUrl} target="_blank" rel="noopener">
              <IconButton>
                <ViewIcon />
              </IconButton>
            </a>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid ${colors.background.dark};
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  font-size: 24px;
  margin-right: 10px;
`

const NetlifyStatus = styled.img`
  height: 16px;
  margin: 0 10px 0 0;
`

export default Header
