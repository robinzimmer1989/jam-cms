import React, { useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { Button, Space, notification } from 'antd';
import { set } from 'lodash';

// import app components
import Input from './Input';
import Skeleton from './Skeleton';

import { useStore } from '../store';
import { collectionActions } from '../actions';

const CollectionSettings = ({ postTypeID }) => {
  const [
    {
      config,
      cmsState: { siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(false);

  const postType = site?.postTypes?.[postTypeID];

  const handleUpdate = async () => {
    const { id, title, slug, template } = postType;

    setLoading(true);
    await collectionActions.updateCollection(
      { siteID, id, title, slug, template },
      dispatch,
      config
    );
    setLoading(false);

    notification.success({
      message: 'Success',
      description: 'Updated successfully',
      placement: 'bottomRight',
    });
  };

  const handleChange = (e) => {
    const nextPostType = produce(postType, (draft) => {
      return set(draft, `${e.target.name}`, e.target.value);
    });

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    });
  };

  return (
    <Container>
      <Space direction="vertical" size={20}>
        <Skeleton done={!!postType} height={32}>
          <Input
            value={postType?.title}
            name={`title`}
            onChange={handleChange}
            label={`Title`}
            disabled={postTypeID === 'page'}
          />
        </Skeleton>

        <Skeleton done={!!postType} height={32}>
          <Input
            value={postType?.slug}
            name={`slug`}
            onChange={handleChange}
            label={`Slug`}
            disabled={postTypeID === 'page'}
          />
        </Skeleton>

        {postTypeID !== 'page' && (
          <Button children={`Update`} type="primary" onClick={handleUpdate} loading={loading} />
        )}
      </Space>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px;
`;

export default CollectionSettings;
