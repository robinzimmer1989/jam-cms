import React, { useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { Button, Space, Select as AntSelect, Checkbox, notification } from 'antd';
import { set } from 'lodash';

// import app components
import Input from './Input';
import Select from './Select';
import Caption from './Caption';
import Skeleton from './Skeleton';
import PostTreeSelect from './PostTreeSelect';
import MediaLibrary from './MediaLibrary';
import ImagePicker from './postEditorAdminFields/ImagePicker';

import { useStore } from '../store';
import { postActions, siteActions } from '../actions';

const PostSettings = () => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(false);

  const posts = sites[siteID]?.postTypes?.[post?.postTypeID]?.posts;

  // Remove own post for display in the page parent drop down
  const otherPosts = { ...posts };
  post && delete otherPosts[post.id];

  const handleSavePost = async () => {
    const { id, settings, frontPage } = site;

    setLoading(true);
    await postActions.updatePost({ siteID: id, ...post }, dispatch);
    await siteActions.updateSite({ id, settings, frontPage }, dispatch);
    setLoading(false);

    notification.success({
      message: 'Success',
      description: 'Updated successfully',
      placement: 'bottomRight',
    });
  };

  const handleChangePost = (name, value) => {
    const nextPost = produce(post, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    });
  };

  const handleChangeSite = (name, value) => {
    const nextSite = produce(site, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleSelectImage = (image) => {
    handleChangePost('featuredImage', image);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Container>
      <Space direction="vertical" size={20}>
        <Skeleton done={!!post} height={32}>
          <Select value={post?.status || ''} onChange={(value) => handleChangePost('status', value)} label={'Status'}>
            <AntSelect.Option value={'publish'} children={'Publish'} />
            <AntSelect.Option value={'draft'} children={'Draft'} />
            <AntSelect.Option value={'trash'} children={'Trash'} />
          </Select>
        </Skeleton>

        {post?.postTypeID === 'page' && (
          <Skeleton done={!!post} height={32}>
            <PostTreeSelect
              items={otherPosts}
              value={post?.parentID}
              onChange={(value) => handleChangePost('parentID', value)}
            />
          </Skeleton>
        )}

        <Skeleton done={!!post} height={32}>
          <Input
            value={post?.seoTitle || ''}
            onChange={(e) => handleChangePost('seoTitle', e.target.value)}
            label={'SEO Title'}
          />
        </Skeleton>

        <Skeleton done={!!post} height={98}>
          <Input
            value={post?.seoDescription || ''}
            onChange={(e) => handleChangePost('seoDescription', e.target.value)}
            label={'SEO Description'}
            rows={4}
          />
        </Skeleton>

        {post?.postTypeID !== 'page' && (
          <Skeleton done={!!post} height={100}>
            <Space direction="vertical" size={2}>
              <Caption children="Featured Image" />
              <ImagePicker
                value={post?.featuredImage}
                onClick={() =>
                  dispatch({
                    type: `SET_DIALOG`,
                    payload: {
                      open: true,
                      component: <MediaLibrary onSelect={handleSelectImage} allow={['image']} />,
                      width: 1000,
                    },
                  })
                }
              />
            </Space>
          </Skeleton>
        )}

        {post?.postTypeID === 'page' && (
          <Skeleton done={!!post} height={98}>
            <Checkbox
              value={post?.id}
              checked={post?.id === site?.frontPage}
              onChange={(e) => handleChangeSite('frontPage', e.target.checked ? e.target.value : '')}
              children="Front Page"
            />
          </Skeleton>
        )}

        <Skeleton done={!!post} height={32} width={78}>
          <Button children="Update" type="primary" onClick={handleSavePost} loading={loading} />
        </Skeleton>
      </Space>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px;
`;

export default PostSettings;
