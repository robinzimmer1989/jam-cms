import React from 'react';
import { Button, PageHeader, Popconfirm, Space } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/TermForm';
import ListItem from '../components/ListItem';

import { createDataTree } from '../utils';
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

  const terms = taxonomy?.terms ? createDataTree(taxonomy.terms) : [];

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
    <CmsLayout pageTitle={taxonomy?.title}>
      <PageHeader>
        <Button children={`Add`} onClick={() => handleOpenDialog()} type="primary" />
      </PageHeader>

      <Space direction="vertical" size={8}>
        {terms && terms.map((item) => renderTerm(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default Taxonomy;
