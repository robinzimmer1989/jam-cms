import React, { useEffect, useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';
import Parser from 'html-react-parser';

// import app components
import Select from '../Select';
import Input from '../Input';
import { languageActions } from '../../actions';
import { useStore } from '../../store';

const LanguageForm = (props: any) => {
  const { language: defaultLanguage = { id: null, name: '', slug: '', locale: '' } } = props;

  const [
    {
      config,
      cmsState: { siteID },
    },
    dispatch,
  ] = useStore();

  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loading, setLoading] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    // Load language options for select field
    const loadLanguages = async () => {
      const result = await languageActions.getLanguages({}, dispatch, config);

      if (result) {
        setLanguages(result);
      }

      setLoadingLanguages(false);
    };

    loadLanguages();
  }, []);

  const handleChange = (e: any) => setLanguage({ ...language, [e.target.name]: e.target.value });

  const handleUpsert = async () => {
    const { id, name, slug, locale, flag } = language;

    if (!name || !slug || !locale) {
      return;
    }

    setLoading(true);

    if (id) {
      await languageActions.updateLanguage({ siteID, id, name, slug, locale }, dispatch, config);
    } else {
      await languageActions.addLanguage({ siteID, name, slug, locale }, dispatch, config);
    }

    // Reset to default and close modal
    setLanguage({ id: null, name: '', slug: '', locale: '' });
    setLoading(false);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical" size={20}>
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input: string, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA: any, optionB: any) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
        value={language.locale}
        onChange={(value: string) => {
          const selectedLanguage = languages.find((o: any) => o.locale === value);
          setLanguage(selectedLanguage);
        }}
        label={'Select a language'}
        loading={loadingLanguages}
      >
        {languages.map((o: any) => (
          <AntSelect.Option
            key={o.locale}
            value={o.locale}
            children={Parser(`${o.name} - ${o.locale}`)}
          />
        ))}
      </Select>

      <Input label="Name" name="name" value={language.name} onChange={handleChange} />

      <Input
        label="Locale"
        name="locale"
        value={language.locale}
        onChange={handleChange}
        disabled
      />

      <Input
        label="Language Code"
        name="slug"
        value={language.slug}
        onChange={handleChange}
        disabled
      />

      <Button
        id="add-language"
        children={language?.id ? 'Update' : 'Add'}
        onClick={handleUpsert}
        type="primary"
        disabled={!language.name || !language.slug || !language.locale}
        loading={loading}
      />
    </Space>
  );
};

export default LanguageForm;
