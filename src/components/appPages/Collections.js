import React from 'react'
import { Button, PageHeader, Popconfirm } from 'antd'
import { Link, navigate } from '@reach/router'

// import app components
import CmsLayout from '../CmsLayout'
import CollectionForm from '../CollectionForm'
import ListItem from '../ListItem'

import { collectionActions } from '../../actions'
import { useStore } from '../../store'
import getRoute from '../../routes'

const CollectionSettings = () => {
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
      navigate(getRoute(`settings-collection`, { siteID, postTypeID: result.data.createPostType.id }))
    }
  }

  const handleDeletePostType = async ({ postTypeID }) => {
    await collectionActions.deleteCollection({ siteID, id: postTypeID }, dispatch)
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
        Object.values(postTypes).map((o) => {
          const link = getRoute(`settings-collection`, { siteID, postTypeID: o.id })

          const actions = []

          if (o.id !== 'page') {
            actions.push(
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleDeletePostType({ postTypeID: o.id })}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" children={`Delete`} danger />
              </Popconfirm>
            )
          }

          actions.push(
            <Button size="small">
              <Link to={link} children={`Edit`} />
            </Button>
          )

          return <ListItem key={o.id} link={link} actions={actions} title={o.title} subtitle={`/${o.slug}`} hideImage />
        })}
    </CmsLayout>
  )
}

export default CollectionSettings
