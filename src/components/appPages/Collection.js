import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Button, Popconfirm, PageHeader, Tabs } from 'antd'

// import app components
import CmsLayout from 'components/CmsLayout'
import PostForm from 'components/PostForm'
import ListItem from 'components/ListItem'

import { postActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'
import getRoute from 'routes'
import { createDataTree, sortBy, generateSlug } from 'utils'

const Collection = props => {
  const { siteID, postTypeID } = props

  const [
    {
      cmsState: { sites },
    },
    dispatch,
  ] = useStore()

  const [filter, setFilter] = useState(`all`)

  const postType = sites[siteID]?.postTypes?.[postTypeID]
  const title = postType?.title
  const posts = postType?.posts ? Object.values(postType.posts) : []
  const treePosts = createDataTree(posts)

  const filteredPosts = filter !== `all` ? treePosts.filter(o => o.status === filter) : treePosts
  sortBy(filteredPosts, 'createdAt')

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
    <Tabs defaultActiveKey="all" onChange={v => setFilter(v)}>
      {['all', 'publish', 'draft', 'trash'].map(name => {
        return <Tabs.TabPane key={name} tab={name.toUpperCase()} />
      })}
    </Tabs>
  )

  const renderPost = (o, level) => {
    const editLink = getRoute(`editor`, { siteID, postTypeID, postID: o.id })

    const actions = [
      <Button size="small">
        <Link to={editLink}>Edit</Link>
      </Button>,
    ]

    if (o.status === 'trash') {
      actions.unshift(
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDeletePost({ postID: o.id })}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" children={`Delete`} danger />
        </Popconfirm>
      )
    } else {
      actions.unshift(
        <Button size="small" onClick={() => handleTrashPost({ postID: o.id })} children={`Trash`} danger />
      )
    }

    let badges = []

    if (sites?.[siteID]?.settings?.frontPage === o.id) {
      badges.push(<Status children={'front'} />)
    }

    if (o.status === 'draft' || o.status === 'trash') {
      badges.push(<Status children={o.status} />)
    }

    return (
      <React.Fragment key={o.id}>
        <ListItem
          level={level}
          actions={actions}
          link={editLink}
          title={o.title}
          subtitle={generateSlug(postType, o.id, sites?.[siteID]?.settings?.frontPage)}
          status={badges}
        />

        {o.childNodes.map(p => renderPost(p, level + 1))}
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

const Status = styled.span`
  display: inline-block;
  padding: 2px 4px;
  margin-left: 10px;
  transform: translateY(-2px);
  font-size: 9px;
  text-transform: uppercase;
  border-radius: 4px;

  ${({ children }) =>
    children === 'front' &&
    css`
      background: ${colors.success};
      color: #fff;
    `}

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
