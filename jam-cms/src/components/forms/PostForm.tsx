import React, { useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';

// import app components
import Input from '../Input';
import Select from '../Select';
import { useStore } from '../../store';

const PostForm = (props: any) => {
  const { postTypeID, onSubmit } = props;

  const [
    {
      cmsState: { sites, siteID, activeLanguage },
    },
    dispatch,
  ] = useStore();

  const defaultLanguage =
    activeLanguage === 'all' ? sites[siteID]?.languages?.defaultLanguage : activeLanguage;

  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState(defaultLanguage);
  const [loading, setLoading] = useState(false);

  // Check if post type supports languages
  const postTypeSupportsLanguages = !!sites[siteID]?.languages?.postTypes?.find(
    (s: string) => s === postTypeID
  );

  const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    setLoading(true);

    await onSubmit({ postTypeID, title, language });

    setTitle('');
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

      {postTypeSupportsLanguages && (
        <Select label="Language" value={language} onChange={(value: string) => setLanguage(value)}>
          {sites[siteID]?.languages?.languages?.map((o: any) => (
            <AntSelect.Option key={o.id} value={o.slug} children={o.name} />
          ))}
        </Select>
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
