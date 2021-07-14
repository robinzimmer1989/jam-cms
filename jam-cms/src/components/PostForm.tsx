import React, { useState } from 'react';
import { Space, Button } from 'antd';

// import app components
import Input from './Input';
import PostTreeSelect from './PostTreeSelect';
import { useStore } from '../store';

const PostForm = (props: any) => {
  const { postTypeID, onSubmit } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [title, setTitle] = useState('');
  const [parentID, setParentID] = useState(0);
  const [loading, setLoading] = useState(false);
  const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    setLoading(true);

    await onSubmit({ postTypeID, title, parentID });

    setTitle('');
    setParentID(0);
    setLoading(false);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical" size={20}>
      <Input
        id="post-title"
        label="Title"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        placeholder={''}
        onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
      />

      {postTypeID === 'page' && (
        <PostTreeSelect
          id="post-parent"
          label="Parent"
          items={Object.values(posts)}
          value={parentID}
          onChange={(value: any) => setParentID(value)}
        />
      )}

      <Button
        id="submit-create-post"
        children="Add"
        onClick={handleSubmit}
        type="primary"
        disabled={!title}
        loading={loading}
      />
    </Space>
  );
};

export default PostForm;
