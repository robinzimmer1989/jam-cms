import React, { useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { Button, ListItem, ListItemText } from '@material-ui/core'

// import app components
import Sidebar from '../components/cms/Sidebar'
import AddPost from '../components/forms/AddPost'
import { postActions } from '../actions'
import { useStore } from '../store'

const Collections = props => {
  const { siteID, postTypeID } = props

  const [
    {
      postState: { sites },
    },
    dispatch,
  ] = useStore()

  const posts = sites[siteID].postTypes.items.find(o => o.id === postTypeID).posts.items

  useEffect(() => {
    // const loadPosts = async () => {
    //   await postActions.getPosts({ siteID, postTypeID }, dispatch)
    // }
    // loadPosts()
  }, [postTypeID])

  return (
    <>
      <Sidebar>
        <Container>
          <Button
            children={`Add`}
            onClick={() =>
              dispatch({
                type: 'SET_DIALOG',
                payload: {
                  open: true,
                  component: <AddPost siteID={siteID} postTypeID={postTypeID} />,
                  width: 'xs',
                },
              })
            }
            variant="contained"
          />
          {posts &&
            posts.map(o => {
              return (
                <ListItem button key={o.id} onClick={() => navigate(`/app/site/${siteID}/collections/${postTypeID}/${o.id}`)}>
                  <ListItemText primary={o.title} secondary={o.slug} />
                </ListItem>
              )
            })}
        </Container>
      </Sidebar>
    </>
  )
}

const Container = styled.div``

export default Collections
