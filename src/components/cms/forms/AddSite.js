import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

// import app components
import FormWrapper from './FormWrapper'

import { getCurrentUser } from 'utils/auth'
import { siteActions } from 'actions'
import { useStore } from 'store'

const AddSite = () => {
  const [, dispatch] = useStore()

  const [title, setTitle] = useState('')

  const handleSubmit = async () => {
    if (!title) {
      return
    }

    await siteActions.addSite({ ownerID: getCurrentUser().sub, title }, dispatch)

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <FormWrapper title={`Add Site`} button={<Button children={`Add`} onClick={handleSubmit} variant="contained" />}>
      <TextField value={title} onChange={e => setTitle(e.target.value)} variant="outlined" placeholder={`Enter title...`} fullWidth />
    </FormWrapper>
  )
}

export default AddSite
