import React, { useState } from 'react';
import { Space, Button, Select as AntSelect } from 'antd';

// import app components
import Select from '../Select';
import { useStore } from '../../store';

const LanguageForm = (props: any) => {
  const { language: defaultLanguage = '' } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [language, setLanguage] = useState(defaultLanguage);
  const [loading, setLoading] = useState(false);

  const handleUpsert = async () => {
    if (!language) {
      return;
    }

    setLoading(true);

    setLanguage('');

    setLoading(false);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  const languages = [{ name: 'English', locale: 'en_CA', code: 'en' }];

  return (
    <Space direction="vertical" size={20}>
      <Select
        value={language}
        onChange={(value: string) => setLanguage(value)}
        label={'Select a language'}
      >
        {languages.map((o: any) => (
          <AntSelect.Option key={o.code} value={o.code} children={`${o.name} - ${o.locale}`} />
        ))}
      </Select>
      <Button
        id="add-language"
        children="Add"
        onClick={handleUpsert}
        type="primary"
        disabled={!language}
        loading={loading}
      />
    </Space>
  );
};

export default LanguageForm;
