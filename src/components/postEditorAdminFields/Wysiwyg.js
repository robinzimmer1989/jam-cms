import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
// import Editor from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, Modifier, convertFromRaw, convertToRaw, AtomicBlockUtils } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js-image-plugin/lib/plugin.css'

// import app components
import MediaLibrary from '../MediaLibrary'

const imagePlugin = createImagePlugin()

const ImageUploadIcon = (props) => {
  const [open, setOpen] = useState(false)

  const handleSelect = ({ id, storageKey }) => {
    const { editorState, onChange } = props
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '<img src="test" />',
      editorState.getCurrentInlineStyle()
    )
    onChange(EditorState.push(editorState, contentState, 'insert-characters'))

    // const { editorState, onChange } = props

    // const contentState = editorState.getCurrentContent()
    // const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
    //   src: `${bucketName}/${storageKey}`,
    // })
    // const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    // setOpen(false)
    // return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')

    // const contentState = Modifier.replaceText(
    //   editorState.getCurrentContent(),
    //   editorState.getSelection(),
    //   <img src={`${bucketName}/${storageKey}`} alt="" />,
    //   editorState.getCurrentInlineStyle()
    // )
    // onChange(EditorState.push(editorState, contentState, 'insert-characters'))
  }

  const handleClick = () => setOpen(true)

  return (
    <>
      <div onClick={handleClick}>Img</div>

      <Modal title={'Media Library'} visible={open} onCancel={() => setOpen(false)} width={1000}>
        <MediaLibrary onSelect={handleSelect} />
      </Modal>
    </>
  )
}

const Wysiwyg = (props) => {
  const { value, onChange } = props

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(value)))
    }
  }, [])

  const handleChange = (editorState) => {
    setEditorState(editorState)

    const contentState = editorState.getCurrentContent()
    const rawState = convertToRaw(contentState)
    onChange(rawState)
  }

  return (
    <Editor
      // toolbarOnFocus
      toolbarCustomButtons={[<ImageUploadIcon />]}
      plugins={[imagePlugin]}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'embedded'],
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
