import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { List, ListItem, ListItemText, Button } from '@material-ui/core'

// import app components
import Edges from '../components/Edges'
import AddSite from '../components/forms/AddSite'
import { siteActions } from '../actions'
import { useStore } from '../store'

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
    <Edges size="lg">
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

      <List>
        {Object.keys(sites).map(key => {
          const { id, title, netlifyID } = sites[key]

          return (
            <ListItem button key={id} onClick={() => navigate(`/app/site/${id}`)}>
              <ListItemText children={title} />

              {netlifyID && <img src={`https://api.netlify.com/api/v1/badges/${netlifyID}/deploy-status`} />}
            </ListItem>
          )
        })}
      </List>
    </Edges>
  )
}

export default Home
