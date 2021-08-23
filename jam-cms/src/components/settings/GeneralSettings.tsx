import React from 'react';
import { Button, Card, Space } from 'antd';

// import app components
import Input from '../../components/Input';
import { RootState, useAppSelector } from '../../redux';

const GeneralSettings = (props: any) => {
  const { onChange, onUpdate, loading } = props;

  const {
    cms: {
      site,
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const handleChange = (e: any) => onChange(e.target.name, e.target.value);

  const handleUpdate = () =>
    onUpdate({ title: editorSite?.title, siteUrl: editorSite?.siteUrl }, 'general');

  return (
    <Card title={`General`}>
      <Space direction="vertical" size={20}>
        <Input
          label="Title"
          value={editorSite?.title}
          name="title"
          onChange={handleChange}
          disabled={!site}
        />

        <Input
          label="Frontend URL"
          value={editorSite?.siteUrl}
          name="siteUrl"
          onChange={handleChange}
          disabled={!site}
        />

        <Button
          loading={loading === 'general'}
          onClick={handleUpdate}
          children={`Update`}
          type="primary"
          disabled={!site}
        />
      </Space>
    </Card>
  );
};

export default GeneralSettings;
