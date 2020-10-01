import React, { useState } from 'react'
import styled from 'styled-components'
import { List, ListItem, ListItemText, ClickAwayListener } from '@material-ui/core'

const Menu = ({ children, items, placement = 'right', ...rest }) => {
  const [menu, setMenu] = useState(false)

  return (
    <ClickAwayListener onClickAway={() => setMenu(false)}>
      <Container {...rest}>
        <div onClick={() => setMenu(!menu)}>{children}</div>

        <ListContainer open={menu} placement={placement} onClose={() => setMenu(false)}>
          <StyledList onClick={() => setMenu(false)}>
            {items.map((o, i) => {
              return (
                <ListItem key={i} onClick={o.onClick} button>
                  <ListItemText children={o.text} />
                </ListItem>
              )
            })}
          </StyledList>
        </ListContainer>
      </Container>
    </ClickAwayListener>
  )
}

const Container = styled.div`
  position: relative;
`

const ListContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(100% + 5px);
  ${props => props.placement}: 5px;
  width: 200px;
  background: #fff;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  opacity: 0;

  ${props =>
    props.open &&
    `
    pointer-events: all;
    opacity: 1;
  `}

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    ${props => props.placement}: 15px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }
`

const StyledList = styled(List)`
  padding: 0;
`

export default Menu
