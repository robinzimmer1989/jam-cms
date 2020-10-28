import React from 'react'
import styled from 'styled-components'

// import app components
import Edges from 'components/Edges'
import Image from 'components/Image'

import Button from './Button'

export const fields = {
  name: 'Posts',
  fields: [
    {
      id: 'posts',
      type: 'collectionSelector',
      placeholder: '',
      label: 'Collection',
    },
    {
      id: 'buttonTitle',
      type: 'text',
      defaultValue: 'Read More',
      label: 'Button Title',
    },
    {
      id: 'numberOfPosts',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 3,
      min: -1,
      step: 1,
    },
    {
      id: 'columns',
      type: 'number',
      label: 'Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: 'settings',
      type: 'settings',
    },
  ],
}

const Posts = props => {
  const { posts, buttonTitle, numberOfPosts, columns } = props

  let visiblePosts = posts

  if (numberOfPosts && numberOfPosts > 0) {
    visiblePosts = posts && posts.slice(0, numberOfPosts)
  }

  return (
    <Container>
      <Edges size="md">
        <BoxesContainer className={`gcmsBoxes__inner`}>
          {visiblePosts &&
            visiblePosts.map((post, index) => {
              return (
                <Box key={index} className={`gcmsBoxes__box`} columns={columns}>
                  <ImageContainer className={`gcmsBoxes__boxImageContainer`}>
                    {post.featuredImage && (
                      <Image className={`gcmsBoxes__boxImage`} image={post.featuredImage} bg={true} />
                    )}
                  </ImageContainer>

                  {post.title && <h4 className={`gcmsBoxes__boxTitle`} children={post.title} />}

                  <Button
                    className={`gcmsBoxes__boxButton`}
                    url={post.slug}
                    title={buttonTitle}
                    color={'primary'}
                    variant={'filled'}
                  />
                </Box>
              )
            })}

          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
          <Box columns={columns} style={{ height: 0, opacity: 0, overflow: 0 }} />
        </BoxesContainer>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  min-height: 300px;
`

const BoxesContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 12px;
  background: #f7f7f7;
`

const Box = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    ${({ columns }) =>
      columns > 1 &&
      `
      width: calc(50% - 10px);
    `}
  }

  @media (min-width: 900px) {
    ${({ columns }) =>
      columns > 2 &&
      `
      width: calc(100% / 3 - 10px);
    `}
  }

  @media (min-width: 1200px) {
    ${({ columns }) =>
      columns > 3 &&
      `
      width: calc(100% / 4 - 10px);
    `}
  }
`

export default Posts
