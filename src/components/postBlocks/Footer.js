import React from 'react'
import styled from 'styled-components'

// import app components
import Edges from 'components/Edges'

export const fields = {
  name: 'Footer',
  fields: [
    {
      id: 'footerMenu',
      type: 'menu',
      placeholder: '',
      label: 'Edit Menu',
    },
  ],
  style: {},
}

const Footer = props => {
  const { footerMenu, ...rest } = props

  return (
    <Container {...rest}>
      <Edges sixe="lg">
        <Grid>
          {footerMenu && (
            <Navigation>
              {footerMenu.map((o, i) => {
                return <MenuItem key={i}>{o.title}</MenuItem>
              })}
            </Navigation>
          )}
        </Grid>
      </Edges>
    </Container>
  )
}

const Container = styled.div``

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const Navigation = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
`

const MenuItem = styled.li`
  margin: 0 10px;
`

export default Footer
