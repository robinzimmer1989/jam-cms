import React, { useState, useEffect } from 'react'
import { PageHeader, Select } from 'antd'
import { navigate } from 'gatsby'
import styled from 'styled-components'

// import app components
import PageWrapper from '../PageWrapper'
import FlexibleContent from '../FlexibleContent'
import ViewToggle from '../ViewToggle'

import { formatBlocks } from '../../utils'
import getRoute from '../../routes'
import { useStore } from '../../store'

const Development = (props) => {
  const { blocks, theme } = props

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore()

  const [activeBlocks, setActiveBlocks] = useState([])

  useEffect(() => {
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localBlocks = localStorage.getItem('jam-cms-blocks')

      if (localBlocks) {
        setActiveBlocks(JSON.parse(localBlocks))
      } else {
        setActiveBlocks(Object.keys(blocks).filter((key) => key !== 'header' && key !== 'footer'))
      }
    }
  }, [])

  const handleSelect = (v) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jam-cms-blocks', JSON.stringify(v))
      setActiveBlocks(v)
    }
  }

  const renderedBlocks = activeBlocks.map((key) => blocks[key].fields)

  return (
    <>
      <Container>
        <PageHeader
          onBack={() => navigate(getRoute(`dashboard`, { siteID }))}
          title="Development"
          extra={[
            <SelectContainer key="block-select">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select Blocks"
                value={activeBlocks}
                onChange={handleSelect}
              >
                {Object.keys(blocks)
                  .filter((key) => key !== 'header' && key !== 'footer')
                  .map((key) => {
                    return (
                      <Select.Option
                        key={key}
                        value={key}
                        children={blocks[key].fields.label || blocks[key].fields.name}
                      />
                    )
                  })}
              </Select>
            </SelectContainer>,
            <ViewToggle key={'view-toggle'} hideFullscreen />,
          ]}
        />
      </Container>

      <PageWrapper theme={theme}>
        <FlexibleContent
          blocks={blocks}
          renderedBlocks={formatBlocks(renderedBlocks, null, true)}
          editableHeader={false}
          editableFooter={false}
          editable={false}
          isTemplate={true}
          onOpenDialog={null}
          onMoveElement={null}
        />
      </PageWrapper>
    </>
  )
}

const Container = styled.div`
  padding: 0 20px;
`

const SelectContainer = styled.div`
  margin-right: 40px;
  min-width: 400px;
`

export default Development
