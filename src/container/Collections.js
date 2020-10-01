import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Button } from '@material-ui/core'

// import app components
import Layout from '../components/cms/Layout'
import AddPost from '../components/forms/AddPost'
import Paper from '../components/Paper'
import { postActions } from '../actions'
import { useStore } from '../store'
import { colors } from '../theme'

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

  return (
    <Layout pageTitle={title}>
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

      <Paper>
        {posts &&
          posts.map(o => {
            return (
              <ListItem key={o.id} to={`/app/site/${siteID}/collections/${postTypeID}/${o.id}`}>
                <ListItemTitle children={o.title} />
                <ListItemText children={o.slug} />
              </ListItem>
            )
          })}
      </Paper>
    </Layout>
  )
}

const ListItem = styled(Link)`
  display: block;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${colors.background.dark};

  &:last-child {
    border-bottom: none;
  }
`

const ListItemTitle = styled.h4`
  margin-bottom: 2px;
`

const ListItemText = styled.span`
  color: ${colors.text.light};
`

export default Collections
