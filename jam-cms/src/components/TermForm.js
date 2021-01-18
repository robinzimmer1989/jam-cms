import React, { useState } from 'react';
import { Button, Space, Select as AntSelect } from 'antd';

// import app components
import Select from './Select';
import Input from './Input';
import { useStore } from '../store';

const TermForm = (props) => {
  const {
    site,
    id,
    title: defaultTitle = '',
    slug: defaultSlug = '',
    parentID: defaultParentID = null,
    description: defaultDescription = '',
    onSubmit,
  } = props;

  const termExists = !!id;

  const [, dispatch] = useStore();

  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [parentID, setParentID] = useState(defaultParentID);
  const [description, setDescription] = useState(defaultDescription);

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    await onSubmit({ id, title, slug, parentID, description });

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical" size={20}>
      <Space direction="vertical">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </Space>
      <Button
        children={termExists ? 'Update' : 'Add'}
        onClick={handleSubmit}
        type="primary"
        block
      />
    </Space>
  );
};

export default TermForm;
