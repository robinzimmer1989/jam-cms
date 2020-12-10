import React, { useState } from 'react';
import { PageHeader, Button, Tag, Dropdown, Menu, message, Typography, Space } from 'antd';
import {
  MenuOutlined,
  CodeOutlined,
  FullscreenOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { postActions, siteActions } from '../actions';

const EditorHeader = (props) => {
  const { title, onBack } = props;

  const [
    {
      config,
      editorState: { site, post, hasChanged, editable, viewport, sidebar },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(false);

  const handleSavePost = async () => {
    const { id, settings, frontPage } = site;

    setLoading(true);
    await postActions.updatePost({ siteID: id, ...post }, dispatch, config);
    await siteActions.updateSite({ id, settings, frontPage }, dispatch, config);
    setLoading(false);

    message.success('Updated successfully');
  };

  const handleClickBack = () => {
    if (hasChanged) {
      dispatch({
        type: 'SET_DIALOG',
        payload: {
          open: true,
          title: 'Unsaved changes',
          component: (
            <Space direction="vertical" size={20}>
              <Typography children={'There are unsaved changes. Are you sure?'} />
              <Space>
                <Button
                  children="Discard changes"
                  onClick={() => {
                    dispatch({ type: 'CLOSE_DIALOG' });
                    onBack();
                  }}
                />
                <Button
                  children="Back to Editor"
                  type="primary"
                  onClick={() => dispatch({ type: 'CLOSE_DIALOG' })}
                />
              </Space>
            </Space>
          ),
          width: 400,
        },
      });
    } else {
      onBack();
    }
  };

  const tags = [];

  if (hasChanged) {
    tags.push(<Tag key={'has-changed'} color="blue" children={`Unsaved Changes`} />);
  }

  const buttons = [];

  const views = [
    { type: 'mobile', icon: <MobileOutlined style={{ fontSize: '14px' }} />, title: 'Phone' },
    { type: 'tablet', icon: <TabletOutlined style={{ fontSize: '14px' }} />, title: 'Tablet' },
    { type: 'desktop', icon: <DesktopOutlined style={{ fontSize: '14px' }} />, title: 'Desktop' },
    {
      type: 'fullscreen',
      icon: <FullscreenOutlined style={{ fontSize: '14px' }} />,
      title: 'Fullscreen',
    },
  ];

  const dropDownMenu = (
    <Menu>
      <Menu.ItemGroup title="View">
        {views.map((o) => {
          return (
            <Menu.Item
              key={o.type}
              children={o.title}
              icon={o.icon}
              onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: o.type })}
              className={viewport === o.type && 'active'}
            />
          );
        })}
      </Menu.ItemGroup>

      {process.env.NODE_ENV === 'development' && (
        <Menu.ItemGroup title="Development">
          <Menu.Item
            children={editable ? 'Disable Select' : 'Enable Select'}
            icon={<CodeOutlined />}
            onClick={() => dispatch({ type: `SET_EDITOR_EDITABLE`, payload: !editable })}
          />
        </Menu.ItemGroup>
      )}
    </Menu>
  );

  buttons.push(
    <Dropdown key={'menu'} overlay={dropDownMenu} arrow trigger={['click']}>
      <Button icon={<MenuOutlined />} shape="circle" type="default" />
    </Dropdown>
  );

  buttons.push(
    <Button
      key={'settings'}
      icon={<SettingOutlined />}
      shape="circle"
      type="default"
      onClick={() =>
        dispatch({
          type: `SET_EDITOR_SIDEBAR`,
          payload: sidebar === 'post-settings' ? null : 'post-settings',
        })
      }
    />
  );

  buttons.push(
    <Button
      key={'update'}
      children="Update"
      type="primary"
      onClick={handleSavePost}
      loading={loading}
      disabled={!hasChanged}
    />
  );

  return (
    <PageHeader
      title={title}
      extra={buttons}
      tags={tags}
      onBack={handleClickBack}
      style={{ paddingLeft: 40, paddingRight: 40 }}
    />
  );
};

export default EditorHeader;
