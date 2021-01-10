import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  PageHeader,
  Button,
  Dropdown,
  Menu,
  message,
  Typography,
  Space,
  Popover,
  Badge,
  Alert,
  Skeleton,
} from 'antd';
import {
  FullscreenOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  EditOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import Tag from './Tag';
import { useStore } from '../store';
import { postActions, siteActions } from '../actions';
import { generateSlug } from '../utils';

const EditorHeader = (props) => {
  const { postID, template, title, templates, onBack } = props;

  const disabled = !postID || !template;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post, siteHasChanged, postHasChanged, viewport, sidebar },
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

    if (siteHasChanged) {
      await siteActions.updateSite({ id, settings, frontPage }, dispatch, config);
    }

    if (postHasChanged) {
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

      // In case the user only updates the post, the new deployment status isn't available (only for site updates)
      // To overcome this issue we need to manually update the site.
      if (!siteHasChanged) {
        const nextSite = produce(sites[siteID], (draft) => {
          return set(draft, `deployment.undeployedChanges`, true);
        });

        dispatch({ type: 'ADD_SITE', payload: nextSite });
      }
    }

    setLoading(false);

    message.success('Updated successfully');
  };

  const handleClickBack = () => {
    if (siteHasChanged || postHasChanged) {
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

  const helpContent = (
    <div>
      {(siteHasChanged || postHasChanged) && (
        <p>
          <Alert
            message="We've disabled the links on the page to make sure that no content gets lost."
            type="info"
            showIcon
          />
        </p>
      )}

      <p>
        This is the editor mode. It works the same way as you're used to it from other CMS's like
        WordPress.
      </p>
      <p>
        For content edits click the pen icon. It will open the sidebar and will display multiple
        tabs at the very top.
      </p>
      <p>
        You can change the screen size by clicking on the monitor icon on the right. Here you can
        toggle between phone, tablet, desktop and fullscreen.
      </p>
    </div>
  );

  buttons.push(
    <Popover
      key={'help'}
      title="Help"
      content={helpContent}
      arrow
      trigger={['click']}
      placement="bottomRight"
    >
      <Badge dot={siteHasChanged || postHasChanged}>
        <Button icon={<QuestionOutlined />} shape="circle" type="default" />
      </Badge>
    </Popover>
  );

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
      ghost={sidebar}
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
      disabled={!siteHasChanged && !postHasChanged}
    />
  );

  return (
    <PageHeader
      title={postID ? title || <Skeleton.Input active style={{ width: 120 }} /> : 'Not Found'}
      extra={buttons}
      tags={tags}
      onBack={handleClickBack}
      style={{ paddingLeft: 20, paddingRight: 20, borderBottom: '1px solid #d9e1ef' }}
    />
  );
};

export default EditorHeader;
