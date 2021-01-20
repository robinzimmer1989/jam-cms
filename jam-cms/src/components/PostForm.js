import React, { useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';

// import app components
import Input from './Input';
import Select from './Select';
import PostTreeSelect from './PostTreeSelect';
import { useStore } from '../store';

const PostForm = (props) => {
  const { postTypeID: defaultPostTypeID, onSubmit } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [title, setTitle] = useState('');
  const [postTypeID, setPostTypeID] = useState(defaultPostTypeID || 'page');
  const [parentID, setParentID] = useState(0);

  const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;

  const handleSubmit = async () => {
    await onSubmit({ postTypeID, title, parentID });

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

      {!defaultPostTypeID &&
        sites[siteID]?.postTypes &&
        Object.values(sites[siteID].postTypes).length > 1 && (
          <Select label="Post Type" value={postTypeID} onChange={(v) => setPostTypeID(v)}>
            {Object.values(sites[siteID].postTypes).map((o) => (
              <AntSelect.Option key={o.id} value={o.id} children={o.title} />
            ))}
          </Select>
        )}

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
