import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Button } from '@material-ui/core'

// import app components
import Layout from '../Layout'
import AddPost from '../forms/AddPost'
import ActionBar from '../ActionBar'
import Paper from '../../Paper'

import { postActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'

const Collections = props => {
  const { siteID, postTypeID } = props

  const [
    {
      postState: { sites },
    },
    dispatch,
  ] = useStore()

  const postType = sites[siteID]?.postTypes?.items.find(o => o.id === postTypeID)
  const title = postType?.title
  const posts = postType?.posts?.items

  useEffect(() => {
    // const loadPosts = async () => {
    //   await postActions.getPosts({ siteID, postTypeID }, dispatch)
    // }
    // loadPosts()
  }, [postTypeID])

  const handleAddPost = async (title, slug) => {
    await postActions.addPost({ siteID, postTypeID, status: `draft`, title, slug }, dispatch)
  }

  return (
    <Layout pageTitle={title}>
      <ActionBar>
        <Button
          children={`Add`}
          onClick={() =>
            dispatch({
              type: 'SET_DIALOG',
              payload: {
                open: true,
                component: <AddPost onSubmit={handleAddPost} />,
                width: 'xs',
              },
            })
          }
          variant="contained"
        />
      </ActionBar>

      {posts &&
        posts.map(o => {
          return (
            <ListItem key={o.id} to={`/app/site/${siteID}/collections/${postTypeID}/${o.id}`}>
              <Paper>
                <ListItemTitle children={o.title} />
                <ListItemText children={o.slug} />
              </Paper>
            </ListItem>
          )
        })}
    </Layout>
  )
}

const ListItem = styled(Link)`
  display: block;
  width: 100%;
  margin-bottom: 20px;
`

const ListItemTitle = styled.h4`
  margin-bottom: 2px;
`

const ListItemText = styled.span`
  color: ${colors.text.light};
`

export default Collections
