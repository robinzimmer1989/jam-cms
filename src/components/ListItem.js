import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

// import app components
import Paper from './Paper'

import { colors } from 'theme'
import { formatSlug } from 'utils'

const ListItem = props => {
  const { to, onClick, title, slug, info } = props

  const item = (
    <Paper>
      <ListItemTitle>
        {title}
        {info}
      </ListItemTitle>
      <ListItemText children={formatSlug(slug)} />
    </Paper>
  )

  return <>{to ? <LinkContainer to={to} children={item} /> : <ClickContainer onClick={onClick} children={item} />}</>
}

const styledContainer = css`
  display: block;
  width: 100%;
  margin-bottom: 20px;
`

const LinkContainer = styled(Link)`
  ${styledContainer}
`

const ClickContainer = styled.div`
  ${styledContainer}
  cursor: pointer;
`

const ListItemTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`

const ListItemText = styled.span`
  color: ${colors.text.light};
`

export default ListItem
