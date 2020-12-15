import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
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
                options: ['bold', 'italic'],
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

const icon = css`
  height: 30px;
  margin: 0 1px;
  background: #fff;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${colors.background.dark};
  }
`;

const EditorContainer = styled.div`
  position: relative;

  .rdw-editor-toolbar {
    position: relative;
    z-index: 2;
    padding: 0;
    margin: 0 0 4px;
    border: none;
    background: transparent;
    transform: translateX(-1px);

    a {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .rdw-editor-main {
    padding: 4px;
    min-height: 100px;
    background: #fff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
  }

  .rdw-dropdown-carettoopen,
  .rdw-dropdown-carettoclose {
    display: none;
  }

  .rdw-dropdown-optionwrapper {
    overflow: auto;
  }

  .rdw-option-wrapper,
  .rdw-dropdown-wrapper {
    ${icon}
  }

  .rdw-option-wrapper,
  .rdw-text-align-dropdown,
  .rdw-list-dropdown {
    width: 30px;
  }

  .rdw-option-active {
    background: ${colors.background.dark};
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }

  .rdw-editor-main pre {
    margin-bottom: 0;
    padding: 2px 4px;
  }
`;

export default Wysiwyg;
