import React from 'react'
import { Button, PageHeader, Popconfirm } from 'antd'

// import app components
import CmsLayout from 'components/CmsLayout'
import CollectionForm from 'components/CollectionForm'
import ListItem from 'components/ListItem'

import { collectionActions } from 'actions'
import { useStore } from 'store'

const SettingsCollections = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const postTypes = sites[siteID]?.postTypes

  const handleUpsertPostType = async ({ id, title, slug }) => {
    if (id) {
      await collectionActions.updateCollection({ siteID, id, title, slug }, dispatch)
    } else {
      await collectionActions.addCollection({ siteID, title, slug }, dispatch)
    }
  }

  const handleDeletePostType = async ({ postTypeID }) => {
    await collectionActions.deleteCollection({ id: postTypeID }, dispatch)
  }

  const handleOpenDialog = (postType = {}) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Collection`,
        component: (
          <CollectionForm
            siteID={siteID}
            onSubmit={({ title, slug }) => handleUpsertPostType({ id: postType?.id, title, slug })}
            {...postType}
          />
        ),
      },
    })
  }

  return (
    <CmsLayout pageTitle={`Collections`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary" />
      </PageHeader>

      {postTypes &&
        Object.values(postTypes).map(o => {
          const actions = [
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDeletePostType({ postTypeID: o.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" children={`Delete`} danger />
            </Popconfirm>,
            <Button size="small" onClick={() => handleOpenDialog(o)}>
              Edit
            </Button>,
          ]

          return <ListItem key={o.id} actions={actions} title={o.title} />
        })}
    </CmsLayout>
  )
}

export default SettingsCollections
