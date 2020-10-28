import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from 'antd'

// import app components
import CmsLayout from 'components/CmsLayout'
import ListItem from 'components/ListItem'
import EditorForm from 'components/EditorForm'

import { adminServices } from 'services'
import { useStore } from 'store'

const Admin = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const [data, setData] = useState(null)

  console.log(data)

  useEffect(() => {
    const loadEditors = async () => {
      const result = await adminServices.listEditors({ limit: 10, token: null })

      if (result) {
        setData(result)
      }
    }

    loadEditors()
  }, [])

  const handleOpenDialog = () =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Add`,
        component: <EditorForm onSubmit={handleAdd} />,
      },
    })

  const handleAdd = async ({ username }) => {
    const result = await adminServices.addToGroup({ username })

    console.log(result)
  }

  return (
    <CmsLayout pageTitle={`Admin`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary" />
      </PageHeader>

      {data?.users &&
        data.users.map(o => {
          return <ListItem title={'test'} />
        })}
    </CmsLayout>
  )
}

export default Admin
