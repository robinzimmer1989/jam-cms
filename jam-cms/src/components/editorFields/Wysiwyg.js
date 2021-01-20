import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

import LinkSelect from '../draftjs/LinkSelect';
import { colors } from '../../theme';

let Editor = () => <></>;

const Wysiwyg = (props) => {
  const { index, value, onChange } = props;

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
  }, [index]);

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
  border: none;
  box-shadow: none;

  &:hover {
    background: ${colors.secondaryContrast};
    box-shadow: none;
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
      pointer-events: all !important;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .rdw-editor-main {
    min-height: 100px;
    background: #fff;
    font-size: 13px;
    line-height: 18px;
  }

  .rdw-dropdown-carettoopen,
  .rdw-dropdown-carettoclose,
  .rdw-link-decorator-icon {
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
    background: ${colors.tertiary};
  }

  .rdw-block-dropdown {
    width: auto;
    padding: 0 4px;
  }

  .public-DraftStyleDefault-block {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .public-DraftStyleDefault-listLTR {
    .public-DraftStyleDefault-block {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }

  pre {
    margin: 0;

    .public-DraftStyleDefault-block {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  h1 {
    font-size: 22px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  h5 {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  h6 {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  a {
    text-decoration: underline;
    color: ${colors.primary};
  }
`;

export default Wysiwyg;
