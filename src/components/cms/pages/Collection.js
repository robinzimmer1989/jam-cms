import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Row, Button, Space, List, Card } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'
import PostForm from '../forms/PostForm'

import { collectionActions, postActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'
import getRoute from 'routes'
import { formatSlug } from 'utils'

const Collection = props => {
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

  const handleAddPost = async ({ title, slug, parentID }) => {
    await postActions.addPost({ siteID, postTypeID, status: `draft`, title, slug, parentID }, dispatch)
  }

  const filterItems = (
    <Filter>
      {['all', 'publish', 'draft', 'trash'].map(name => {
        return <FilterItem key={name} active={filter === name} children={name} onClick={() => setFilter(name)} />
      })}
    </Filter>
  )

  return (
    <CmsLayout pageTitle={title}>
      <Card
        title={filterItems}
        extra={
          <Button
            children={`Add`}
            onClick={() =>
              dispatch({
                type: 'SET_DIALOG',
                payload: {
                  open: true,
                  title: `Add`,
                  component: <PostForm onSubmit={handleAddPost} postTypeID={postTypeID} />,
                  width: 'xs',
                },
              })
            }
            type="primary"
          />
        }
      >
        {filteredPosts && (
          <List
            itemLayout="horizontal"
            dataSource={filteredPosts}
            renderItem={o => {
              const status = ['draft', 'trash'].includes(o.status) ? `[${o.status}]` : ''

              return (
                <List.Item actions={[<Link to={getRoute(`editor`, { siteID, postTypeID, postID: o.id })}>Edit</Link>]}>
                  <List.Item.Meta
                    title={`${o.title} ${status}`}
                    description={`${formatSlug(postType.slug + o.slug)}`}
                  />
                </List.Item>
              )
            }}
          />
        )}
      </Card>
    </CmsLayout>
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

export default Collection
