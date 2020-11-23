import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import createImagePlugin from 'draft-js-image-plugin'
import draftToHtml from 'draftjs-to-html'
import { ContentState, EditorState, convertToRaw, AtomicBlockUtils, convertFromHTML } from 'draft-js'
import { FileImageOutlined } from '@ant-design/icons'

// import app components
import MediaLibrary from '../MediaLibrary'
import { generateCss } from '../../utils'

const imagePlugin = createImagePlugin()

const WysiwygImageUpload = (props) => {
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
      <IconContainer className="rdw-dropdown-wrapper" onClick={() => setOpen(true)}>
        <FileImageOutlined />
      </IconContainer>

      <Modal title={'Media Library'} visible={open} onCancel={() => setOpen(false)} width={1000}>
        <MediaLibrary onSelect={handleSelect} />
      </Modal>
    </>
  )
}

let Editor = () => <></>

const Wysiwyg = (props) => {
  const { value, onChange } = props

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    Editor = require('react-draft-wysiwyg').Editor
    setEditor(true)
  }, [])

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
      {editor && (
        <Editor
          toolbarCustomButtons={[<WysiwygImageUpload modifier={imagePlugin.addImage} />]}
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
          placeholder={`Write something...`}
        />
      )}
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }

  .rdw-editor-toolbar {
    padding: 0;
    margin: 0;
    border: none;
  }

  .rdw-dropdown-wrapper {
    width: 30px;
  }

  .rdw-dropdown-selectedtext {
    overflow: hidden;
  }

  .rdw-dropdown-carettoopen,
  .rdw-dropdown-carettoclose {
    display: none;
  }

  .rdw-dropdown-optionwrapper {
    width: 100px;
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Wysiwyg
