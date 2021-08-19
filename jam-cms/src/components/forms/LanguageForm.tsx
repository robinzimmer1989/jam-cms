import React, { useEffect, useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';
import Parser from 'html-react-parser';

// import app components
import Select from '../Select';
import Input from '../Input';
import { RootState, useAppDispatch, useAppSelector, languageActions, uiActions } from '../../redux';

const LanguageForm = (props: any) => {
  const { language: defaultLanguage = { id: null, name: '', slug: '', locale: '' } } = props;

  const {
    cms: { languages },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    dispatch(languageActions.getLanguages());
  }, []);

  const handleChange = (e: any) => setLanguage({ ...language, [e.target.name]: e.target.value });

  const handleUpsert = async () => {
    const { id, name, slug, locale } = language;

    if (!name || !slug || !locale) {
      return;
    }

    setLoading(true);

    if (id) {
      dispatch(languageActions.updateLanguage({ id, name, slug, locale }));
    } else {
      dispatch(languageActions.addLanguage({ name, slug, locale }));
    }

    // Reset to default and close modal
    setLanguage({ id: null, name: '', slug: '', locale: '' });
    setLoading(false);

    dispatch(uiActions.hideDialog());
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
          const selectedLanguage: any = languages.find((o: any) => o.locale === value) || {};
          setLanguage({ ...language, ...selectedLanguage });
        }}
        label={'Select a language'}
        loading={languages.length === 0}
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

      <Input label="Language Code" name="slug" value={language.slug} onChange={handleChange} />

      <Input label="Locale" name="locale" value={language.locale} disabled />

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
