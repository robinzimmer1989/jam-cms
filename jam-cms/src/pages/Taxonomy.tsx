import React, { useState } from 'react';
import { Button, PageHeader, Popconfirm, Space, Alert } from 'antd';
import { Link } from '@reach/router';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/forms/TermForm';
import ListItem from '../components/ListItem';
import LanguageSelector from '../components/LanguageSelector';

import { createDataTree, generateSlug, translateTerm } from '../utils';
import { termActions, siteActions, languageActions } from '../actions';
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

  const [loading, setLoading] = useState(null as any);

  const taxonomy = sites[siteID]?.taxonomies?.[taxonomyID];

  const terms = Object.values(taxonomy.terms);

  const hasTemplate = !!config?.fields?.taxonomies.find((o: any) => o.id === taxonomyID).component;

  // Check if taxonomy supports languages
  const taxonomySupportsLanguages = !!sites[siteID]?.languages?.taxonomies?.find(
    (s: string) => s === taxonomyID
  );

  // Check if there are untranslated taxonomies
  const taxonomiesWithoutLanguage =
    taxonomySupportsLanguages && terms.find((o: any) => !o.language);

  // Filter by language
  const termsPerLanguage = taxonomySupportsLanguages
    ? terms.filter((o: any) => (activeLanguage === 'all' ? o : o.language === activeLanguage))
    : terms;

  const treeTerms = termsPerLanguage ? createDataTree(termsPerLanguage) : [];

  const handleSync = async () => {
    setLoading({ action: 'syncing' });
    await siteActions.syncFields(
      { fields: config.fields, apiKey: sites[siteID]?.apiKey },
      dispatch,
      config
    );
    setLoading(null);
  };

  const handleTranslateMass = async () => {
    setLoading({ action: 'translate' });

    const language =
      activeLanguage !== 'all' ? activeLanguage : sites[siteID]?.languages?.defaultLanguage;

    await languageActions.translateMass(
      {
        siteID,
        taxonomyID,
        type: 'term',
        ids: terms.filter((o: any) => !o.language).map((o: any) => o.id),
        language,
      },
      dispatch,
      config
    );
    setLoading(null);
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
    setLoading({ action: 'delete', id: termID });
    await termActions.deleteTerm({ siteID, taxonomyID, id: termID }, dispatch, config);
    setLoading(null);
  };

  const handleOpenDialog = (term: any = {}) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Term`,
        component: (
          <TermForm {...term} taxonomyID={taxonomyID} terms={terms} onSubmit={handleUpsert} />
        ),
      },
    });
  };

  const handleEditTranslation = (term: any, language: string) => {
    if (term.language === language) {
      handleOpenDialog(term);
    } else if (term.translations[language]) {
      const translatedTerm = terms.find((o: any) => o.id === term.translations[language]);
      handleOpenDialog(translatedTerm);
    }
  };

  const handleTranslateTerm = async ({ id, language }: any) => {
    const result = await translateTerm({ sites, siteID, id, language }, dispatch, config);

    if (result) {
      handleOpenDialog(result);
    }
  };

  const renderUntranslatedTermsWarning = () => {
    const languageSlug =
      activeLanguage !== 'all' ? activeLanguage : sites[siteID]?.languages?.defaultLanguage;

    if (!languageSlug) {
      return null;
    }

    const languageName = sites[siteID]?.languages?.languages.find(
      (o: any) => o.slug === languageSlug
    )?.name;

    return (
      <Alert
        message="There are terms without a language"
        type="info"
        showIcon
        action={
          <Button
            size="small"
            type="ghost"
            onClick={handleTranslateMass}
            loading={loading?.action === 'translate'}
          >
            Translate to {languageName}
          </Button>
        }
      />
    );
  };

  const renderTerm = (o: any, level: any) => {
    const actions = [];

    const slug = generateSlug({
      site: sites[siteID],
      taxonomyID: o.taxonomyID,
      termID: o.id,
      leadingSlash: true,
    });

    actions.push(
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => handleDelete({ termID: o.id })}
        okText="Yes"
        cancelText="No"
      >
        <Button
          size="small"
          children="Delete"
          loading={loading?.id === o.id && loading?.action === 'delete'}
          danger
        />
      </Popconfirm>
    );

    actions.push(<Button size="small" children="Edit" onClick={() => handleOpenDialog(o)} />);

    if (hasTemplate) {
      actions.push(
        <Link to={slug}>
          <Button size="small" children="View" />
        </Link>
      );
    }

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
        <ListItem level={level} actions={actions} title={o.title} subtitle={slug} />

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
      {taxonomiesWithoutLanguage && renderUntranslatedTermsWarning()}

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
            <Button
              size="small"
              type="ghost"
              onClick={handleSync}
              loading={loading?.action === 'syncing'}
            >
              Sync to WordPress
            </Button>
          }
        />
      )}

      <Space direction="vertical" size={8}>
        {treeTerms && treeTerms.map((item: any) => renderTerm(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default Taxonomy;
