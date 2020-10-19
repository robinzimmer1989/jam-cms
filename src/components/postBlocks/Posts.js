import React from 'react'
import styled from 'styled-components'

// import app components
import Edges from 'components/Edges'

export const fields = {
  name: 'Posts',
  fields: [
    {
      id: 'posts',
      type: 'postSelector',
      placeholder: '',
      label: 'Collection',
    },
  ],
  style: {},
}

const Posts = props => {
  const { posts } = props

  return (
    <Container>
      <Edges size="md">
        {posts &&
          posts.map(o => {
            return o.title
          })}
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 300px;
  padding: 30px 0;
`

export default Posts
