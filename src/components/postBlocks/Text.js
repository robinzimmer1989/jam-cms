import React from 'react'
import styled from 'styled-components'

// import app components
import Wysiwyg from 'components/Wysiwyg'

export const fields = {
  name: 'Text',
  fields: [
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
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
  padding: 30px;
`

export default Text
