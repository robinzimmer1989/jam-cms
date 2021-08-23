import React, { useEffect, useState } from 'react';
import { message, Tabs } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import GeneralSettings from '../components/settings/GeneralSettings';
import DeploymentSettings from '../components/settings/DeploymentSettings';
import SyncSettings from '../components/settings/SyncSettings';
import ApiSettings from '../components/settings/ApiSettings';
import EditorSettings from '../components/settings/EditorSettings';
import LanguageSettings from '../components/settings/LanguageSettings';
import CmsLayout from '../components/CmsLayout';
import { RootState, useAppDispatch, useAppSelector, siteActions, cmsActions } from '../redux';

const Settings = (props: any) => {
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
  }, [siteLoaded, tab]);

  const handleChange = (name: string, value: string | number | boolean) => {
    const nextSite = produce(editorSite, (draft: any) => set(draft, name, value));
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
        <GeneralSettings onChange={handleChange} onUpdate={handleUpdate} loading={loading} />
      )}

      {tab === 'deployment' && (
        <DeploymentSettings onChange={handleChange} onUpdate={handleUpdate} loading={loading} />
      )}

      {tab === 'syncing' && <SyncSettings onUpdate={handleUpdate} loading={loading} />}

      {tab === 'api' && (
        <ApiSettings onChange={handleChange} onUpdate={handleUpdate} loading={loading} />
      )}

      {tab === 'editor' && (
        <EditorSettings onChange={handleChange} onUpdate={handleUpdate} loading={loading} />
      )}

      {tab === 'languages' && <LanguageSettings fields={fields} />}
    </CmsLayout>
  );
};

export default Settings;
