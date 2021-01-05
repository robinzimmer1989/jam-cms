import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { PageHeader, Button, Dropdown, Menu, message, Typography, Space } from 'antd';
import {
  MenuOutlined,
  FullscreenOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  EditOutlined,
} from '@ant-design/icons';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import Tag from './Tag';
import Skeleton from './Skeleton';
import { useStore } from '../store';
import { postActions, siteActions } from '../actions';
import { generateSlug } from '../utils';

const EditorHeader = (props) => {
  const { postID, template, title, templates, onBack } = props;

  const disabled = !postID || !template;

  const [
    {
      config,
      editorState: { site, post, hasChanged, viewport, sidebar },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(false);

  const handleSavePost = async () => {
    const { id, settings, frontPage } = site;

    // Add template object to request, but only in development mode
    const templateObject =
      process.env.NODE_ENV === 'development' &&
      templates?.[post?.postTypeID] &&
      templates[post.postTypeID].find((o) => o.id === post?.template);

    setLoading(true);

    await siteActions.updateSite({ id, settings, frontPage }, dispatch, config);

    const result = await postActions.updatePost(
      { siteID: id, ...post, templateObject },
      dispatch,
      config
    );

    if (result) {
      // We need to generate the slug and navigate to it in case the user has changed the post name
      const postType = site?.postTypes?.[result.postTypeID];

      const nextPostType = produce(postType, (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });

      const slug = generateSlug(nextPostType, result.id, site?.frontPage, true);
      navigate(slug);
    }

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
                    onBack();
                    dispatch({ type: 'CLOSE_DIALOG' });
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

  if (post?.status === 'draft' || post?.status === 'trash') {
    tags.push(<Tag key={'status'} children={post?.status} />);
  }

  if (site?.frontPage && post?.id && site.frontPage === post.id) {
    tags.push(<Tag key="front" children={'front'} />);
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
    </Menu>
  );

  buttons.push(
    <Dropdown key={'menu'} overlay={dropDownMenu} arrow trigger={['click']} disabled={disabled}>
      <Button icon={views.find((o) => o.type === viewport).icon} shape="circle" type="default" />
    </Dropdown>
  );

  buttons.push(
    <Button
      key={'settings'}
      icon={<EditOutlined />}
      shape="circle"
      type={sidebar ? 'primary' : 'default'}
      disabled={disabled}
      onClick={() =>
        dispatch({
          type: `SET_EDITOR_SIDEBAR`,
          payload: sidebar ? null : 'settings',
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
      title={
        postID ? (
          <Skeleton done={!!title} width={120} height={32}>
            {title}
          </Skeleton>
        ) : (
          'Not Found'
        )
      }
      extra={buttons}
      tags={tags}
      onBack={handleClickBack}
      backIcon={<MenuOutlined />}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    />
  );
};

export default EditorHeader;
