import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Space, message } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import useKeypress from 'react-use-keypress';
import { navigate } from '@reach/router';

// import app components
import EditorWrapper from './EditorWrapper';
import Loader from '../Loader';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { getTemplateByPost, getPostID } from '../../utils';
import getRoute from '../../routes';
import { RootState, useAppDispatch, useAppSelector, postReducer } from '../../redux';

// We need to store the post ID so we can remove the lock when navigating to a different page (old ID won't be available anymore)
let postLockID: any = null;

const AdminEditor = (props: any) => {
  const { fields, defaultComponent } = props;

  const {
    ui: { editorSettings },
    cms: {
      site,
      editor: { post },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const postID = useMemo(() => {
    return getPostID(site);
  }, [site?.id, window.location.pathname]);

  // Timer for lock check
  const [postLockTimer, setPostLockTimer] = useState(0);

  // Determine if sidebar should be open on default when visiting the editor
  const [sidebarActive, setSidebarActive] = useState(!!site?.editorOptions?.sidebar?.defaultOpen);
  const template = getTemplateByPost(post, fields);
  const Component = template?.component;

  const loaded = postID && post?.id === postID;

  // For the post lock functionality we need 4 useEffect functions to cover the whole process
  // 1. Set up interval function on initial load and remove post lock in case user leaves the editor
  // 2. Refresh the lock status every couple of seconds or check if post is still locked
  // 3. Inform user who is currently editing the post by displaying the take over dialog
  // 4. Remove lock status from old post in case user navigates away via editor link
  useEffect(() => {
    // Activate postLockTimer for post locking
    const intervalID = setInterval(() => {
      setPostLockTimer((time) => time + 1);
    }, 60000); // 60 seconds

    return () => {
      clearInterval(intervalID);
      if (loaded && !post?.locked) {
        // Remove post lock once we leave the post editor
        removePostLock(postID);
      }
    };
  }, []);

  useEffect(() => {
    // Skip initial fetch (postLockTimer = 0) because we're already setting the status on initial getPost fetch in WP
    if (loaded && postLockTimer) {
      if (post?.locked) {
        // Fetch post again in case it's locked to determine if other user is still editing
        loadPost();
      } else {
        // Refresh the post lock status to inform WordPress that we are still editing
        refreshPostLock();
      }
    }
  }, [postLockTimer]);

  useEffect(() => {
    // Remove previous post ID in case user navigates to a different page
    if (postLockID) {
      removePostLock(postLockID);
    }
    // Set new post id
    postLockID = postID;
  }, [postID]);

  useEffect(() => {
    if (post?.locked?.id) {
      handleOpenTakeOverDialog();
    }
  }, [post?.locked?.id]);

  useEffect(() => {
    loadPost();
    // Add fresh copy of editor to state
    dispatch({ type: 'ADD_EDITOR_SITE', payload: site });
    return () => dispatch({ type: 'CLEAR_EDITOR' });
  }, [postID]);

  useKeypress('Escape', () => {
    !editorSettings.fullscreen && setSidebarActive(!sidebarActive);
  });

  const loadPost = async () => {
    postID && postReducer.getPost({ id: postID });
  };

  const handleTakeOver = async () => {
    await postReducer.takeOverPost({ id: postID });
  };

  const handleOpenTakeOverDialog = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Locked',
        component: (
          <Space direction="vertical" size={20}>
            <Typography.Text>
              This content is currently locked. If you take over, {post?.locked?.email} will be
              blocked from continuing to edit.
            </Typography.Text>

            <Space>
              <Button
                onClick={() => {
                  dispatch({ type: 'CLOSE_DIALOG' });
                  navigate(getRoute(`collection`, { postTypeID: post?.postTypeID || 'page' }));
                }}
                children="Dashboard"
              />
              <Button onClick={() => dispatch({ type: 'CLOSE_DIALOG' })} children="Preview" />
              <Button onClick={handleTakeOver} type="primary" children="Take Over" />
            </Space>
          </Space>
        ),
      },
    });
  };

  const refreshPostLock = async () => {
    await postReducer.refreshPostLock({ id: postID });
  };

  const removePostLock = async (id: any) => {
    await postReducer.removePostLock({ id });
  };

  const handleToggleSidebar = () => {
    if (sidebarActive) {
      message.info({
        content: (
          <>
            Press <Typography.Text keyboard>ESC</Typography.Text> to reopen sidebar
          </>
        ),
      });
    }
    setSidebarActive(!sidebarActive);
  };

  const sidebarOptions = { ...site?.editorOptions?.sidebar, active: sidebarActive };

  if (!postID) {
    return defaultComponent;
  }

  return (
    <>
      <EditorWrapper sidebarActive={sidebarActive} loaded={loaded} locked={!!post?.locked}>
        {loaded ? (
          <Editor fields={fields} postID={postID} {...props} sidebarOptions={sidebarOptions} />
        ) : (
          <Loader />
        )}
      </EditorWrapper>

      {loaded && (
        <>
          {post?.locked ? (
            <FloatingButton sidebarPosition={site?.editorOptions?.sidebar?.position}>
              <Button
                icon={<LockOutlined />}
                onClick={handleOpenTakeOverDialog}
                size="large"
                type="primary"
              />
            </FloatingButton>
          ) : (
            <>
              {sidebarActive ? (
                <Sidebar
                  className="jam-cms"
                  fields={fields}
                  editable={!!Component}
                  onToggleSidebar={handleToggleSidebar}
                />
              ) : (
                <FloatingButton sidebarPosition={site?.editorOptions?.sidebar?.position}>
                  <Button
                    icon={<EditOutlined />}
                    onClick={handleToggleSidebar}
                    size="large"
                    type="primary"
                  />
                </FloatingButton>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const FloatingButton = styled('div' as any)`
  position: fixed;
  left: ${({ sidebarPosition }: any) => (sidebarPosition === 'left' ? 0 : 'unset')};
  right: ${({ sidebarPosition }: any) => (sidebarPosition === 'left' ? 'unset' : 0)};
  bottom: 200px;
  z-index: 99999;

  .ant-btn-icon-only.ant-btn-lg {
    border-radius: ${({ sidebarPosition }: any) =>
      sidebarPosition === 'left' ? '0 2px 2px 0' : '2px 0 0 2px'};
  }
`;

export default AdminEditor;
