import React from 'react';
import { Button, Card, Space } from 'antd';

// import app components
import Input from '../../components/Input';
import { RootState, useAppSelector } from '../../redux';

const ApiSettings = (props: any) => {
  const { onChange, onUpdate, loading } = props;

  const {
    cms: {
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const handleChange = (e: any) => onChange(e.target.name, e.target.value);

  const handleUpdate = () => onUpdate({ googleMapsApi: editorSite?.googleMapsApi }, 'api');

  return (
    <Card title={`API keys`}>
      <Space direction="vertical" size={20}>
        <Input
          label="Google Maps API Key"
          value={editorSite?.googleMapsApi}
          name="googleMapsApi"
          onChange={handleChange}
        />

        <Button
          loading={loading === 'api'}
          onClick={handleUpdate}
          children={`Update`}
          type="primary"
        />
      </Space>
    </Card>
  );
};

export default ApiSettings;
