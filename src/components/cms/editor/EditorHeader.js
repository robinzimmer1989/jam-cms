import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { PageHeader, Button } from 'antd'

// import app components
import Edges from 'components/Edges'

import { useStore } from 'store'
import { colors } from 'theme'
import getRoute from 'routes'

const EditorHeader = () => {
  const [
    {
      editorState: { post },
    },
  ] = useStore()

  return (
    <PageHeader
      title={''}
      extra={[
        <Button key={`all-posts`}>
          <Link
            to={getRoute(`collection`, { siteID: post?.siteID, postTypeID: post?.postTypeID })}
            children={`All Posts`}
          />
        </Button>,
      ]}
    />
  )
}

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.background.dark};
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49px;
`

export default EditorHeader
