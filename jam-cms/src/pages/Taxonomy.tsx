import React, { useState } from 'react';
import { Button, PageHeader, Popconfirm, Space, Alert } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/CmsLayout' was resolved to '... Remove this comment to see the full error message
import CmsLayout from '../components/CmsLayout';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/TermForm' was resolved to '/... Remove this comment to see the full error message
import TermForm from '../components/TermForm';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/ListItem' was resolved to '/... Remove this comment to see the full error message
import ListItem from '../components/ListItem';

import { createDataTree } from '../utils';
import { termActions, siteActions } from '../actions';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

const Taxonomy = (props: any) => {
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

  const handleUpsert = async ({
    id,
    title,
    slug,
    parentID,
    description
  }: any) => {
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

  const handleDelete = async ({
    termID
  }: any) => {
    await termActions.deleteTerm({ siteID, taxonomyID, id: termID }, dispatch, config);
  };

  const handleOpenDialog = (term: any) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Term`,
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        component: <TermForm {...term} terms={taxonomy?.terms} onSubmit={handleUpsert} />,
      },
    });
  };

  const renderTerm = (o: any, level: any) => {
    const actions = [];

    actions.push(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => handleDelete({ termID: o.id })}
        okText="Yes"
        cancelText="No"
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button size="small" children={`Delete`} danger />
      </Popconfirm>
    );

    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    actions.push(<Button size="small" children={`Edit`} onClick={() => handleOpenDialog(o)} />);

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <React.Fragment key={o.id}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ListItem level={level} actions={actions} title={o.title} subtitle={o.slug} />

        {o.childNodes.map((p: any) => renderTerm(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CmsLayout
      pageTitle={
        config?.fields?.taxonomies?.find((o: any) => o.id === taxonomyID)?.title || taxonomy?.title
      }
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <PageHeader>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button
          children={`Add`}
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
          onClick={() => handleOpenDialog()}
          type="primary"
          disabled={!taxonomy}
        />
      </PageHeader>

      {!taxonomy && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Alert
          message="Unknown taxonomy"
          description="Restart the development process or sync new data now"
          type="info"
          showIcon
          action={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button size="small" type="ghost" onClick={handleSync} loading={isSyncing}>
              Sync to WordPress
            </Button>
          }
        />
      )}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical" size={8}>
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
        {terms && terms.map((item) => renderTerm(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default Taxonomy;
