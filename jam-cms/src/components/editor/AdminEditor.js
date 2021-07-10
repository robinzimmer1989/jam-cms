import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Space, message } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import useKeypress from 'react-use-keypress';
import { navigate } from '@reach/router';

// import app components
import PageWrapper from '../PageWrapper';
import Loader from '../Loader';
import Sidebar from './Sidebar';
import Editor from './Editor';

import { formatFieldsToProps, getTemplateByPost } from '../../utils';
import { useStore } from '../../store';
import { postActions } from '../../actions';
import getRoute from '../../routes';

// We need to store the post ID so we can remove the lock when navigating to a different page (old ID won't be available anymore)
let postLockID = null;

const AdminWrapper = (props) => {
  const {
    pageContext: { databaseId: postID },
    defaultComponent,
  } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post, editorSettings },
    },
    dispatch,
  ] = useStore();

  // Timer for lock check
  const [postLockTimer, setPostLockTimer] = useState(0);

  // Determine if sidebar should be open on default when visiting the editor
  const [sidebarActive, setSidebarActive] = useState(
    !!sites?.[siteID]?.editorOptions?.sidebar?.defaultOpen
  );

  const template = getTemplateByPost(post, config?.fields);
  const Component = template?.component;

  const pathname = window.location.pathname.replace(/\/$/, '');

  const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  // We need to check if post is front page to return the correct basePath for pagination
  const isFrontPage = postID === sites?.[siteID]?.frontPage;

  // The pagination object will be available once we have the post id and therefore template id
  const pagination = useMemo(() => {
    let pagination = {};

    if (template?.id === 'archive') {
      // Get the page number if exists
      const page = isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
        ? parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
        : 1;

      const postsPerPage = config?.settings?.postsPerPage || 10;

      const numberOfPosts = Object.values(
        sites?.[siteID]?.postTypes?.[template?.postTypeID]?.posts || {}
      ).filter((o) => o.status === 'publish').length;

      pagination = {
        basePath: isFrontPage ? '/' : `/${post.slug}/`,
        numberOfPosts,
        postsPerPage,
        numberOfPages: Math.ceil(numberOfPosts / postsPerPage),
        page,
      };
    }

    return pagination;
  }, [isFrontPage, template?.id, pathname]);

  const loaded = postID && post?.id === postID && !!site;

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

    return async () => {
      clearInterval(intervalID);

      if (loaded && !post.locked) {
        // Remove post lock once we leave the post editor
        await removePostLock(postID);
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
    dispatch({ type: 'ADD_EDITOR_SITE', payload: sites[siteID] });

    return () => dispatch({ type: 'CLEAR_EDITOR' });
  }, [postID]);

  useKeypress('Escape', () => {
    !editorSettings.fullscreen && setSidebarActive(!sidebarActive);
  });

  const loadPost = async () => {
    if (!postID) {
      return;
    }

    const result = await postActions.getPost({ siteID, postID }, dispatch, config);

    if (result) {
      dispatch({ type: 'ADD_POST', payload: { ...result, siteID } });
      dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID } });
    }
  };

  const handleTakeOver = async () => {
    await postActions.takeOverPost({ siteID, id: postID }, dispatch, config);
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
              This content is currently locked. If you take over, {post.locked.email} will be
              blocked from continuing to edit.
            </Typography.Text>

            <Space>
              <Button
                onClick={() => {
                  dispatch({ type: 'CLOSE_DIALOG' });
                  navigate(
                    getRoute(`collection`, { siteID, postTypeID: post?.postTypeID || 'page' })
                  );
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
    await postActions.refreshPostLock({ siteID, id: postID }, dispatch, config);
  };

  const removePostLock = async (id) => {
    await postActions.removePostLock({ siteID, id }, dispatch, config);
  };

  const handleToggleSidebar = () => {
    if (sidebarActive) {
      message.open({
        content: (
          <>
            Press <Typography.Text keyboard>ESC</Typography.Text> to reopen sidebar
          </>
        ),
      });
    }

    setSidebarActive(!sidebarActive);
  };

  const sidebarOptions = { ...sites?.[siteID]?.editorOptions?.sidebar, active: sidebarActive };

  return (
    <>
      <PageWrapper sidebarActive={sidebarActive} loaded={loaded} locked={!!post?.locked}>
        {postID ? (
          <>{loaded ? <Editor {...props} sidebarOptions={sidebarOptions} /> : <Loader />}</>
        ) : (
          <>
            {React.cloneElement(defaultComponent, {
              pageContext: {
                pagination,
                themeOptions: formatFieldsToProps({
                  themeOptions: config?.fields?.themeOptions,
                  content: site?.themeOptions,
                  site,
                }),
              },
            })}
          </>
        )}
      </PageWrapper>

      {loaded && (
        <>
          {post?.locked ? (
            <FloatingButton sidebarPosition={sites?.[siteID]?.editorOptions?.sidebar?.position}>
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
                  editable={!!Component}
                  onToggleSidebar={handleToggleSidebar}
                />
              ) : (
                <FloatingButton sidebarPosition={sites?.[siteID]?.editorOptions?.sidebar?.position}>
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

const FloatingButton = styled.div`
  position: fixed;
  left: ${({ sidebarPosition }) => (sidebarPosition === 'left' ? 0 : 'unset')};
  right: ${({ sidebarPosition }) => (sidebarPosition === 'left' ? 'unset' : 0)};
  bottom: 200px;
  z-index: 99999;

  .ant-btn-icon-only.ant-btn-lg {
    border-radius: ${({ sidebarPosition }) =>
      sidebarPosition === 'left' ? '0 2px 2px 0' : '2px 0 0 2px'};
  }
`;

export default AdminWrapper;
