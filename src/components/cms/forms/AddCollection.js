import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

// import app components
import FormWrapper from './FormWrapper'
import Spacer from 'components/Spacer'

import { formatSlug } from 'utils'
import { useStore } from 'store'

const AddCollection = props => {
  const { title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props

  const [, dispatch] = useStore()

  const [title, setTitle] = useState(defaultTitle)
  const [slug, setSlug] = useState(defaultSlug)

  const handleSubmit = async () => {
    if (!title) {
      return
    }

    let formattedSlug

    if (slug) {
      formattedSlug = formatSlug(slug)
    } else {
      formattedSlug = formatSlug(title)
    }

    await onSubmit({ title, slug: formattedSlug })

    dispatch({ type: 'CLOSE_DIALOG' })
  }

  return (
    <>
      <Spacer mb={20}>
        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="outlined"
          placeholder={`Title`}
          fullWidth
        />
      </Spacer>

      <Spacer mb={20}>
        <TextField
          value={slug}
          onChange={e => setSlug(e.target.value)}
          variant="outlined"
          placeholder={`Slug`}
          helperText={`Optional`}
          fullWidth
        />
      </Spacer>

      <Button children={`Add`} onClick={handleSubmit} variant="contained" />
    </>
  )
}

export default AddCollection
