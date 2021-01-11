import React from 'react';
import { Button, PageHeader, Popconfirm, Space } from 'antd';

// import app components
import CmsLayout from '../CmsLayout';
import CollectionForm from '../CollectionForm';
import ListItem from '../ListItem';

import { collectionActions } from '../../actions';
import { useStore } from '../../store';

const Collections = () => {
  const [
    {
      config,
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const postTypes = sites[siteID]?.postTypes;

  const handleAddPostType = async ({ id, title, slug }) => {
    if (postTypes?.[id]) {
      await collectionActions.updateCollection({ siteID, id, title, slug }, dispatch, config);
    } else {
      await collectionActions.addCollection({ siteID, id, title, slug }, dispatch, config);
    }
  };

  const handleDeletePostType = async ({ postTypeID }) => {
    await collectionActions.deleteCollection({ siteID, id: postTypeID }, dispatch, config);
  };

  const handleOpenDialog = (id = null, title = '', slug = '') => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Collection`,
        component: (
          <CollectionForm
            id={id}
            title={title}
            slug={slug}
            siteID={siteID}
            onSubmit={handleAddPostType}
          />
        ),
      },
    });
  };

  return (
    <CmsLayout pageTitle={`Collections`}>
      <PageHeader>
        <Button children={`Add`} onClick={() => handleOpenDialog()} type="primary" />
      </PageHeader>

      <Space direction="vertical" size={20}>
        {postTypes &&
          Object.values(postTypes).map((o) => {
            const actions = [];

            if (o.id !== 'page') {
              actions.push(
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDeletePostType({ postTypeID: o.id })}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" children={`Delete`} danger />
                </Popconfirm>
              );

              actions.push(
                <Button
                  size="small"
                  children={`Edit`}
                  onClick={() => handleOpenDialog(o.id, o.title, o.slug)}
                />
              );
            }

            return (
              <ListItem
                key={o.id}
                actions={actions}
                title={o.title}
                subtitle={o.slug || '/'}
                hideImage
              />
            );
          })}
      </Space>
    </CmsLayout>
  );
};

export default Collections;
