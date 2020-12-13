import React, { useState } from 'react';
import { Button, Space } from 'antd';

// import app components
import Input from './Input';
import { useStore } from '../store';

const CollectionForm = (props) => {
  const { id, title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props;

  const [, dispatch] = useStore();

  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    await onSubmit({ id, title, slug });

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <Button children="Add" onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default CollectionForm;
