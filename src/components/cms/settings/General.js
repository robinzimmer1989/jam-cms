import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { Button, Input, Card } from 'antd'

// import app components
import Spacer from 'components/Spacer'

import { useStore } from 'store'
import { siteActions } from 'actions'

const GeneralSettings = props => {
  const [
    {
      postState: { sites, siteID },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID]

  const [data, setData] = useState({ ...site })

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  const handleUpdate = async () => await siteActions.updateSite({ ...data }, dispatch)

  const handleDelete = async () => {
    const result = await siteActions.deleteSite({ ...data }, dispatch)

    if (result?.data?.deleteSite) {
      navigate(`/app`)
    }
  }

  return (
    <Container>
      <Spacer mb={30}>
        <Card title={`General`}>
          <Spacer mb={20}>
            <Input placeholder={`Title`} value={data.title} name="title" onChange={handleChange} />
          </Spacer>
          <Button onClick={handleUpdate} children={`Update`} type="primary" />
        </Card>
      </Spacer>

      <Card title={`Danger Zone`}>
        <Button onClick={handleDelete} children={`Delete Site`} type="primary" danger />
      </Card>
    </Container>
  )
}

const Container = styled.div``

export default GeneralSettings
