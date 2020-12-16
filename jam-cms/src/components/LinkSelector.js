import React, { useState } from 'react';
import { Space, Checkbox, Button } from 'antd';

// import app components
import Input from './Input';
import PostTreeSelect from './PostTreeSelect';
import { generateSlug } from '../utils';
import { useStore } from '../store';

const LinkSelector = (props) => {
  const { value = {}, placeholder, onChange, removable } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [post, setPost] = useState('');
  const [link, setLink] = useState(value);

  const allPosts = [];
  Object.values(sites[siteID]?.postTypes).map((o) => {
    Object.values(o.posts).map((p) => allPosts.push({ ...p, caption: o.title }));
  });

  const handleChange = (name, newValue) => {
    setLink({ ...link, [name]: newValue });
  };

  const handleSubmit = () => {
    onChange(link);
    setLink({ title: '', url: '', target: '' });
    dispatch({ type: `CLOSE_DIALOG` });
  };

  const handleRemove = () => {
    onChange({ title: link.title, url: '', target: '' });
    setLink({ title: '', url: '', target: '' });
    dispatch({ type: `CLOSE_DIALOG` });
  };

  const handleTreeSelect = (id) => {
    if (id) {
      setPost(id);
      const post = allPosts.find((o) => o.id === id);

      const postType = Object.values(sites[siteID]?.postTypes).find(
        (o) => o.id === post.postTypeID
      );

      setLink({
        title: link.title || post.title,
        url: generateSlug(postType, post.id, sites[siteID]?.frontPage),
        target: false,
      });
    }
  };

  return (
    <>
      <Space direction="vertical" size={20}>
        <PostTreeSelect
          label="Select Post"
          items={allPosts}
          value={post}
          onChange={handleTreeSelect}
        />

        <Input
          label="Link"
          value={link?.url || ''}
          placeholder={'https://'}
          onChange={(e) => handleChange('url', e.target.value)}
        />

        <Input
          label="Text"
          value={link?.title || ''}
          placeholder={placeholder || 'Text'}
          onChange={(e) => handleChange('title', e.target.value)}
        />

        <Checkbox
          value={'_blank'}
          checked={link?.target || false}
          onChange={(e) => handleChange('target', e.target.checked ? e.target.value : '')}
          children="Open in new tab"
        />

        <Space>
          {removable && <Button children={'Remove'} onClick={handleRemove} danger />}
          <Button children={'Update'} onClick={handleSubmit} type="primary" />
        </Space>
      </Space>
    </>
  );
};

export default LinkSelector;
