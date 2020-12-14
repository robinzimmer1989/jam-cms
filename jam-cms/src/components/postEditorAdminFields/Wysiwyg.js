import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

import LinkSelect from '../draftjs/LinkSelect';
import { colors } from '../../theme';
import { useStore } from '../../store';

let Editor = () => <></>;

const Wysiwyg = (props) => {
  const { value, onChange } = props;

  const [
    {
      editorState: { editorIndex },
    },
  ] = useStore();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editor, setEditor] = useState(null);

  const editorRef = useRef(null);

  useEffect(() => {
    // We have to lazy load the component like this because SSR doesn't work otherwise
    Editor = require('react-draft-wysiwyg').Editor;
    setEditor(true);
  }, []);

  // Convert html value to editor state on initial load
  // Afterward, we gonna use local state and send the converted html back to the store
  useEffect(() => {
    if (value) {
      const blocksFromHTML = htmlToDraft(value);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
  }, [editorIndex]);

  const handleChange = (editorState) => {
    setEditorState(editorState);

    // Convert editor state to html and send to store
    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);
    const html = draftToHtml(rawState);

    onChange(html);
  };

  return (
    <EditorContainer>
      {editor && (
        <div>
          <Editor
            toolbarCustomButtons={[<LinkSelect />]}
            editorState={editorState}
            onEditorStateChange={handleChange}
            placeholder="Write something..."
            ref={editorRef}
            toolbar={{
              options: ['inline', 'blockType', 'textAlign', 'list'],
              inline: {
                inDropdown: true,
                options: ['bold', 'italic', 'underline'],
              },
              blockType: {
                inDropdown: true,
              },
              textAlign: {
                inDropdown: true,
              },
              list: {
                inDropdown: true,
              },
            }}
            stripPastedStyles={true}
          />
        </div>
      )}
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  position: relative;
  padding: 5px;
  background: #fff;
  border: 1px solid #d9d9d9;

  .rdw-editor-toolbar {
    padding: 0;
    margin: 0;
    border: none;

    a {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .rdw-editor-main {
    min-height: 220px;
  }

  .rdw-inline-dropdown {
    width: auto;
  }

  .rdw-dropdown-selectedtext {
    padding: 0 8px;
  }

  .rdw-dropdown-carettoopen,
  .rdw-dropdown-carettoclose {
    display: none;
  }

  .rdw-dropdown-wrapper {
    position: relative;
    width: auto;
    margin: 0 2px 2px 0;

    &:hover {
      box-shadow: none;
      border-color: ${colors.primary.dark};
    }
  }

  .rdw-dropdown-optionwrapper {
    overflow-y: auto;
  }

  .rdw-inline-dropdownoption {
    align-items: center;
  }

  .rdw-editor-main {
    overflow: unset;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }

  .DraftEditor-editorContainer {
    border: none;
  }

  .rdw-image-alignment-options-popup {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
  }

  .rdw-link-decorator-icon {
    display: none;
  }

  .rdw-editor-main pre {
    margin-bottom: 0;
    padding: 2px 4px;
  }
`;

export default Wysiwyg;
