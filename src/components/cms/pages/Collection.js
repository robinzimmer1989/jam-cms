import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Row, Button, Popconfirm, List, Card, Typography, PageHeader } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'
import PostForm from '../forms/PostForm'

import { postActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'
import getRoute from 'routes'
import { formatSlug, createDataTree } from 'utils'

const Collection = props => {
  const { siteID, postTypeID } = props

  const [
    {
      sitesState: { sites },
    },
    dispatch,
  ] = useStore()

  const [filter, setFilter] = useState(`all`)

  const postType = sites[siteID]?.postTypes?.[postTypeID]
  const title = postType?.title
  const posts = postType?.posts ? Object.values(postType.posts) : []
  const treePosts = createDataTree(posts)

  const filteredPosts = filter !== `all` ? treePosts.filter(o => o.status === filter) : treePosts

  const handleAddPost = async ({ title, slug, parentID }) => {
    await postActions.addPost({ siteID, postTypeID, status: `draft`, title, slug, parentID }, dispatch)
  }

  const handleDeletePost = async ({ postID }) => {
    await postActions.deletePost({ id: postID }, dispatch)
  }

  const handleTrashPost = async ({ postID }) => {
    await postActions.updatePost({ id: postID, status: 'trash' }, dispatch)
  }

  const filterItems = (
    <Filter>
      {['all', 'publish', 'draft', 'trash'].map(name => {
        return <FilterItem key={name} active={filter === name} children={name} onClick={() => setFilter(name)} />
      })}
    </Filter>
  )

  const renderPost = (item, level) => {
    const editLink = getRoute(`editor`, { siteID, postTypeID, postID: item.id })

    const actions = [
      <Button size="small">
        <Link to={editLink}>Edit</Link>
      </Button>,
    ]

    if (item.status === 'trash') {
      actions.unshift(
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDeletePost({ postID: item.id })}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" children={`Delete`} danger />
        </Popconfirm>
      )
    } else {
      actions.unshift(
        <Button size="small" onClick={() => handleTrashPost({ postID: item.id })} children={`Trash`} danger />
      )
    }

    return (
      <React.Fragment key={item.id}>
        <CardWrapper level={level}>
          <Card>
            <List.Item actions={actions}>
              <Link to={editLink}>
                <Typography.Text strong>
                  {item.title}
                  {item.status === 'draft' || (item.status === 'trash' && <Status children={item.status} />)}
                </Typography.Text>
              </Link>
            </List.Item>
          </Card>
        </CardWrapper>

        {item.childNodes.map(o => renderPost(o, level + 1))}
      </React.Fragment>
    )
  }

  return (
    <CmsLayout pageTitle={title}>
      <PageHeader
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
                },
              })
            }
            type="primary"
          />
        }
      />

      {filteredPosts && filteredPosts.map(item => renderPost(item, 0))}
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

const CardWrapper = styled.div`
  margin-left: ${({ level }) => `${level * 30}px`};
  margin-bottom: 20px;

  .ant-card-body {
    padding: 0 20px;
  }
`

const Status = styled.span`
  padding: 4px 6px;
  margin-left: 10px;
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
