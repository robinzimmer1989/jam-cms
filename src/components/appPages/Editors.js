import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, PageHeader, Spin, Popconfirm } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

// import app components
import CmsLayout from '../CmsLayout'
import ListItem from '../ListItem'
import EditorForm from '../EditorForm'

import { userActions } from '../../actions'
import { useStore } from '../../store'

const Editors = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const {
    users: { items, page },
  } = sites[siteID]

  useEffect(() => {
    loadUsers(page || 0)
  }, [])

  const loadUsers = async (page) => {
    if (page > -1) {
      await userActions.getUsers({ siteID, page, limit: 10 }, dispatch)
    }
  }

  const handleLoadMore = () => page && loadUsers(page)

  const handleOpenDialog = (user = {}) =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Add`,
        component: <EditorForm onUpdate={handleUpdate} onAdd={handleAdd} {...user} />,
      },
    })

  const handleAdd = async ({ email, role }) => {
    await userActions.addUser({ siteID, email, role }, dispatch)
  }

  const handleUpdate = async ({ id, role }) => {
    await userActions.updateUser({ siteID, id, role }, dispatch)
  }

  const handleDelete = async ({ id }) => {
    await userActions.deleteUser({ siteID, id }, dispatch)
  }

  return (
    <CmsLayout pageTitle={`Editors`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary" />
      </PageHeader>

      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={page > -1}
        loader={
          <LoadingContainer key={0}>
            <Spin size="large" />
          </LoadingContainer>
        }
      >
        {items &&
          items.map((o) => {
            const actions = [
              <Popconfirm
                key="delete"
                title="Are you sure?"
                onConfirm={() => handleDelete(o)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" children={`Delete`} danger />
              </Popconfirm>,
              <Button key="edit" size="small" onClick={() => handleOpenDialog(o)}>
                Edit
              </Button>,
            ]

            return <ListItem key={o.id} title={o.email} subtitle={o.role} actions={actions} />
          })}
      </InfiniteScroll>
    </CmsLayout>
  )
}

const LoadingContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`

export default Editors
