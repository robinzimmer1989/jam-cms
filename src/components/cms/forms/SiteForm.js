import React, { useState } from 'react'
import { Space, Button, Input } from 'antd'

// import app components
import { getCurrentUser } from 'utils/auth'
import { siteActions } from 'actions'
import { useStore } from 'store'

const SiteForm = () => {
  const [, dispatch] = useStore()

  const [title, setTitle] = useState('')

  const handleSubmit = async () => {
    if (!title) {
      return
    }

    await siteActions.addSite({ ownerID: getCurrentUser().sub, title }, dispatch)

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Space direction="vertical">
      <Input value={title} onChange={e => setTitle(e.target.value)} placeholder={`Enter title`} />
      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  )
}

export default SiteForm