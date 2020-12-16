import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { Modifier, EditorState } from 'draft-js';
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import { getEntityRange, getSelectionEntity } from 'draftjs-utils';
import { LinkOutlined } from '@ant-design/icons';

// import app components
import LinkSelector from '../LinkSelector';
import { formatSlug } from '../../utils';
import { colors } from '../../theme';

const WysiwygLinkSelect = (props) => {
  const { editorState, onChange } = props;

  const [open, setOpen] = useState(false);

  const contentState = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning && blockWithLinkAtBeginning.getEntityAt(startOffset);

  let data = {
    title: '',
    utl: '',
  };

  // If a link is selected we want to get the entire link text, whereas when a text is selected we just want the selection
  if (linkKey) {
    const linkInstance = contentState.getEntity(linkKey);

    if (linkInstance) {
      data = linkInstance.getData();
    }
  } else {
    const selectedText = getFragmentFromSelection(editorState);
    data.title = selectedText ? selectedText.map((x) => x.getText()).join('\n') : '';
  }

  const handleChange = (link) => {
    if (link) {
      const { title, url } = link;

      // https://stackoverflow.com/a/63977337/14726146
      let selection = editorState.getSelection();
      const entityRange = getEntityRange(editorState, getSelectionEntity(editorState));

      if (entityRange) {
        const isBackward = selection.getIsBackward();

        if (isBackward) {
          selection = selection.merge({
            anchorOffset: entityRange.end,
            focusOffset: entityRange.start,
          });
        } else {
          selection = selection.merge({
            anchorOffset: entityRange.start,
            focusOffset: entityRange.end,
          });
        }
      }

      const contentState = editorState.getCurrentContent();

      let newContentState, newEditorState;

      // Add or remove link depending on if url is provided
      if (url) {
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
          url: url.includes('http') ? url : formatSlug(url, true),
          title,
        });

        newContentState = Modifier.replaceText(
          contentState,
          selection,
          title,
          editorState.getCurrentInlineStyle(),
          contentStateWithEntity.getLastCreatedEntityKey()
        );
        newEditorState = EditorState.set(editorState, { currentContent: newContentState });
      } else {
        newContentState = Modifier.applyEntity(contentState, selection, null);
        newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
      }

      onChange(newEditorState);
    }

    setOpen(false);
  };

  return (
    <>
      <IconContainer
        className="rdw-dropdown-wrapper rdw-link-select"
        onClick={() => setOpen(true)}
        active={!!data}
      >
        <a className="rdw-dropdown-selectedtext">
          <LinkOutlined />
        </a>
      </IconContainer>

      <Modal
        title={'Link'}
        visible={open}
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >
        {open && <LinkSelector value={data} onChange={handleChange} removable={!!data.url} />}
      </Modal>
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    path {
      fill: ${({ active }) => (active ? colors.primary.dark : 'inherit')};
    }
  }
`;

export default WysiwygLinkSelect;
