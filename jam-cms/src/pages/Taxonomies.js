import React from 'react';
import { Button, PageHeader, Popconfirm, Space } from 'antd';
import styled from 'styled-components';

// import app components
import CmsLayout from '../components/CmsLayout';
import TaxonomyForm from '../components/TaxonomyForm';
import ListItem from '../components/ListItem';

import { collectionActions } from '../actions';
import { useStore } from '../store';

const Taxonomies = () => {
  const [
    {
      config,
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const taxonomies = sites[siteID]?.taxonomies;

  console.log(sites[siteID]);

  const handleAdd = async ({ id, title, slug }) => {
    // if (postTypes?.[id]) {
    //   await collectionActions.updateCollection({ siteID, id, title, slug }, dispatch, config);
    // } else {
    //   await collectionActions.addCollection({ siteID, id, title, slug }, dispatch, config);
    // }
  };

  const handleDelete = async ({ taxonomyID }) => {
    // await collectionActions.deleteCollection({ siteID, id: postTypeID }, dispatch, config);
  };

  const handleOpenDialog = (id = null, title = '', slug = '', postTypes = []) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Taxonomy`,
        component: (
          <TaxonomyForm
            site={sites[siteID]}
            id={id}
            title={title}
            slug={slug}
            postTypes={postTypes}
            onSubmit={handleAdd}
          />
        ),
      },
    });
  };

  return (
    <CmsLayout pageTitle={`Taxonomies`}>
      <PageHeader>
        <Button children={`Add`} onClick={() => handleOpenDialog()} type="primary" />
      </PageHeader>

      {taxonomies &&
        Object.values(taxonomies).map((o) => {
          const actions = [];

          actions.push(
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDelete({ taxonomyID: o.id })}
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
              onClick={() => handleOpenDialog(o.id, o.title, o.slug, o.postTypes)}
            />
          );

          return (
            <StyledListItem key={o.id} actions={actions} title={o.title} subtitle={o.slug || '/'} />
          );
        })}
    </CmsLayout>
  );
};

const StyledListItem = styled(ListItem)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Taxonomies;
