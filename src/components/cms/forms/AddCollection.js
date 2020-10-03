import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

// import app components
import FormWrapper from './FormWrapper'

import { collectionServices } from 'services'
import { useStore } from 'store'

const AddCollection = props => {
  const { siteID } = props

  const [, dispatch] = useStore()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')

  const handleSubmit = async () => {
    if (!title || !slug) {
      return
    }

    await collectionServices.addCollection({ siteID, title, slug }, dispatch)

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <FormWrapper title={`Add Collection`} button={<Button children={`Add`} onClick={handleSubmit} variant="contained" />}>
      <TextField value={title} onChange={e => setTitle(e.target.value)} variant="outlined" placeholder={`Title`} fullWidth />
      <TextField value={slug} onChange={e => setSlug(e.target.value)} variant="outlined" placeholder={`Slug`} fullWidth />
    </FormWrapper>
  )
}

export default AddCollection
