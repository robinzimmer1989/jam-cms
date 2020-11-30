import React, { useState } from 'react';
import { Space, Button } from 'antd';

// import app components
import Input from './Input';
import PostTreeSelect from './PostTreeSelect';
import { formatSlug } from '../utils';
import { useStore } from '../store';

const PostForm = (props) => {
  const { postTypeID, title: defaultTitle = '', slug: defaultSlug = '', onSubmit } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [parentID, setParentID] = useState('');

  const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;

  const handleSubmit = async () => {
    if (!title || slug === '/') {
      return;
    }

    let formattedSlug;

    if (slug) {
      formattedSlug = formatSlug(slug);
    } else {
      formattedSlug = formatSlug(title);
    }

    await onSubmit({ title, slug: formattedSlug, parentID });

    setTitle('');
    setSlug('');
    setParentID('');

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical" size={20}>
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={``} />
      <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={`(Optional)`} />

      {postTypeID === 'page' && (
        <PostTreeSelect items={posts} value={parentID} onChange={(value) => setParentID(value)} />
      )}

      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default PostForm;
