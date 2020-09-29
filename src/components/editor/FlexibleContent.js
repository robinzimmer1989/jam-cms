import React from 'react'

// import app components
import BlockWrapper from './BlockWrapper'

// import blocks
import Text from '../blocks/Text'
import Banner from '../blocks/Banner'

const FlexibleContent = props => {
  const { blocks } = props

  return (
    blocks &&
    blocks.map(({ name, data }, index) => {
      const components = {
        Text,
        Banner,
      }

      const Component = components[name]

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
