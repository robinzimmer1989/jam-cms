import React, { useState } from 'react';
import { Button, Space, Select as AntSelect } from 'antd';

// import app components
import Select from '../Select';
import Input from '../Input';
import { RootState, useAppDispatch, useAppSelector, uiActions } from '../../redux';

const TermForm = (props: any) => {
  const {
    id,
    title: defaultTitle = '',
    slug: defaultSlug = '',
    parentID: defaultParentID = 0,
    description: defaultDescription = '',
    language: defaultLanguage = '',
    taxonomyID,
    terms,
    onSubmit,
  } = props;

  const {
    cms: { site, activeLanguage },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const termExists = !!id;

  const initialLanguage = defaultLanguage
    ? defaultLanguage
    : activeLanguage === 'all'
    ? site?.languages?.defaultLanguage
    : activeLanguage;

  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [parentID, setParentID] = useState(defaultParentID);
  const [description, setDescription] = useState(defaultDescription);
  const [language, setLanguage] = useState(initialLanguage);
  const [loading, setLoading] = useState(false);

  // Check if taxonomy supports languages
  const taxonomySupportsLanguages = !!site?.languages?.taxonomies?.find(
    (s: string) => s === taxonomyID
  );

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    setLoading(true);
    await onSubmit({ id, title, slug, parentID, description, language });
    setLoading(false);

    dispatch(uiActions.hideDialog());
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
          label="slug"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        {taxonomySupportsLanguages && (
          <Select
            label="Language"
            value={language}
            onChange={(value: string) => setLanguage(value)}
          >
            {site?.languages?.languages?.map((o: any) => (
              <AntSelect.Option key={o.id} value={o.slug} children={o.name} />
            ))}
          </Select>
        )}

        <Input
          rows={4}
          label="Description"
          value={description}
          allowClear
          onChange={(e: any) => setDescription(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        <Select value={parentID} onChange={(value: any) => setParentID(value)} label={'Parent'}>
          <AntSelect.Option value={0} children="None" />
          {terms &&
            Object.values(terms)
              .filter((o: any) => o.id !== id)
              .map((o: any) => <AntSelect.Option key={o.id} value={o.id} children={o.title} />)}
        </Select>
      </Space>

      <Button
        children={termExists ? 'Update' : 'Add'}
        onClick={handleSubmit}
        type="primary"
        block
        loading={loading}
      />
    </Space>
  );
};

export default TermForm;
