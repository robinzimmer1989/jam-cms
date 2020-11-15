import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import createImagePlugin from 'draft-js-image-plugin'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { ContentState, EditorState, convertToRaw, AtomicBlockUtils, convertFromHTML } from 'draft-js'

// import app components
import MediaLibrary from '../MediaLibrary'

const imagePlugin = createImagePlugin()

const ImageUploadIcon = (props) => {
  const { editorState, onChange } = props

  const [open, setOpen] = useState(false)

  const handleSelect = (image) => {
    const { url, width, height, alt } = image

    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { width, height, alt, src: url })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')

    onChange(newEditorState)

    setOpen(false)
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>Img</div>

      <Modal title={'Media Library'} visible={open} onCancel={() => setOpen(false)} width={1000}>
        <MediaLibrary onSelect={handleSelect} />
      </Modal>
    </>
  )
}

const Wysiwyg = (props) => {
  const { value, onChange } = props

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // Convert html value to editor state on initial load
  // Afterward, we gonna use local state and send the converted html back to the store
  useEffect(() => {
    if (value) {
      const blocksFromHTML = convertFromHTML(value)
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      const editorState = EditorState.createWithContent(contentState)

      setEditorState(editorState)
    }
  }, [])

  const handleChange = (editorState) => {
    setEditorState(editorState)

    // Convert editor state to html and send to store
    const contentState = editorState.getCurrentContent()
    const rawState = convertToRaw(contentState)
    const html = draftToHtml(rawState)
    onChange(html)
  }

  return (
    <EditorContainer>
      <Editor
        // toolbarOnFocus
        toolbarCustomButtons={[<ImageUploadIcon modifier={imagePlugin.addImage} />]}
        plugins={[imagePlugin]}
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
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  .DraftEditor-editorContainer {
    border: 1px solid #eee;
    padding: 0 5px;
  }

  .rdw-editor-toolbar {
    padding: 0;
    margin: 0;
    border: none;
  }

  .rdw-dropdown-wrapper {
    width: 30px;
    border-radius: 50%;
  }

  .rdw-dropdown-carettoopen,
  .rdw-dropdown-carettoclose {
    display: none;
  }

  .rdw-dropdown-optionwrapper {
    width: 100px;
  }
`

export default Wysiwyg
