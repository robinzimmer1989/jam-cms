import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { Button, Card, Popconfirm } from 'antd'

// import app components
import Input from 'components/Input'
import CmsLayout from '../CmsLayout'
import Spacer from 'components/Spacer'

import { useStore } from 'store'
import { siteActions } from 'actions'

const GeneralSettings = props => {
  const [
    {
      sitesState: { sites, siteID },
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
    <CmsLayout pageTitle={`General`}>
      <Spacer mb={30}>
        <Card title={`General`}>
          <Spacer mb={20}>
            <Input label="Title" value={data.title} name="title" onChange={handleChange} />
          </Spacer>
          <Button onClick={handleUpdate} children={`Update`} type="primary" />
        </Card>
      </Spacer>

      <Card title={`Danger Zone`}>
        <Popconfirm title="Are you sure?" onConfirm={handleDelete} okText="Yes" cancelText="No">
          <Button children={`Delete Site`} type="primary" danger />
        </Popconfirm>
        ,
      </Card>
    </CmsLayout>
  )
}

export default GeneralSettings
