import React, { useEffect, useState } from 'react';
import { Space, Checkbox, Button } from 'antd';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module './PostTreeSelect' was resolved to '/Users/... Remove this comment to see the full error message
import PostTreeSelect from './PostTreeSelect';
import { generateSlug } from '../utils';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
const LinkSelector = (props: any) => {
    const { value = {}, placeholder, onChange, removable } = props;
    const [{ config, cmsState: { sites, siteID }, }, dispatch,] = useStore();
    const [post, setPost] = useState('');
    const [link, setLink] = useState(value);
    useEffect(() => {
        // Clear post on load
        setPost('');
    }, []);
    const allPosts: any = [];
    Object.values(sites[siteID]?.postTypes).map((o) => {
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        Object.values((o as any).posts).map((p) => (p as any).status === 'publish' && allPosts.push({ ...p, caption: o.title }));
    });
    const handleChange = (name: any, newValue: any) => {
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
    const handleTreeSelect = (id: any) => {
        setPost(id);
        if (id) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
            const post = allPosts.find((o) => o.id === id);
            const postType = Object.values(sites[siteID]?.postTypes).find((o) => (o as any).id === post.postTypeID);
            setLink({
                title: link.title || post.title,
                url: generateSlug(postType, post.id, sites[siteID]?.frontPage, true),
                target: false,
            });
        }
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Space direction="vertical" size={20}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <PostTreeSelect label="Select Post" items={allPosts} value={post} onChange={handleTreeSelect}/>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input label="Link" value={link?.url || ''} placeholder={'https://'} onChange={(e: any) => handleChange('url', e.target.value)}/>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input label="Text" value={link?.title || ''} placeholder={placeholder || 'Text'} onChange={(e: any) => handleChange('title', e.target.value)}/>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Checkbox value={'_blank'} checked={link?.target === '_blank'} onChange={(e) => handleChange('target', e.target.checked ? '_blank' : '')} children="Open in new tab"/>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {removable && <Button children={'Remove'} onClick={handleRemove} danger/>}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button children={'Update'} onClick={handleSubmit} type="primary" disabled={!link.url || !link.title}/>
      </Space>
    </Space>
  </>;
};
export default LinkSelector;
