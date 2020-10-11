import React from 'react'

// import app components
import allBlocks from 'components/formBlocks'
import FormBlockWrapper from 'components/formEditor/FormBlockWrapper'

const FlexibleContent = props => {
  const { blocks } = props

  return (
    blocks &&
    blocks.map(({ name, data }, index) => {
      const Component = allBlocks[name].component

      return (
        Component && (
          <FormBlockWrapper key={index} index={index}>
            <Component index={index} {...data} />
          </FormBlockWrapper>
        )
      )
    })
  )
}

export default FlexibleContent
