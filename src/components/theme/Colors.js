import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Typography, Divider, Button, Space } from 'antd'

// import app components
import { useStore } from 'store'

const Colors = () => {
  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const [colors, setColors] = useState({
    ...sites[siteID]?.settings.colors,
  })

  return (
    <>
      <Row>
        <Color name="primary" value={colors.primary} />
        <Color name="primaryVariant" value={colors.primaryVariant} />
        <Color name="secondary" value={colors.secondary} />
        <Color name="secondaryVariant" value={colors.secondaryVariant} />
      </Row>
    </>
  )
}

const Color = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.value};
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

export default Colors
