import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { TextField, Button } from '@material-ui/core'

// import app components
import { useStore } from '../../store'
import { siteActions } from '../../actions'

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
      <TextField value={data.title} name="title" variant="outlined" onChange={handleChange} />

      <Button onClick={handleUpdate} children={`Update`} />

      <Button onClick={handleDelete} children={`Delete Site`} />
    </Container>
  )
}

const Container = styled.div``

export default GeneralSettings
