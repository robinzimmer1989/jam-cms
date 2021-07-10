import React, { useEffect, useState } from 'react';
import { Button, Card, Space, message, Select as AntSelect } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/Input' was resolved to '/Use... Remove this comment to see the full error message
import Input from '../components/Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/Select' was resolved to '/Us... Remove this comment to see the full error message
import Select from '../components/Select';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/CmsLayout' was resolved to '... Remove this comment to see the full error message
import CmsLayout from '../components/CmsLayout';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
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

  const handleChange = (e: any) => {
    const nextSite = produce(site, (draft: any) => {
      return set(draft, `${e.target.name}`, e.target.value);
    });

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleChangeSelect = (value: any, name: any) => {
    const nextSite = produce(site, (draft: any) => {
      return set(draft, `${name}`, value);
    });

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleUpdate = async (args: any, loader: any) => {
    const { id } = site;

    setLoading(loader);
    await siteActions.updateSite({ id, ...args }, dispatch, config);
    setLoading(null);

    message.success('Updated successfully');
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CmsLayout pageTitle={`Settings`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical" size={40}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title={`General`}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={20}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input label="Title" value={site?.title} name="title" onChange={handleChange} />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
              label="Frontend URL"
              value={site?.siteUrl}
              name="siteUrl"
              onChange={handleChange}
            />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              loading={loading === 'general'}
              onClick={() => handleUpdate({ title: site.title, siteUrl: site.siteUrl }, 'general')}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title={`Deployment`}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={20}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
              label="Build Hook"
              value={site?.deployment?.buildHook}
              name="deployment.buildHook"
              onChange={handleChange}
            />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
              label="Badge Image"
              value={site?.deployment?.badgeImage}
              name="deployment.badgeImage"
              onChange={handleChange}
            />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
              label="Badge Link"
              value={site?.deployment?.badgeLink}
              name="deployment.badgeLink"
              onChange={handleChange}
            />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title={'Sync'}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={20}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input label="Api Key" value={site?.apiKey} name="apiKey" disabled />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              loading={loading === 'apikey'}
              onClick={() => handleUpdate({ apiKey: true }, 'apikey')}
              children={`Regenerate`}
              type="primary"
            />
          </Space>
        </Card>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title={`API keys`}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={20}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
              label="Google Maps API Key"
              value={site?.googleMapsApi}
              name="googleMapsApi"
              onChange={handleChange}
            />

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button
              loading={loading === 'general'}
              onClick={() => handleUpdate({ googleMapsApi: site.googleMapsApi }, 'general')}
              children={`Update`}
              type="primary"
            />
          </Space>
        </Card>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card title={'Editor Sidebar'}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={20}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Select
              label="Position"
              value={site?.editorOptions?.sidebar?.position}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.position')}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value="left" children="Left" />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value="right" children="Right" />
            </Select>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Select
              label="Style"
              value={site?.editorOptions?.sidebar?.style}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.style')}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value="inline" children="Inline" />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value="overflow" children="Overflow" />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value="scale" children="Scale" />
            </Select>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Select
              label="Default Status"
              value={site?.editorOptions?.sidebar?.defaultOpen}
              onChange={(v: any) => handleChangeSelect(v, 'editorOptions.sidebar.defaultOpen')}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value={true} children="Open" />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <AntSelect.Option value={false} children="Closed" />
            </Select>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
