import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

// import app components
import PageWrapper from '../../PageWrapper'
import Edges from '../../Edges'
import Paper from '../../Paper'
import ActionBar from '../ActionBar'
import AddSite from '../forms/AddSite'

import { siteActions } from 'actions'
import { useStore } from 'store'

const Home = () => {
  const [
    {
      postState: { sites },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const loadSites = async () => {
      await siteActions.getSites({}, dispatch)
    }
    loadSites()
  }, [])

  return (
    <PageWrapper>
      <Edges size="md">
        <ActionBar>
          <Button
            children={`Add Site`}
            variant="contained"
            onClick={() =>
              dispatch({
                type: 'SET_DIALOG',
                payload: {
                  open: true,
                  component: <AddSite />,
                  width: 'xs',
                },
              })
            }
          />
        </ActionBar>

        {Object.keys(sites).map(key => {
          const { id, title, netlifyID } = sites[key]

          return (
            <StyledPaper key={id} onClick={() => navigate(`/app/site/${id}`)}>
              <h1 children={title} />

              {netlifyID && <img src={`https://api.netlify.com/api/v1/badges/${netlifyID}/deploy-status`} />}
            </StyledPaper>
          )
        })}
      </Edges>
    </PageWrapper>
  )
}

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export default Home
