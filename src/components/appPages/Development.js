import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd'
import { navigate } from 'gatsby'
import styled from 'styled-components'

// import app components
import PageWrapper from '../PageWrapper'
import FlexibleContent from '../FlexibleContent'
import ViewToggle from '../ViewToggle'

import getRoute from '../../routes'
import { useStore } from '../../store'

const Development = (props) => {
  const { blocks, theme } = props

  const [
    {
      cmsState: { siteID },
    },
  ] = useStore()

  const [activeComponents, setActiveComponents] = useState([])

  console.log(blocks)

  return (
    <>
      <Navigation>
        <PageHeader
          onBack={() => navigate(getRoute(`dashboard`, { siteID }))}
          title="Development"
          extra={[<ViewToggle key={'view-toggle'} hideFullscreen />]}
        />
      </Navigation>

      <PageWrapper theme={theme}>
        <FlexibleContent
          blocks={blocks}
          renderedBlocks={[]}
          editableHeader={false}
          editableFooter={false}
          isTemplate={false}
          onOpenDialog={null}
          onMoveElement={null}
        />
      </PageWrapper>
    </>
  )
}

const Navigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 20px;
`

export default Development
