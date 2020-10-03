import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { Button } from '@material-ui/core'

// import app components
import Layout from '../Layout'
import ActionBar from '../ActionBar'
import AddPost from '../forms/AddPost'
import Paper from '../../Paper'

import { collectionActions, postActions } from 'actions'
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

  const [filter, setFilter] = useState(`all`)

  const postType = sites[siteID]?.postTypes?.items.find(o => o.id === postTypeID)
  const title = postType?.title
  const posts = postType?.posts?.items || []
  const filteredPosts = filter !== `all` ? posts.filter(o => o.status === filter) : posts

  useEffect(() => {
    const loadCollection = async () => {
      await collectionActions.getCollection({ postTypeID }, dispatch)
    }
    loadCollection()
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

        <Filter>
          {['all', 'publish', 'draft', 'trash'].map(name => {
            return <FilterItem key={name} active={filter === name} children={name} onClick={() => setFilter(name)} />
          })}
        </Filter>
      </ActionBar>

      {filteredPosts &&
        filteredPosts.map(o => {
          return (
            <ListItem key={o.id} to={`/app/site/${siteID}/collections/${postTypeID}/${o.id}`}>
              <Paper>
                <ListItemTitle>
                  {o.title}
                  {['draft', 'trash'].includes(o.status) && <Status children={o.status} />}
                </ListItemTitle>
                <ListItemText children={o.slug} />
              </Paper>
            </ListItem>
          )
        })}
    </Layout>
  )
}

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterItem = styled.div`
  padding: 4px 8px;
  margin: 0 4px;
  text-transform: uppercase;
  font-size: 12px;
  color: ${({ active }) => (active ? colors.primary.dark : colors.text.dark)};
  cursor: pointer;
`

const ListItem = styled(Link)`
  display: block;
  width: 100%;
  margin-bottom: 20px;
`

const ListItemTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`

const ListItemText = styled.span`
  color: ${colors.text.light};
`

const Status = styled.span`
  padding: 4px 6px;
  font-size: 10px;
  text-transform: uppercase;
  border-radius: 4px;

  ${({ children }) =>
    children === 'draft' &&
    css`
      background: ${colors.primary.dark};
      color: #fff;
    `}

  ${({ children }) =>
    children === 'trash' &&
    css`
      background: ${colors.warning};
      color: #fff;
    `}
`

export default Collections
