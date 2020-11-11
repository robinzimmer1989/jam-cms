import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, PageHeader } from 'antd'

// import app components
import CmsLayout from '../CmsLayout'
import ListItem from '../ListItem'
import EditorForm from '../EditorForm'

import { useStore } from '../../store'

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
      // const result = await adminServices.listEditors({ limit: 10, token: null })
      // if (result) {
      //   setData(result)
      // }
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
    // const result = await adminServices.addToGroup({ username })
  }

  return (
    <CmsLayout pageTitle={`Editors`}>
      <PageHeader>{/* <Button children={`Add`} onClick={handleOpenDialog} type="primary" /> */}</PageHeader>

      {/* {data?.users &&
        data.users.map((o) => {
          return <ListItem title={'test'} />
        })} */}
    </CmsLayout>
  )
}

export default Admin
