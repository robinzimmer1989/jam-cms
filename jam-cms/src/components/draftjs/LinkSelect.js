import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { Modifier, EditorState } from 'draft-js';
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
  const linkInstance = linkKey && contentState.getEntity(linkKey);
  const data = linkInstance && linkInstance.getData();

  const handleSelect = (link) => {
    if (link) {
      const { title, url } = link;

      const selectionState = editorState.getSelection();

      const contentState = editorState.getCurrentContent();

      const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
        url: formatSlug(url),
        title,
      });

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      const contentStateWithLink = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        title,
        editorState.getCurrentInlineStyle(),
        entityKey
      );

      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithLink,
      });

      onChange(newEditorState);
    }

    setOpen(false);
  };

  return (
    <>
      <IconContainer className="rdw-dropdown-wrapper" onClick={() => setOpen(true)} active={!!data}>
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
        {open && <LinkSelector value={data} onChange={handleSelect} />}
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
