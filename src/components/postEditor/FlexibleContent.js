import React from 'react'

// import app components
import allBlocks from 'components/postBlocks'
import BlockWrapper from 'components/postEditor/BlockWrapper'

const FlexibleContent = props => {
  const { blocks } = props

  return (
    blocks &&
    blocks.map(({ name, data }, index) => {
      const Component = allBlocks[name].component

      return (
        Component && (
          <BlockWrapper key={index} index={index}>
            <Component {...data} />
          </BlockWrapper>
        )
      )
    })
  )
}

export default FlexibleContent
