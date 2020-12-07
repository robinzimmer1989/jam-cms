import React from 'react';
import { PageHeader, Button, Tag, Dropdown, Menu } from 'antd';
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

const EditorHeader = (props) => {
  const { title, onBack } = props;

  const [
    {
      editorState: { hasChanged, editable, viewport, sidebar },
    },
    dispatch,
  ] = useStore();

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

  return (
    <PageHeader
      title={title}
      extra={buttons}
      tags={tags}
      onBack={onBack}
      style={{ paddingLeft: 40, paddingRight: 40 }}
    />
  );
};

export default EditorHeader;
