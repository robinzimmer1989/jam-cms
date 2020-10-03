import React from 'react'
import { set } from 'lodash'
import produce from 'immer'

// import app components
import AddImage from '../../forms/AddImage'
import Textarea from '../fields/Textarea'
import ImagePicker from '../fields/ImagePicker'

import { useStore } from 'store'

const BlockEditFields = () => {
  const [
    {
      editorState: { site, post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  let fields

  if (activeBlockIndex === 'header' || activeBlockIndex === 'footer') {
    fields = site.settings[activeBlockIndex].fields
  } else if (post && post.content[activeBlockIndex]) {
    fields = post.content[activeBlockIndex].fields
  }

  const handleChange = (value, fieldIndex) => {
    if (activeBlockIndex === 'header' || activeBlockIndex === 'footer') {
      const nextSite = produce(site, draft => set(draft, `settings.${activeBlockIndex}.fields.${fieldIndex}.value`, value))

      dispatch({
        type: `SET_EDITOR_SITE`,
        payload: nextSite,
      })
    } else {
      const nextPost = produce(post, draft => set(draft, `content.${activeBlockIndex}.fields.${fieldIndex}.value`, value))

      dispatch({
        type: `SET_EDITOR_POST`,
        payload: nextPost,
      })
    }
  }

  const handleImageSelect = (value, fieldIndex) => {
    handleChange(value, fieldIndex)
    dispatch({ type: `CLOSE_DIALOG` })
  }

  const getField = (field, fieldIndex) => {
    switch (field.type) {
      case `textarea`:
        return <Textarea key={fieldIndex} onChange={e => handleChange(e.target.value, fieldIndex)} {...field} />

      case `image`:
        return (
          <ImagePicker
            key={fieldIndex}
            onClick={() =>
              dispatch({
                type: `SET_DIALOG`,
                payload: {
                  open: true,
                  component: <AddImage onSelect={({ id, storageKey }) => handleImageSelect({ id, storageKey }, fieldIndex)} />,
                  width: `xs`,
                },
              })
            }
            {...field}
          />
        )

      default:
        return null
    }
  }

  return fields && fields.map((field, fieldIndex) => getField(field, fieldIndex))
}

export default BlockEditFields
