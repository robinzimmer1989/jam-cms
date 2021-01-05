import React, { useState } from 'react';
import { Space, Button } from 'antd';

// import app components
import Input from './Input';
import PostTreeSelect from './PostTreeSelect';
import { useStore } from '../store';

const PostForm = (props) => {
  const { postTypeID, onSubmit } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [title, setTitle] = useState('');
  const [parentID, setParentID] = useState(0);

  const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;

  const handleSubmit = async () => {
    await onSubmit({ title, parentID });

    setTitle('');
    setParentID(0);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical" size={20}>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={``}
      />

      {postTypeID === 'page' && (
        <PostTreeSelect
          label="Parent"
          items={Object.values(posts)}
          value={parentID}
          onChange={(value) => setParentID(value)}
        />
      )}

      <Button children={`Add`} onClick={handleSubmit} type="primary" disabled={!title} />
    </Space>
  );
};

export default PostForm;
