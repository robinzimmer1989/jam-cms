import React from 'react';
import { Button, Card, Space } from 'antd';

// import app components
import Input from '../../components/Input';
import { RootState, useAppSelector } from '../../redux';

const SyncSettings = (props: any) => {
  const { onUpdate, loading } = props;

  const {
    cms: {
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const handleUpdate = () => onUpdate({ apiKey: true }, 'syncing');

  return (
    <Card title={'Syncing'}>
      <Space direction="vertical" size={20}>
        <Input label="Api Key" value={editorSite?.apiKey} name="apiKey" disabled />

        <Button
          loading={loading === 'syncing'}
          onClick={handleUpdate}
          children={`Regenerate`}
          type="primary"
        />
      </Space>
    </Card>
  );
};

export default SyncSettings;
