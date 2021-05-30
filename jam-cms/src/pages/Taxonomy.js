import React, { useState } from 'react';
import { Button, PageHeader, Popconfirm, Space, Alert } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/TermForm';
import ListItem from '../components/ListItem';

import { createDataTree } from '../utils';
import { termActions, siteActions } from '../actions';
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

  const [isSyncing, setIsSyncing] = useState(false);

  const taxonomy = sites[siteID]?.taxonomies?.[taxonomyID];

  const terms = taxonomy?.terms ? createDataTree(taxonomy.terms) : [];

  const handleSync = async () => {
    setIsSyncing(true);
    await siteActions.syncFields(
      { fields: config.fields, apiKey: sites[siteID]?.apiKey },
      dispatch,
      config
    );
    setIsSyncing(false);
  };

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

  const handleOpenDialog = (term) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Term`,
        component: <TermForm {...term} terms={taxonomy?.terms} onSubmit={handleUpsert} />,
      },
    });
  };

  const renderTerm = (o, level) => {
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

    actions.push(<Button size="small" children={`Edit`} onClick={() => handleOpenDialog(o)} />);

    return (
      <React.Fragment key={o.id}>
        <ListItem level={level} actions={actions} title={o.title} subtitle={o.slug} />

        {o.childNodes.map((p) => renderTerm(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <CmsLayout
      pageTitle={
        config?.fields?.taxonomies?.find((o) => o.id === taxonomyID)?.title || taxonomy?.title
      }
    >
      <PageHeader>
        <Button
          children={`Add`}
          onClick={() => handleOpenDialog()}
          type="primary"
          disabled={!taxonomy}
        />
      </PageHeader>

      {!taxonomy && (
        <Alert
          message="Unknown taxonomy"
          description="Restart the development process or sync new data now"
          type="info"
          showIcon
          action={
            <Button size="small" type="ghost" onClick={handleSync} loading={isSyncing}>
              Sync to WordPress
            </Button>
          }
        />
      )}

      <Space direction="vertical" size={8}>
        {terms && terms.map((item) => renderTerm(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default Taxonomy;
