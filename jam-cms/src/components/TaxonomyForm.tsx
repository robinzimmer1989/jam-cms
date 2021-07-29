import React, { useState } from 'react';
import { Button, Space, Select as AntSelect } from 'antd';

// import app components
import Select from './Select';
import Input from './Input';
import { useStore } from '../store';

const TaxonomyForm = (props: any) => {
  const {
    site,
    id: defaultId,
    title: defaultTitle = '',
    slug: defaultSlug = '',
    postTypes: defaultPostTypes = [],
    onSubmit,
  } = props;

  const taxonomyExists = !!defaultId;

  const [, dispatch] = useStore();
  const [title, setTitle] = useState(defaultTitle);
  const [id, setId] = useState(defaultId);
  const [slug, setSlug] = useState(defaultSlug);
  const [postTypes, setPostTypes] = useState(defaultPostTypes);

  const handleSubmit = async () => {
    if (!title || !id) {
      return;
    }
    await onSubmit({ id, title, slug, postTypes });
    dispatch({ type: 'CLOSE_DIALOG' });
  };

  const handleChangeId = (e: any) => {
    const formattedId = e.target.value.replace(/[^a-zA-Z ]/g, '').toLowerCase();
    setId(formattedId);
  };

  return (
    <Space direction="vertical" size={20}>
      <Space direction="vertical">
        <Input
          label="Title"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        <Input
          label="name"
          value={id}
          instructions="The id must match the template file id (i.e. post)"
          onChange={handleChangeId}
          disabled={taxonomyExists}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        <Input
          label="slug"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        <Select
          label="Collections"
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={postTypes}
          onChange={(v: any) => setPostTypes(v)}
        >
          {site?.postTypes &&
            Object.values(site.postTypes).map((o: any) => (
              <AntSelect.Option key={o.id} value={o.id} children={o.title} />
            ))}
        </Select>
      </Space>

      <Button
        children={taxonomyExists ? 'Update' : 'Add'}
        onClick={handleSubmit}
        type="primary"
        block
      />
    </Space>
  );
};

export default TaxonomyForm;
