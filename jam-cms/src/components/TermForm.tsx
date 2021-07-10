import React, { useState } from 'react';
import { Button, Space, Select as AntSelect } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Select' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Select from './Select';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

const TermForm = (props: any) => {
  const {
    id,
    title: defaultTitle = '',
    slug: defaultSlug = '',
    parentID: defaultParentID = 0,
    description: defaultDescription = '',
    terms,
    onSubmit,
  } = props;

  const termExists = !!id;

  const [, dispatch] = useStore();

  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [parentID, setParentID] = useState(defaultParentID);
  const [description, setDescription] = useState(defaultDescription);

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    await onSubmit({ id, title, slug, parentID, description });

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical" size={20}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input
          label="Title"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input
          label="slug"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input
          rows={4}
          label="Description"
          value={description}
          allowClear
          onChange={(e: any) => setDescription(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
        />

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Select value={parentID} onChange={(value: any) => setParentID(value)} label={'Parent'}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AntSelect.Option value={0} children="None" />
          {terms &&
            terms
              .filter((o: any) => o.id !== id)
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              .map((o: any) => <AntSelect.Option key={o.id} value={o.id} children={o.title} />)}
        </Select>
      </Space>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button
        children={termExists ? 'Update' : 'Add'}
        onClick={handleSubmit}
        type="primary"
        block
      />
    </Space>
  );
};

export default TermForm;
