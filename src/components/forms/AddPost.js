import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

// import app components
import FormWrapper from './FormWrapper'
import { postActions } from '../../actions'
import { useStore } from '../../store'

const AddPost = props => {
  const { siteID, postTypeID } = props

  const [, dispatch] = useStore()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')

  const handleSubmit = async () => {
    if (!title || !slug) {
      return
    }

    await postActions.addPost({ siteID, postTypeID, status: `draft`, title, slug }, dispatch)

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <FormWrapper title={`Add Post`} button={<Button children={`Add`} onClick={handleSubmit} variant="contained" />}>
      <TextField value={title} onChange={e => setTitle(e.target.value)} placeholder={`Title`} fullWidth />
      <TextField value={slug} onChange={e => setSlug(e.target.value)} placeholder={`Slug`} fullWidth />
    </FormWrapper>
  )
}

export default AddPost
