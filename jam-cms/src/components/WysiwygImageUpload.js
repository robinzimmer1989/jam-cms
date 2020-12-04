import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { AtomicBlockUtils } from 'draft-js';
import { FileImageOutlined } from '@ant-design/icons';

import 'draft-js-image-plugin/lib/plugin.css';

// import app components
import MediaLibrary from './MediaLibrary';

const WysiwygImageUpload = (props) => {
  const { editorState, onChange } = props;

  const [open, setOpen] = useState(false);

  const handleSelect = (image) => {
    const { url, width, height, alt } = image;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
      width,
      height,
      alt,
      src: url,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    onChange(newEditorState);

    setOpen(false);
  };

  return (
    <>
      <IconContainer className="rdw-dropdown-wrapper" onClick={() => setOpen(true)}>
        <FileImageOutlined />
      </IconContainer>

      <Modal title={'Media Library'} visible={open} onCancel={() => setOpen(false)} width={1000}>
        <MediaLibrary onSelect={handleSelect} />
      </Modal>
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WysiwygImageUpload;
