import React, { useState } from 'react';
import { Button, Space, Select as AntSelect } from 'antd';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Select' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Select from './Select';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
const TaxonomyForm = (props: any) => {
    const { site, id: defaultId, title: defaultTitle = '', slug: defaultSlug = '', postTypes: defaultPostTypes = [], onSubmit, } = props;
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<Space direction="vertical" size={20}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input label="Title" value={title} onChange={(e: any) => setTitle(e.target.value)} onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input label="name" value={id} instructions="The id must match the template file id (i.e. post)" onChange={handleChangeId} disabled={taxonomyExists} onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Input label="slug" value={slug} onChange={(e: any) => setSlug(e.target.value)} onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Select label="Collections" mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" defaultValue={postTypes} onChange={(v: any) => setPostTypes(v)}>
          {site?.postTypes &&
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            Object.values(site.postTypes).map((o) => (<AntSelect.Option key={(o as any).id} value={(o as any).id} children={(o as any).title}/>))}
        </Select>
      </Space>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button children={taxonomyExists ? 'Update' : 'Add'} onClick={handleSubmit} type="primary" block/>
    </Space>);
};
export default TaxonomyForm;
