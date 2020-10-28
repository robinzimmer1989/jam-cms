import React from 'react'
import styled from 'styled-components'

// import app components
import Wysiwyg from 'components/Wysiwyg'
import Edges from 'components/Edges'

export const fields = {
  name: 'Text',
  fields: [
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
    },
    {
      id: 'settings',
      type: 'settings',
    },
  ],
}

const Text = props => {
  const { text } = props

  return (
    <Container>
      <Wysiwyg children={text} />
    </Container>
  )
}

const Container = styled.div`
  min-height: 40px;
`

export default Text
