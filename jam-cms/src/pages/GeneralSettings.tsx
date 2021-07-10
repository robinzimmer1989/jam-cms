import React, { useEffect, useState } from 'react';
import { Button, Card, Space, message, Select as AntSelect } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import Input from '../components/Input';
import Select from '../components/Select';
import CmsLayout from '../components/CmsLayout';

import { useStore } from '../store';
import { siteActions } from '../actions';

const GeneralSettings = () => {
  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    });
  }, []);

  const handleChange = (e) => {
    const nextSite = produce(site, (draft) => {
      return set(draft, `${e.target.name}`, e.target.value);
    });

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleChangeSelect = (value, name) => {
    const nextSite = produce(site, (draft) => {
      return set(draft, `${name}`, value);
    });

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleUpdate = async (args, loader) => {
    const { id } = site;

    setLoading(loader);
    await siteActions.updateSite({ id, ...args }, dispatch, config);
    setLoading(null);

    message.success('Updated successfully');
  };

  return (
    <CmsLayout pageTitle={`Settings`}>
      <Space direction="vertical" size={40}>
        <Card title={`General`}>
          <Space direction="vertical" size={20}>
            <Input label="Title" value={site?.title} name="title" onChange={handleChange} />

            <Input
              label="Frontend URL"
              value={site?.siteUrl}
              name="siteUrl"
              onChange={handleChange}
            />

            <Button
              loading={loading === 'general'}
              onClick={() => handleUpdate({ title: site.title, siteUrl: site.siteUrl }, 'general')}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={`Deployment`}>
          <Space direction="vertical" size={20}>
            <Input
              label="Build Hook"
              value={site?.deployment?.buildHook}
              name="deployment.buildHook"
              onChange={handleChange}
            />

            <Input
              label="Badge Image"
              value={site?.deployment?.badgeImage}
              name="deployment.badgeImage"
              onChange={handleChange}
            />

            <Input
              label="Badge Link"
              value={site?.deployment?.badgeLink}
              name="deployment.badgeLink"
              onChange={handleChange}
            />

            <Button
              loading={loading === 'deployment'}
              onClick={() =>
                handleUpdate(
                  {
                    deployment: site?.deployment,
                  },
                  'deployment'
                )
              }
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={'Sync'}>
          <Space direction="vertical" size={20}>
            <Input label="Api Key" value={site?.apiKey} name="apiKey" disabled />

            <Button
              loading={loading === 'apikey'}
              onClick={() => handleUpdate({ apiKey: true }, 'apikey')}
              children={`Regenerate`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={`API keys`}>
          <Space direction="vertical" size={20}>
            <Input
              label="Google Maps API Key"
              value={site?.googleMapsApi}
              name="googleMapsApi"
              onChange={handleChange}
            />

            <Button
              loading={loading === 'general'}
              onClick={() => handleUpdate({ googleMapsApi: site.googleMapsApi }, 'general')}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        <Card title={'Editor Sidebar'}>
          <Space direction="vertical" size={20}>
            <Select
              label="Position"
              value={site?.editorOptions?.sidebar?.position}
              onChange={(v) => handleChangeSelect(v, 'editorOptions.sidebar.position')}
            >
              <AntSelect.Option value="left" children="Left" />
              <AntSelect.Option value="right" children="Right" />
            </Select>

            <Select
              label="Style"
              value={site?.editorOptions?.sidebar?.style}
              onChange={(v) => handleChangeSelect(v, 'editorOptions.sidebar.style')}
            >
              <AntSelect.Option value="inline" children="Inline" />
              <AntSelect.Option value="overflow" children="Overflow" />
              <AntSelect.Option value="scale" children="Scale" />
            </Select>

            <Select
              label="Default Status"
              value={site?.editorOptions?.sidebar?.defaultOpen}
              onChange={(v) => handleChangeSelect(v, 'editorOptions.sidebar.defaultOpen')}
            >
              <AntSelect.Option value={true} children="Open" />
              <AntSelect.Option value={false} children="Closed" />
            </Select>

            <Button
              loading={loading === 'editorOptions'}
              onClick={() =>
                handleUpdate(
                  {
                    editorOptions: site?.editorOptions,
                  },
                  'editorOptions'
                )
              }
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>
      </Space>
    </CmsLayout>
  );
};

export default GeneralSettings;
