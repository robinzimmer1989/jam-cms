import React from 'react'
import { Space, Checkbox } from 'antd'

// import app components
import Input from '../Input'

const LinkSelector = (props) => {
  const { value = {}, placeholder, onChange } = props

  const handleChange = (name, newValue) => {
    onChange({ ...value, [name]: newValue })
  }

  return (
    <Space direction="vertical" size={20}>
      <Input
        value={value.title || ''}
        placeholder={placeholder || ''}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <Input value={value.url || ''} placeholder={'https://'} onChange={(e) => handleChange('url', e.target.value)} />
      <Checkbox
        value={'_blank'}
        checked={value.target || false}
        onChange={(e) => handleChange('target', e.target.checked ? e.target.value : '')}
        children="Open in new tab"
      />
    </Space>
  )
}

export default LinkSelector
