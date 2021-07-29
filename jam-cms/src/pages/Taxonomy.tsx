import React, { useState } from 'react';
import { Button, PageHeader, Popconfirm, Space, Alert } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/forms/TermForm';
import ListItem from '../components/ListItem';
import LanguageSelector from '../components/LanguageSelector';

import { createDataTree, translateTerm } from '../utils';
import { termActions, siteActions } from '../actions';
import { useStore } from '../store';

const Taxonomy = (props: any) => {
  const { taxonomyID } = props;

  const [
    {
      config,
      cmsState: { siteID, sites, activeLanguage },
    },
    dispatch,
  ] = useStore();
  console.log(sites[siteID]);
  const [isSyncing, setIsSyncing] = useState(false);

  const taxonomy = sites[siteID]?.taxonomies?.[taxonomyID];

  // Check if taxonomy supports languages
  const taxonomySupportsLanguages = !!sites[siteID]?.languages?.taxonomies?.find(
    (s: string) => s === taxonomyID
  );

  // Check if there are untranslated taxonomies
  const taxonomiesWithoutLanguage =
    taxonomySupportsLanguages && taxonomy?.terms.find((o: any) => !o.language);

  // Filter by language
  const termsPerLanguage = taxonomySupportsLanguages
    ? taxonomy?.terms.filter((o: any) =>
        activeLanguage === 'all' ? o : o.language === activeLanguage
      )
    : taxonomy?.terms;

  const terms = termsPerLanguage ? createDataTree(termsPerLanguage) : [];

  const handleSync = async () => {
    setIsSyncing(true);
    await siteActions.syncFields(
      { fields: config.fields, apiKey: sites[siteID]?.apiKey },
      dispatch,
      config
    );
    setIsSyncing(false);
  };

  const handleUpsert = async ({ id, title, slug, parentID, description, language }: any) => {
    if (id) {
      await termActions.updateTerm(
        { siteID, taxonomyID, id, title, slug, parentID, description, language },
        dispatch,
        config
      );
    } else {
      await termActions.addTerm(
        { siteID, taxonomyID, id, title, slug, parentID, description, language },
        dispatch,
        config
      );
    }
  };

  const handleDelete = async ({ termID }: any) => {
    await termActions.deleteTerm({ siteID, taxonomyID, id: termID }, dispatch, config);
  };

  const handleOpenDialog = (term: any = {}) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Term`,
        component: (
          <TermForm
            {...term}
            taxonomyID={taxonomyID}
            terms={taxonomy?.terms}
            onSubmit={handleUpsert}
          />
        ),
      },
    });
  };

  const handleEditTranslation = (term: any, language: string) => {
    if (term.language === language) {
      handleOpenDialog(term);
    } else if (term.translations[language]) {
      const translatedTerm = taxonomy?.terms.find((o: any) => o.id === term.translations[language]);
      handleOpenDialog(translatedTerm);
    }
  };

  const handleTranslateTerm = async ({ id, language }: any) => {
    const result = await translateTerm({ sites, siteID, id, language }, dispatch, config);

    if (result) {
      handleOpenDialog(result);
    }
  };

  const renderTerm = (o: any, level: any) => {
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

    if (taxonomySupportsLanguages && o.language) {
      actions.unshift(
        <LanguageSelector
          post={o}
          onTranslate={handleTranslateTerm}
          onEdit={(language: string) => handleEditTranslation(o, language)}
        />
      );
    }

    return (
      <React.Fragment key={o.id}>
        <ListItem level={level} actions={actions} title={o.title} subtitle={o.slug} />

        {o.childNodes.map((p: any) => renderTerm(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <CmsLayout
      pageTitle={
        config?.fields?.taxonomies?.find((o: any) => o.id === taxonomyID)?.title || taxonomy?.title
      }
    >
      {taxonomiesWithoutLanguage && (
        <Alert
          message="There are terms without a language"
          type="info"
          showIcon
          // action={
          //   <Button size="small" type="ghost" onClick={handleSync} loading={isSyncing}>
          //     Sync to WordPress
          //   </Button>
          // }
        />
      )}

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
        {terms && terms.map((item: any) => renderTerm(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default Taxonomy;
