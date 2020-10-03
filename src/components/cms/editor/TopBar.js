import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// import app components
import Edges from 'components/Edges'

import { useStore } from 'store'
import { colors } from 'theme'

const TopBar = () => {
  const [
    {
      editorState: { post },
    },
    dispatch,
  ] = useStore()

  return (
    <Container>
      <Edges size="md">
        <Grid>
          <Link to={`/app/site/${post?.siteID}/collections/${post?.postTypeID}`} children={`All Posts`} />
        </Grid>
      </Edges>
    </Container>
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

export default TopBar
