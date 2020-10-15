import React from 'react'
import { Button, PageHeader, Popconfirm } from 'antd'
import { Link, navigate } from 'gatsby'

// import app components
import CmsLayout from 'components/CmsLayout'
import CollectionForm from 'components/CollectionForm'
import ListItem from 'components/ListItem'

import { collectionActions } from 'actions'
import { useStore } from 'store'
import getRoute from 'routes'

const SettingsCollections = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const postTypes = sites[siteID]?.postTypes

  const handleAddPostType = async ({ title, slug }) => {
    const result = await collectionActions.addCollection({ siteID, title, slug }, dispatch)

    if (result?.data?.createPostType) {
      navigate(getRoute(`settings-collection`, { siteID, postTypeID: result.id }))
    }
  }

  const handleDeletePostType = async ({ postTypeID }) => {
    await collectionActions.deleteCollection({ id: postTypeID }, dispatch)
  }

  const handleOpenDialog = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Collection`,
        component: <CollectionForm siteID={siteID} onSubmit={handleAddPostType} />,
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
            <Button size="small">
              <Link to={getRoute(`settings-collection`, { siteID, postTypeID: o.id })} children={`Edit`} />
            </Button>,
          ]

          return <ListItem key={o.id} actions={actions} title={o.title} />
        })}
    </CmsLayout>
  )
}

export default SettingsCollections
