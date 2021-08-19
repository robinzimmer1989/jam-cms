import React, { useEffect, useState } from 'react';
import { Button, Card, Space, message, Select as AntSelect, Tabs } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import Input from '../components/Input';
import Select from '../components/Select';
import LanguageSettings from '../components/settings/LanguageSettings';
import CmsLayout from '../components/CmsLayout';
import { RootState, useAppDispatch, useAppSelector, siteActions, cmsActions } from '../redux';

const GeneralSettings = (props: any) => {
  const { fields } = props;

  const {
    cms: {
      site,
      siteLoaded,
      editor: { site: editorSite },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [tab, setTab] = useState('general');
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    siteLoaded && dispatch(cmsActions.addEditorSite(site));
  }, [siteLoaded]);

  const handleChange = (e: any) => {
    const nextSite = produce(editorSite, (draft: any) =>
      set(draft, `${e.target.name}`, e.target.value)
    );
    dispatch(cmsActions.updateEditorSite(nextSite));
  };

  const handleChangeSelect = (value: any, name: any) => {
    const nextSite = produce(editorSite, (draft: any) => set(draft, `${name}`, value));
    dispatch(cmsActions.updateEditorSite(nextSite));
  };

  const handleUpdate = async (args: any, loader: any) => {
    setLoading(loader);
    await dispatch(siteActions.updateSite(args));
    setLoading(null);

    message.success('Updated successfully');
  };

  const tabs: any = ['general', 'deployment', 'syncing', 'api', 'editor'];

  if (!!editorSite?.languages) {
    tabs.push('languages');
  }

  return (
    <CmsLayout fields={fields} pageTitle={`Settings`}>
      <Tabs defaultActiveKey="all" onChange={(v) => setTab(v)}>
        {tabs.map((name: string) => (
          <Tabs.TabPane key={name} tab={name.toUpperCase()} disabled={!site} />
        ))}
      </Tabs>

      {tab === 'general' && (
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
              onClick={() =>
                handleUpdate({ title: editorSite?.title, siteUrl: editorSite?.siteUrl }, 'general')
              }
              children={`Update`}
              type="primary"
              disabled={!site}
            />
          </Space>
        </Card>
      )}

      {tab === 'deployment' && (
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
              onClick={() =>
                handleUpdate(
                  {
                    deployment: editorSite?.deployment,
                  },
                  'deployment'
                )
              }
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>
      )}

      {tab === 'syncing' && (
        <Card title={'Syncing'}>
          <Space direction="vertical" size={20}>
            <Input label="Api Key" value={editorSite?.apiKey} name="apiKey" disabled />

            <Button
              loading={loading === 'syncing'}
              onClick={() => handleUpdate({ apiKey: true }, 'syncing')}
              children={`Regenerate`}
              type="primary"
            />
          </Space>
        </Card>
      )}

      {tab === 'api' && (
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
              onClick={() => handleUpdate({ googleMapsApi: editorSite?.googleMapsApi }, 'api')}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>
      )}

      {tab === 'editor' && (
        <Card title={'Sidebar'}>
          <Space direction="vertical" size={20}>
            <Select
              label="Position"
              value={editorSite?.editorOptions?.sidebar?.position}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.position')}
            >
              <AntSelect.Option value="left" children="Left" />
              <AntSelect.Option value="right" children="Right" />
            </Select>

            <Select
              label="Style"
              value={editorSite?.editorOptions?.sidebar?.style}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.style')}
            >
              <AntSelect.Option value="inline" children="Inline" />
              <AntSelect.Option value="overflow" children="Overflow" />
              <AntSelect.Option value="scale" children="Scale" />
            </Select>

            <Select
              label="Default Status"
              value={editorSite?.editorOptions?.sidebar?.defaultOpen}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.defaultOpen')}
            >
              <AntSelect.Option value={'true'} children="Open" />
              <AntSelect.Option value={'false'} children="Closed" />
            </Select>

            <Button
              loading={loading === 'editor'}
              onClick={() =>
                handleUpdate(
                  {
                    editorOptions: editorSite?.editorOptions,
                  },
                  'editor'
                )
              }
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>
      )}

      {tab === 'languages' && <LanguageSettings />}
    </CmsLayout>
  );
};

export default GeneralSettings;
