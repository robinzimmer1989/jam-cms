import React from 'react'
import { Button } from '@material-ui/core'

// import app components
import CmsLayout from '../CmsLayout'
import ActionBar from '../ActionBar'
import AddCollection from '../forms/AddCollection'

import ListItem from 'components/ListItem'

import { collectionActions } from 'actions'
import { useStore } from 'store'

const Collections = () => {
  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const postTypes = sites[siteID]?.postTypes?.items

  const handleUpsertCollection = async ({ id, title, slug }) => {
    if (id) {
      await collectionActions.updateCollection({ siteID, id, title, slug }, dispatch)
    } else {
      await collectionActions.addCollection({ siteID, title, slug }, dispatch)
    }
  }

  const handleOpenDialog = (postType = {}) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Add Collection`,
        component: (
          <AddCollection
            siteID={siteID}
            onSubmit={({ title, slug }) => handleUpsertCollection({ id: postType?.id, title, slug })}
            {...postType}
          />
        ),
      },
    })
  }

  return (
    <CmsLayout pageTitle={`Collections`}>
      <ActionBar>
        <Button children={`Add`} onClick={handleOpenDialog} variant="contained" />
      </ActionBar>

      {postTypes &&
        postTypes.map(o => {
          return <ListItem key={o.id} onClick={() => handleOpenDialog(o)} title={o.title} slug={o.slug} />
        })}
    </CmsLayout>
  )
}

export default Collections
