import React from 'react';
import { Button, Card, Space } from 'antd';

// import app components
import Input from '../../components/Input';
import { RootState, useAppSelector } from '../../redux';

const DeploymentSettings = (props: any) => {
  const { onChange, onUpdate, loading } = props;

  const {
    cms: {
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const handleChange = (e: any) => onChange(e.target.name, e.target.value);

  const handleUpdate = () => onUpdate({ deployment: editorSite?.deployment }, 'deployment');

  return (
    <Card title={`Deployment`}>
      <Space direction="vertical" size={20}>
        <Input
          label="Build Hook"
          value={editorSite?.deployment?.buildHook}
          name="deployment.buildHook"
          onChange={handleChange}
        />

        <Input
          label="Badge Image"
          value={editorSite?.deployment?.badgeImage}
          name="deployment.badgeImage"
          onChange={handleChange}
        />

        <Input
          label="Badge Link"
          value={editorSite?.deployment?.badgeLink}
          name="deployment.badgeLink"
          onChange={handleChange}
        />

        <Button
          loading={loading === 'deployment'}
          onClick={handleUpdate}
          children={`Update`}
          type="primary"
        />
      </Space>
    </Card>
  );
};

export default DeploymentSettings;
