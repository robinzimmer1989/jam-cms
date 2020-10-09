import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Typography } from 'antd'

// import app components
import Edges from 'components/Edges'
import Image from 'components/Image'

export const fields = {
  name: 'Header',
  fields: [
    {
      id: 'image',
      type: 'image',
      placeholder: '',
      label: 'Add Logo',
      value: '',
    },
    {
      id: 'headerMenu',
      type: 'menu',
      placeholder: '',
      label: 'Edit Menu',
      value: '',
    },
  ],
  style: {},
}

const Header = props => {
  const { image, headerMenu, ...rest } = props

  console.log(props)

  return (
    <Container {...rest}>
      <Edges sixe="lg">
        <Grid>
          <Logo to={`/`}>{image?.storageKey && <Image storageKey={image.storageKey} />}</Logo>

          {headerMenu && (
            <Navigation>
              {headerMenu.map(o => {
                return (
                  <MenuItem key={o.key}>
                    <Typography children={o.title} />
                  </MenuItem>
                )
              })}
            </Navigation>
          )}
        </Grid>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  background: #fff;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 5px 0;
`

const Logo = styled(Link)`
  display: block;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const Navigation = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`

const MenuItem = styled.li`
  margin: 0 10px;
  transform: translateX(10px);
`

export default Header
