import React, { useState } from 'react'
import { Button, Space } from 'antd'

// import app components
import Input from 'components/Input'
import { formatSlug } from 'utils'
import { useStore } from 'store'

const CollectionForm = props => {
  const { title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props

  const [, dispatch] = useStore()

  const [title, setTitle] = useState(defaultTitle)
  const [slug, setSlug] = useState(defaultSlug)

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

    await onSubmit({ title, slug: formattedSlug })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Space direction="vertical">
      <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Input label="slug" value={slug} onChange={e => setSlug(e.target.value)} />
      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  )
}

export default CollectionForm
