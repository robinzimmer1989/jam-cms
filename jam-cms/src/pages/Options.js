import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { set } from 'lodash';
import { Button, Card, Space, message } from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import EditorFields from '../components/EditorFields';

import { siteActions } from '../actions';
import { useStore } from '../store';

const Options = () => {
  const [
    {
      config,
      globalOptions,
      cmsState: { siteID, sites },
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    });

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, []);

  const prepareContentFields = () => {
    return globalOptions
      .filter((o) => !o.hide)
      .map((o) => {
        return { ...o, value: site?.globalOptions?.[o.id]?.value || null };
      });
  };

  const handleChange = (field) => {
    const nextSite = produce(site, (draft) => {
      return set(draft, `globalOptions.${field.id}`, field);
    });

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    await siteActions.updateSite(
      { id: siteID, globalOptions: site.globalOptions },
      dispatch,
      config
    );
    setLoading(false);

    message.success('Updated successfully');
  };

  const fields = prepareContentFields();

  return (
    <CmsLayout pageTitle={`Theme Options`}>
      {site && (
        <Card>
          <Space direction="vertical" size={30}>
            <EditorFields fields={fields} onChangeElement={handleChange} />
            {fields.length > 0 && (
              <Button loading={loading} onClick={handleUpdate} children={`Update`} type="primary" />
            )}
          </Space>
        </Card>
      )}
    </CmsLayout>
  );
};

export default Options;
