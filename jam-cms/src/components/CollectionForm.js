import React, { useState } from 'react';
import { Button, Space } from 'antd';

// import app components
import Input from './Input';
import { useStore } from '../store';

const CollectionForm = (props) => {
  const { id: defaultId, title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props;

  const collectionExists = !!defaultId;

  const [, dispatch] = useStore();

  const [title, setTitle] = useState(defaultTitle);
  const [id, setId] = useState(defaultId);
  const [slug, setSlug] = useState(defaultSlug);

  const handleSubmit = async () => {
    if (!title || !id) {
      return;
    }

    await onSubmit({ id, title, slug });

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  const handleChangeId = (e) => {
    const formattedId = e.target.value.replace(/[^a-zA-Z ]/g, '').toLowerCase();
    setId(formattedId);
  };

  return (
    <Space direction="vertical" size={20}>
      <Space direction="vertical">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input
          label="name"
          value={id}
          instructions="The id must match the template file id (i.e. post)"
          onChange={handleChangeId}
          disabled={collectionExists}
        />
        <Input label="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </Space>
      <Button children="Add" onClick={handleSubmit} type="primary" block />
    </Space>
  );
};

export default CollectionForm;
