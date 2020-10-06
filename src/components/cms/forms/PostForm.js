import React, { useState } from 'react'
import { Space, Button, Input, Select } from 'antd'

// import app components
import { formatSlug } from 'utils'
import { useStore } from 'store'

const PostForm = props => {
  const { postTypeID, title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props

  const [
    {
      postState: { sites, siteID },
    },
    dispatch,
  ] = useStore()

  const [title, setTitle] = useState(defaultTitle)
  const [slug, setSlug] = useState(defaultSlug)
  const [parentID, setParentID] = useState('')

  const posts = sites[siteID]?.postTypes?.items.find(o => o.id === postTypeID)?.posts?.items

  const handleSubmit = async () => {
    if (!title) {
      return
    }

    let formattedSlug

    if (slug) {
      formattedSlug = formatSlug(slug)
    } else {
      formattedSlug = formatSlug(title)
    }

    await onSubmit({ title, slug: formattedSlug, parentID })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Space direction="vertical">
      <Input value={title} onChange={e => setTitle(e.target.value)} placeholder={`Title`} />
      <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder={`Slug`} />

      <Select value={parentID} onChange={value => setParentID(value)}>
        <Select.Option value={``} children={`None`} />
        {posts && posts.map(o => <Select.Option value={o.id} children={o.title} />)}
      </Select>
      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  )
}

export default PostForm