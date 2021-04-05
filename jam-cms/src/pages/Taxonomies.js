import React from 'react';
import { Button, PageHeader, Popconfirm } from 'antd';
import styled from 'styled-components';

// import app components
import CmsLayout from '../components/CmsLayout';
import TaxonomyForm from '../components/TaxonomyForm';
import ListItem from '../components/ListItem';

import { taxonomyActions } from '../actions';
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

  const handleUpsert = async ({ id, title, slug, postTypes }) => {
    if (taxonomies?.[id]) {
      await taxonomyActions.updateTaxonomy(
        { siteID, id, title, slug, postTypes },
        dispatch,
        config
      );
    } else {
      await taxonomyActions.addTaxonomy({ siteID, id, title, slug, postTypes }, dispatch, config);
    }
  };

  const handleDelete = async ({ taxonomyID }) => {
    await taxonomyActions.deleteTaxonomy({ siteID, id: taxonomyID }, dispatch, config);
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
            onSubmit={handleUpsert}
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

          if (o.editable) {
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
          }

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
