import React, { useState } from 'react';
import {
  Button,
  Card,
  Space,
  message,
  Checkbox,
  Table,
  Radio,
  Popconfirm,
  Select as AntSelect,
} from 'antd';
import Parser from 'html-react-parser';

// import app components
import Select from '../Select';
import LanguageForm from '../forms/LanguageForm';

import { useStore } from '../../store';
import { languageActions } from '../../actions';
import Caption from '../Caption';

const LanguageSettings = () => {
  const [
    {
      config,
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const languages = sites[siteID]?.languages;

  const [postTypes, setPostTypes] = useState(languages?.postTypes);
  const [taxonomies, setTaxonomies] = useState(languages?.taxonomies);
  const [defaultLanguage, setDefaultLanguage] = useState(languages?.defaultLanguage);

  const [loading, setLoading] = useState(null as any);

  const handleUpdate = async () => {
    setLoading({ action: 'update-settings' });

    const result = await languageActions.updateSettings(
      { siteID, defaultLanguage, postTypes, taxonomies },
      dispatch,
      config
    );

    if (result) {
      message.success('Updated successfully');
    }

    setLoading(null);
  };

  const handleOpenForm = async (language: any = null) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: !!language ? 'Edit' : 'Add',
        component: <LanguageForm language={language} />,
      },
    });
  };

  const handleDeleteLanguage = async (language: any) => {
    setLoading({ id: language.id, action: 'delete-language' });
    await languageActions.deleteLanguage({ siteID, ...language }, dispatch, config);
    setLoading(null);
  };

  return (
    <Space direction="vertical" size={40}>
      <Card
        title="Languages"
        extra={[
          <Button key="add-language" type="primary" onClick={handleOpenForm} children="Add" />,
        ]}
      >
        <Table
          pagination={false}
          dataSource={
            sites[siteID]?.languages?.languages?.map((o: any) => {
              return { ...o, key: o.id };
            }) || []
          }
        >
          <Table.Column
            title="Flag"
            dataIndex="flag"
            key="flag"
            render={(img: string) => img && Parser(img)}
          />
          <Table.Column title="Name" dataIndex="name" key="name" width="100%" />
          <Table.Column title="Locale" dataIndex="locale" key="locale" />
          <Table.Column title="Code" dataIndex="slug" key="slug" />
          <Table.Column
            title="Action"
            key="action"
            render={(text, language: any) => (
              <Space key={language.id}>
                <Button children="Edit" onClick={() => handleOpenForm(language)} type="primary" />
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDeleteLanguage(language)}
                  okText="Yes"
                  okButtonProps={{
                    id: 'delete-media-confirm',
                  }}
                  cancelText="No"
                >
                  <Button
                    id="delete-language"
                    children="Delete"
                    danger
                    loading={loading?.action === 'delete-language' && loading?.id === language.id}
                  />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </Card>

      <Card title="Settings">
        <Space direction="vertical" size={30}>
          <Select
            label="Default Language"
            value={defaultLanguage}
            onChange={(value: string) => setDefaultLanguage(value)}
          >
            {sites[siteID]?.languages?.languages?.map((o: any) => (
              <AntSelect.Option key={o.slug} value={o.slug} children={o.name} />
            ))}
          </Select>

          <Space direction="vertical" size={6}>
            <Caption children="Post Types" />
            <Checkbox.Group
              options={Object.values(sites[siteID].postTypes)
                .filter((o: any) => !!config?.fields?.postTypes[o.id])
                .map((o: any) => {
                  return {
                    value: o.id,
                    label: o.title,
                    disabled: o.id === 'page' || o.id === 'post',
                  };
                })}
              defaultValue={postTypes}
              onChange={(values: any) => setPostTypes(values)}
            />
          </Space>

          <Space direction="vertical" size={6}>
            <Caption children="Taxonomies" />
            <Checkbox.Group
              options={Object.values(sites[siteID].taxonomies)
                .filter((o: any) => !!config?.fields?.taxonomies.find((p: any) => p.id === o.id))
                .map((o: any) => {
                  return {
                    value: o.id,
                    label: o.title,
                    disabled: o.id === 'category' || o.id === 'post_tag',
                  };
                })}
              defaultValue={taxonomies}
              onChange={(values: any) => setTaxonomies(values)}
            />
          </Space>

          <Space direction="vertical" size={6}>
            <Caption children="URL modifications" />
            <Radio.Group onChange={() => {}} value={'directory'}>
              <Space direction="vertical">
                <Radio value={'directory'}>Directory: https://test.com/en/my-post/</Radio>
                <Radio value={'subdomain'} disabled>
                  Subdomains: https://en.test.com/my-post/
                </Radio>
                <Radio value={'different-domains'} disabled>
                  Different domains
                </Radio>
              </Space>
            </Radio.Group>
          </Space>

          <Button
            onClick={handleUpdate}
            children="Update"
            type="primary"
            loading={loading?.action === 'update-settings'}
          />
        </Space>
      </Card>
    </Space>
  );
};

export default LanguageSettings;
