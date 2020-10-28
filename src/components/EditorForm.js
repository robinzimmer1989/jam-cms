import React, { useState } from 'react'
import { Space, Button } from 'antd'

// import app components
import Input from 'components/Input'
import { useStore } from 'store'

const EditorForm = props => {
  const { onSubmit } = props

  const [, dispatch] = useStore()

  const [username, setUsername] = useState('')

  const handleSubmit = async () => {
    if (!username) {
      return
    }

    await onSubmit({ username })

    setUsername('')

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <Space direction="vertical">
      <Input label="Username" value={username} onChange={e => setUsername(e.target.value)} placeholder={``} />
      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  )
}

export default EditorForm
