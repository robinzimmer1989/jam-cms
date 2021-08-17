import React, { useEffect, useState } from 'react';
import { Space, Checkbox, Button } from 'antd';

// import app components
import Input from './Input';
import PostTreeSelect from './PostTreeSelect';
import { generateSlug } from '../utils';
import { RootState, useAppDispatch, useAppSelector, hideDialog } from '../redux';

const LinkSelector = (props: any) => {
  const { value = {}, placeholder, onChange, removable } = props;

  const {
    cms: { site },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [post, setPost] = useState('');
  const [link, setLink] = useState(value);

  useEffect(() => {
    // Clear post on load
    setPost('');
  }, []);

  const allPosts: any = [];

  Object.values(site?.postTypes).map((o: any) => {
    Object.values((o as any).posts).map(
      (p: any) => (p as any).status === 'publish' && allPosts.push({ ...p, caption: o.title })
    );
  });

  const handleChange = (name: any, newValue: any) => {
    setLink({ ...link, [name]: newValue });
  };

  const handleSubmit = () => {
    onChange(link);
    setLink({ title: '', url: '', target: '' });
    dispatch(hideDialog());
  };

  const handleRemove = () => {
    onChange({ title: link?.title, url: '', target: '' });
    setLink({ title: '', url: '', target: '' });
    dispatch(hideDialog());
  };

  const handleTreeSelect = (id: any) => {
    setPost(id);
    if (id) {
      const post = allPosts.find((o: any) => o.id === id);
      setLink({
        title: link?.title || post?.title,
        url: generateSlug({
          site,
          postTypeID: post.postTypeID,
          postID: post.id,
          leadingSlash: true,
        }),
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
          onChange={(e: any) => handleChange('url', e.target.value)}
        />

        <Input
          label="Text"
          value={link?.title || ''}
          placeholder={placeholder || 'Text'}
          onChange={(e: any) => handleChange('title', e.target.value)}
        />

        <Checkbox
          value={'_blank'}
          checked={link?.target === '_blank'}
          onChange={(e) => handleChange('target', e.target.checked ? '_blank' : '')}
          children="Open in new tab"
        />

        <Space>
          {removable && <Button children={'Remove'} onClick={handleRemove} danger />}
          <Button
            children={'Update'}
            onClick={handleSubmit}
            type="primary"
            disabled={!link?.url || !link?.title}
          />
        </Space>
      </Space>
    </>
  );
};

export default LinkSelector;
