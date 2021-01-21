import React, { useEffect, useState } from 'react';
import { Button, Card, Space, message } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import Input from '../components/Input';
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

  const handleUpdate = async (args, loader) => {
    const { id } = site;

    setLoading(loader);
    await siteActions.updateSite({ id, ...args }, dispatch, config);
    setLoading(null);

    message.success('Updated successfully');
  };

  return (
    <CmsLayout pageTitle={`General`}>
      <Space direction="vertical" size={40}>
        <Card title={`General`}>
          <Space direction="vertical" size={20}>
            <Input label="Title" value={site?.title} name="title" onChange={handleChange} />

            <Button
              loading={loading === 'general'}
              onClick={() => handleUpdate({ title: site.title }, 'general')}
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

        <Card title={`Build`}>
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
      </Space>
    </CmsLayout>
  );
};

export default GeneralSettings;
