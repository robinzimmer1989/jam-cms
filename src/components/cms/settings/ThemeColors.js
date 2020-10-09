import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Typography, Divider, Button, Space } from 'antd'
import { toast } from 'react-toastify'

// import app components
import { siteActions } from 'actions'
import { useStore } from 'store'

const ThemeColors = () => {
  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const [colors, setColors] = useState({
    ...sites[siteID]?.settings.colors,
  })

  console.log(colors)

  const handleSave = async () => {
    const settings = {
      ...sites[siteID].settings,
      colors: {
        ...sites[siteID].settings.colors,
        ...colors,
      },
    }

    const result = await siteActions.updateSite({ id: siteID, settings }, dispatch)

    if (result?.data?.updateSite) {
      toast.success('Updated successfully')
    }
  }

  return (
    <>
      <Row>
        <Color name="primary" value={colors.primary} />
        <Color name="primaryVariant" value={colors.primaryVariant} />
        <Color name="secondary" value={colors.secondary} />
        <Color name="secondaryVariant" value={colors.secondaryVariant} />
      </Row>

      <Divider />

      <Button children={`Update`} onClick={handleSave} type="primary" />
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

export default ThemeColors
