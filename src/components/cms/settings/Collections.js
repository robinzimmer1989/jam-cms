import React from 'react'
import styled from 'styled-components'
import { List, Button } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'
import ActionBar from '../ActionBar'
import AddCollection from '../forms/AddCollection'

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
          const actions = [
            <Button size="small">
              <Link to={`/`}>Edit</Link>
            </Button>,
          ]

          return (
            <CardWrapper key={o.id}>
              <Card onClick={() => handleOpenDialog(o)}>
                <List.Item actions={actions}>
                  <Link to={editLink}>
                    <Typography.Text strong>
                      {o.title}
                      {o.slug}
                    </Typography.Text>
                  </Link>
                </List.Item>
              </Card>
            </CardWrapper>
          )
        })}
    </CmsLayout>
  )
}

const CardWrapper = styled.div`
  margin-left: ${({ level }) => `${level * 30}px`};
  margin-bottom: 20px;

  .ant-card-body {
    padding: 0 20px;
  }
`

export default Collections
