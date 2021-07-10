import React, { useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Select' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Select from './Select';
// @ts-expect-error ts-migrate(6142) FIXME: Module './PostTreeSelect' was resolved to '/Users/... Remove this comment to see the full error message
import PostTreeSelect from './PostTreeSelect';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
const PostForm = (props: any) => {
    const { postTypeID: defaultPostTypeID, onSubmit } = props;
    const [{ cmsState: { sites, siteID }, }, dispatch,] = useStore();
    const [title, setTitle] = useState('');
    const [postTypeID, setPostTypeID] = useState(defaultPostTypeID || 'page');
    const [parentID, setParentID] = useState(0);
    const posts = sites[siteID]?.postTypes?.[postTypeID]?.posts;
    const handleSubmit = async () => {
        if (!title) {
            return;
        }
        await onSubmit({ postTypeID, title, parentID });
        setTitle('');
        setParentID(0);
        dispatch({ type: 'CLOSE_DIALOG' });
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<Space direction="vertical" size={20}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input label="Title" value={title} onChange={(e: any) => setTitle(e.target.value)} placeholder={''} onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}/>

      {!defaultPostTypeID &&
            sites[siteID]?.postTypes &&
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            Object.values(sites[siteID].postTypes).length > 1 && (<Select label="Post Type" value={postTypeID} onChange={(v: any) => setPostTypeID(v)}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {Object.values(sites[siteID].postTypes).map((o) => (<AntSelect.Option key={(o as any).id} value={(o as any).id} children={(o as any).title}/>))}
          </Select>)}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {postTypeID === 'page' && (<PostTreeSelect label="Parent" items={Object.values(posts)} value={parentID} onChange={(value: any) => setParentID(value)}/>)}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button children={`Add`} onClick={handleSubmit} type="primary" disabled={!title}/>
    </Space>);
};
export default PostForm;
