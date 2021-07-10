import React, { useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';
// import app components
import Input from './Input';
import Select from './Select';
import PostTreeSelect from './PostTreeSelect';
import { useStore } from '../store';
const PostForm = (props: any) => {
    const { postTypeID: defaultPostTypeID, onSubmit } = props;
    // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
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
    return (<Space direction="vertical" size={20}>
      <Input label="Title" value={title} onChange={(e: any) => setTitle(e.target.value)} placeholder={''} onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}/>

      {!defaultPostTypeID &&
            sites[siteID]?.postTypes &&
            Object.values(sites[siteID].postTypes).length > 1 && (<Select label="Post Type" value={postTypeID} onChange={(v: any) => setPostTypeID(v)}>
            {Object.values(sites[siteID].postTypes).map((o) => (<AntSelect.Option key={(o as any).id} value={(o as any).id} children={(o as any).title}/>))}
          </Select>)}

      {postTypeID === 'page' && (<PostTreeSelect label="Parent" items={Object.values(posts)} value={parentID} onChange={(value: any) => setParentID(value)}/>)}

      <Button children={`Add`} onClick={handleSubmit} type="primary" disabled={!title}/>
    </Space>);
};
export default PostForm;
