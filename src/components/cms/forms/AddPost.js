import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

// import app components
import FormWrapper from './FormWrapper'
import Spacer from 'components/Spacer'

import { useStore } from 'store'

const AddPost = props => {
  const { title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props

  const [, dispatch] = useStore()

  const [title, setTitle] = useState(defaultTitle)
  const [slug, setSlug] = useState(defaultSlug)

  const handleSubmit = async () => {
    if (!title || !slug) {
      return
    }

    await onSubmit(title, slug)

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <FormWrapper title={`Add Post`} button={<Button children={`Add`} onClick={handleSubmit} variant="contained" />}>
      <Spacer mb={20}>
        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={`Title`}
          variant="outlined"
          fullWidth
        />
      </Spacer>
      <TextField
        value={slug}
        onChange={e => setSlug(e.target.value)}
        placeholder={`Slug`}
        variant="outlined"
        fullWidth
      />
    </FormWrapper>
  )
}

export default AddPost
