import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import produce from 'immer';
import { set } from 'lodash';
import {
  message,
  Badge,
  Alert,
  Menu,
  Button,
  Popover,
  Space,
  Row,
  Typography,
  Dropdown,
} from 'antd';
import {
  MenuOutlined as MenuIcon,
  EditOutlined as EditIcon,
  QuestionOutlined as HelpIcon,
  PlusOutlined as AddIcon,
} from '@ant-design/icons';

// import app components
import Tag from './Tag';
import PostForm from './PostForm';

import { colors } from '../theme';
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
      editorState: { site, post, siteHasChanged, postHasChanged, sidebar },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState('');

  const handleSaveDraft = () => {
    handleSave('draft', 'draft');
  };

  const handlePublish = () => {
    handleSave('publish', 'publish');
  };

  const handleUpdate = () => {
    handleSave('update', 'publish');
  };

  const handleSave = async (action, status) => {
    const { id, globalOptions, frontPage } = site;

    // Add template object to request, but only in development mode
    const templateObject =
      process.env.NODE_ENV === 'development' &&
      templates?.postTypes?.[post?.postTypeID]?.[post?.template];

    setLoading(action);

    let postResult, siteResult;

    if (siteHasChanged) {
      siteResult = await siteActions.updateSite({ id, globalOptions, frontPage }, dispatch, config);
    }

    if (postHasChanged || action === 'publish') {
      postResult = await postActions.updatePost(
        { siteID: id, ...post, status, templateObject },
        dispatch,
        config
      );

      // In case the user only updates the post, the new deployment status isn't available (only for site updates), so we need to manually update the site.
      if (!siteHasChanged) {
        dispatch({
          type: 'ADD_SITE_SETTING',
          payload: {
            id: siteID,
            key: 'deployment.undeployedChanges',
            value: true,
          },
        });
      }
    }

    setLoading('');

    if (postResult || siteResult) {
      message.success('Updated successfully');

      // We need to generate the slug and navigate to it in case the user has changed the post name
      const nextPostType = produce(site.postTypes[post.postTypeID], (draft) => {
        return set(draft, `posts.${post.id}`, post);
      });

      const slug = generateSlug(nextPostType, post.id, site.frontPage, true);
      navigate(slug);
    }
  };

  const handleAddPost = async ({ postTypeID, title, parentID }) => {
    const result = await postActions.addPost(
      { siteID, postTypeID, status: 'draft', title, parentID },
      dispatch,
      config
    );

    if (result?.id) {
      // Add post to post type so we can then generate the slug and the route the newly created post
      const nextPostType = produce(site.postTypes[postTypeID], (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });
      const slug = generateSlug(nextPostType, result.id, sites?.[siteID]?.frontPage);
      navigate(`/${slug}`);
    }
  };

  const handleDiscard = (returnToDashboard) => {
    if (returnToDashboard) {
      onBack();
    } else {
      siteHasChanged && dispatch({ type: 'ADD_EDITOR_SITE', payload: sites[siteID] });
      postHasChanged &&
        dispatch({
          type: 'ADD_EDITOR_POST',
          payload: sites[siteID]?.postTypes?.[post?.postTypeID]?.posts?.[post.id],
        });
    }
  };

  const handleDiscardRequest = (returnToDashboard = false) => {
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
                    handleDiscard(returnToDashboard);
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

  const addPostMenu = (
    <StyledMenu>
      {site?.postTypes &&
        Object.values(site.postTypes).map((o) => {
          return (
            <Menu.Item
              key={o.id}
              onClick={() =>
                dispatch({
                  type: 'SET_DIALOG',
                  payload: {
                    open: true,
                    title: `Add`,
                    component: <PostForm onSubmit={handleAddPost} postTypeID={o.id} />,
                  },
                })
              }
            >
              {o.title}
            </Menu.Item>
          );
        })}
    </StyledMenu>
  );

  return (
    <Container>
      <Row>
        <FieldsContainer>
          <Space>
            <MenuIcon onClick={() => handleDiscardRequest(true)} />
            <span className="ant-page-header-heading-title">{postID ? title : 'Not Found'}</span>
          </Space>
          {tags}
        </FieldsContainer>
      </Row>

      {(siteHasChanged || postHasChanged) && (
        <Row>
          <Space>
            <Button children="Discard" onClick={() => handleDiscardRequest(false)} />

            {post?.status === 'draft' && (
              <>
                <Button
                  children="Save Draft"
                  onClick={handleSaveDraft}
                  loading={loading === 'draft'}
                />
                <Button
                  children="Publish"
                  type="primary"
                  onClick={handlePublish}
                  loading={loading === 'publish'}
                />
              </>
            )}

            {(post?.status === 'publish' || post?.status === 'trash' || !post) && (
              <Button
                children="Update"
                type="primary"
                onClick={handleUpdate}
                loading={loading === 'update'}
              />
            )}
          </Space>
        </Row>
      )}

      <Row>
        <FieldsContainer alignRight>
          <Space>
            <Dropdown overlay={addPostMenu} arrow trigger={['click']}>
              <div>
                <Button
                  icon={<AddIcon />}
                  shape="circle"
                  type="default"
                  disabled={postHasChanged || siteHasChanged}
                />
              </div>
            </Dropdown>

            <Popover
              title="Help"
              content={helpContent}
              arrow
              trigger={['click']}
              placement="bottomRight"
            >
              <Badge dot={siteHasChanged || postHasChanged}>
                <Button icon={<HelpIcon />} shape="circle" type="default" />
              </Badge>
            </Popover>

            <Button
              key={'settings'}
              icon={<EditIcon />}
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
          </Space>
        </FieldsContainer>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid ${colors.tertiaryColor};
`;

const FieldsContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: ${({ alignRight }) => (alignRight ? 'flex-end' : 'flex-start')};
`;

const StyledMenu = styled(Menu)`
  width: 150px;
`;

export default EditorHeader;
