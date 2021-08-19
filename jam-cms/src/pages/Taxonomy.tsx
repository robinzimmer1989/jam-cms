import React, { useState } from 'react';
import { Button, PageHeader, Popconfirm, Space, Alert } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import TermForm from '../components/forms/TermForm';
import ListItem from '../components/ListItem';
import LanguageSelector from '../components/LanguageSelector';

import { createDataTree, generateSlug } from '../utils';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  termActions,
  siteActions,
  languageActions,
  uiActions,
} from '../redux';

const Taxonomy = (props: any) => {
  const { taxonomyID, fields } = props;

  const {
    cms: { site, activeLanguage },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState(null as any);

  const taxonomy = site?.taxonomies?.[taxonomyID];

  const terms = Object.values(taxonomy.terms);

  const hasTemplate = !!fields?.taxonomies.find((o: any) => o.id === taxonomyID).component;

  // Check if taxonomy supports languages
  const taxonomySupportsLanguages = !!site?.languages?.taxonomies?.find(
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
    await dispatch(siteActions.syncFields({ fields, apiKey: site?.apiKey || '' }));
    setLoading(null);
  };

  const handleTranslateMass = async () => {
    setLoading({ action: 'translate' });

    const language =
      activeLanguage !== 'all' ? activeLanguage : site?.languages?.defaultLanguage || '';

    await dispatch(
      languageActions.translateMass({
        type: 'term',
        ids: terms.filter((o: any) => !o.language).map((o: any) => o.id),
        language,
      })
    );
    setLoading(null);
  };

  const handleUpsert = async ({ id, title, slug, parentID, description, language }: any) => {
    if (id) {
      await dispatch(
        termActions.updateTerm({ taxonomyID, id, title, slug, parentID, description, language })
      );
    } else {
      await dispatch(
        termActions.addTerm({ taxonomyID, title, slug, parentID, description, language })
      );
    }
  };

  const handleDelete = async ({ termID }: any) => {
    setLoading({ action: 'delete', id: termID });
    await dispatch(termActions.deleteTerm({ taxonomyID, id: termID }));
    setLoading(null);
  };

  const handleOpenDialog = (term: any = {}) => {
    dispatch(
      uiActions.showDialog({
        open: true,
        title: `Term`,
        component: (
          <TermForm {...term} taxonomyID={taxonomyID} terms={terms} onSubmit={handleUpsert} />
        ),
      })
    );
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
    const result: any = await dispatch(termActions.translateTerm({ id, language }));
    handleOpenDialog(result);
  };

  const renderUntranslatedTermsWarning = () => {
    const languageSlug =
      activeLanguage !== 'all' ? activeLanguage : site?.languages?.defaultLanguage;

    if (!languageSlug) {
      return null;
    }

    const languageName = site?.languages?.languages.find((o: any) => o.slug === languageSlug)?.name;

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
      site: site,
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

    // if (hasTemplate) {
    //   actions.push(
    //     <Link to={slug}>
    //       <Button size="small" children="View" />
    //     </Link>
    //   );
    // }

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
      fields={fields}
      pageTitle={
        fields?.taxonomies?.find((o: any) => o.id === taxonomyID)?.title || taxonomy?.title
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
