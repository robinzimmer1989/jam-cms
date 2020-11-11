import React from 'react'
import { Button, Tooltip, Space } from 'antd'
import { FullscreenOutlined, MobileOutlined, TabletOutlined, DesktopOutlined } from '@ant-design/icons'

// import app components
import { useStore } from '../store'

const ViewToggle = () => {
  const [
    {
      editorState: { viewport },
    },
    dispatch,
  ] = useStore()

  return (
    <Space>
      {[
        { type: 'mobile', icon: <MobileOutlined style={{ fontSize: '14px' }} />, title: 'Phone' },
        { type: 'tablet', icon: <TabletOutlined style={{ fontSize: '14px' }} />, title: 'Tablet' },
        { type: 'desktop', icon: <DesktopOutlined style={{ fontSize: '14px' }} />, title: 'Laptop' },
        { type: 'fullscreen', icon: <FullscreenOutlined style={{ fontSize: '14px' }} />, title: 'Fullscreen' },
      ].map((o) => {
        return (
          <Tooltip key={o.type} title={o.title}>
            <Button
              className={viewport === o.type && 'active'}
              onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: o.type })}
              icon={o.icon}
              shape="circle"
              type={viewport === o.type ? 'primary' : 'default'}
            />
          </Tooltip>
        )
      })}
    </Space>
  )
}

export default ViewToggle
