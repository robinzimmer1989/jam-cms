import React from 'react';
import { Button, PageHeader, Popconfirm, Space } from 'antd';
import styled from 'styled-components';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/TermForm';
import ListItem from '../components/ListItem';

import { termActions } from '../actions';
import { useStore } from '../store';

const Taxonomy = (props) => {
  const { taxonomyID } = props;

  const [
    {
      config,
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const taxonomy = sites[siteID]?.taxonomies?.[taxonomyID];

  console.log(taxonomy);

  const handleUpsert = async ({ id, title, slug, parentID, description }) => {
    if (id) {
      await termActions.updateTerm(
        { siteID, taxonomyID, id, title, slug, parentID, description },
        dispatch,
        config
      );
    } else {
      await termActions.addTerm(
        { siteID, taxonomyID, id, title, slug, parentID, description },
        dispatch,
        config
      );
    }
  };

  const handleDelete = async ({ termID }) => {
    await termActions.deleteTerm({ siteID, taxonomyID, id: termID }, dispatch, config);
  };

  const handleOpenDialog = (id = null, title = '', slug = '', parentID = 0, description = '') => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Taxonomy`,
        component: (
          <TermForm
            site={sites[siteID]}
            id={id}
            title={title}
            slug={slug}
            description={description}
            parentID={parentID}
            onSubmit={handleUpsert}
          />
        ),
      },
    });
  };

  return (
    <CmsLayout pageTitle={taxonomy?.title}>
      <PageHeader>
        <Button children={`Add`} onClick={() => handleOpenDialog()} type="primary" />
      </PageHeader>

      {taxonomy &&
        taxonomy.terms.map((o) => {
          const actions = [];

          actions.push(
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDelete({ termID: o.id })}
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
              onClick={() => handleOpenDialog(o.id, o.title, o.slug, o.parentID, o.description)}
            />
          );

          return (
            <StyledListItem
              key={o.id}
              actions={actions}
              title={`${o.title} (${o.count})`}
              subtitle={o.slug || '/'}
            />
          );
        })}
    </CmsLayout>
  );
};

const StyledListItem = styled(ListItem)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Taxonomy;
