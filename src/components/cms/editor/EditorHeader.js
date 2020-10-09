import React from 'react'
import { Link } from 'gatsby'
import { PageHeader, Button, Space, Tooltip } from 'antd'
import { HomeTwoTone, FullscreenOutlined } from '@ant-design/icons'

// import app components
import { useStore } from 'store'
import getRoute from 'routes'

const EditorHeader = props => {
  const { backLink } = props

  const [, dispatch] = useStore()

  const title = (
    <Button key={`back-button`}>
      <Link to={backLink} children={`Back`} />
    </Button>
  )

  return (
    <PageHeader
      title={title}
      extra={[
        <Tooltip key={`view-fullscreen`} title={`Fullscreen`}>
          <Button
            onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: `fullscreen` })}
            icon={<FullscreenOutlined style={{ fontSize: '12px' }} />}
            shape="circle"
          />
        </Tooltip>,
      ]}
    />
  )
}

export default EditorHeader
