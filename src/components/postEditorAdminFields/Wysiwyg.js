import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Wysiwyg = props => {
  const { value, onChange } = props

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(value)))
    }
  }, [])

  const handleChange = editorState => {
    setEditorState(editorState)

    const contentState = editorState.getCurrentContent()
    const rawState = convertToRaw(contentState)
    onChange(rawState)
  }

  return (
    <Editor
      // toolbarOnFocus
      toolbar={{
        options: ['inline', 'blockType', 'list', 'textAlign'],
        inline: {
          inDropdown: true,
        },
        blockType: {
          inDropdown: true,
        },
        list: {
          inDropdown: true,
        },
        textAlign: {
          inDropdown: true,
        },
      }}
      editorState={editorState}
      onEditorStateChange={handleChange}
    />
  )
}

export default Wysiwyg
