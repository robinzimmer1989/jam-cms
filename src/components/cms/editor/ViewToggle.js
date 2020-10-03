import React, { useState } from 'react'
import styled from 'styled-components'

import DesktopIcon from 'react-ionicons/lib/IosDesktopOutline'
import TabletIcon from 'react-ionicons/lib/IosTabletPortrait'
import MobileIcon from 'react-ionicons/lib/IosPhonePortrait'

// import app components

const ViewToggle = () => {
  const [view, setView] = useState('desktop')

  return (
    <Container>
      {[{ type: 'desktop', icon: <DesktopIcon /> }, { type: 'tablet', icon: <TabletIcon /> }, { type: 'mobile', icon: <MobileIcon /> }].map(
        o => {
          return <Item key={o.type} className={view === o.type && 'active'} onClick={() => setView(o.type)} children={o.icon} />
        }
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
`

const Item = styled.div`
  padding: 5px;
  cursor: pointer;

  svg {
    width: 60px;
    height: 30px;
    fill: ${colors.text.light};
    transition: ease all 0.2s;
  }

  &:hover,
  &.active {
    svg {
      fill: ${colors.text.dark};
    }
  }
`

export default ViewToggle
