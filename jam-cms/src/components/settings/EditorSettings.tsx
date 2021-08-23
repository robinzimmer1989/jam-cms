import React from 'react';
import { Button, Card, Space, Select as AntSelect } from 'antd';

// import app components
import Select from '../../components/Select';
import { RootState, useAppSelector } from '../../redux';

const EditorSettings = (props: any) => {
  const { onChange, onUpdate, loading } = props;

  const {
    cms: {
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const handleChange = (name: string, value: string) => onChange(name, value);

  const handleUpdate = () =>
    onUpdate(
      {
        editorOptions: editorSite?.editorOptions,
      },
      'editor'
    );

  return (
    <Card title={'Sidebar'}>
      <Space direction="vertical" size={20}>
        <Select
          label="Position"
          value={editorSite?.editorOptions?.sidebar?.position}
          onChange={(v: any) => handleChange('editorOptions.sidebar.position', v)}
        >
          <AntSelect.Option value="left" children="Left" />
          <AntSelect.Option value="right" children="Right" />
        </Select>

        <Select
          label="Style"
          value={editorSite?.editorOptions?.sidebar?.style}
          onChange={(v: any) => handleChange('editorOptions.sidebar.style', v)}
        >
          <AntSelect.Option value="inline" children="Inline" />
          <AntSelect.Option value="overflow" children="Overflow" />
          <AntSelect.Option value="scale" children="Scale" />
        </Select>

        <Select
          label="Default Status"
          value={editorSite?.editorOptions?.sidebar?.defaultOpen}
          onChange={(v: any) => handleChange('editorOptions.sidebar.defaultOpen', v)}
        >
          <AntSelect.Option value={'true'} children="Open" />
          <AntSelect.Option value={'false'} children="Closed" />
        </Select>

        <Button
          loading={loading === 'editor'}
          onClick={handleUpdate}
          children={`Update`}
          type="primary"
        />
      </Space>
    </Card>
  );
};

export default EditorSettings;
