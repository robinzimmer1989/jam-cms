import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Empty, Typography, message } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { set } from 'lodash';
import useKeypress from 'react-use-keypress';
import { Button } from 'antd';

// import app components
import PageWrapper from '../components/PageWrapper';
import Loader from '../components/Loader';
import EditorSidebar from '../components/EditorSidebar';

import {
  auth,
  formatFieldsToProps,
  formatTaxonomiesForEditor,
  generateSlug,
  getTemplateByPost,
} from '../utils';
import { useStore } from '../store';
import { postActions, previewActions } from '../actions';

const PostEditor = (props) => {
  const { defaultComponent } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore();

  const { fields } = config;

  const previewID = auth.isPreview();

  // Timer for lock check
  const [postLockTimer, setPostLockTimer] = useState(0);
  // We need to store the post ID so we can remove the lock when navigating to a different page (old ID won't be available anymore)
  const [postLockID, setPostLockID] = useState(null);

  // GraphQL query result
  const [query, setQuery] = useState(null);

  // Determine if sidebar should be open on default when visiting the editor
  let sidebarActiveDefault = false;

  if (sites?.[siteID]?.editorOptions?.sidebar?.defaultOpen && !previewID) {
    sidebarActiveDefault = true;
  }

  const [sidebarActive, setSidebarActive] = useState(sidebarActiveDefault);

  const template = getTemplateByPost(post, fields);
  const Component = template?.component;

  const pathname = window.location.pathname.replace(/\/$/, '');

  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  };

  // The post id is only available during initial load so we need to look it up ourselves by searching through all pages
  const postID = useMemo(() => {
    let postID = '';

    if (sites[siteID]) {
      Object.values(sites[siteID].postTypes).map((o) =>
        Object.values(o.posts).map((p) => {
          const slug = generateSlug(o, p.id, sites?.[siteID]?.frontPage, true);

          if (slug === `${pathname}/`) {
            postID = p.id;
          } else if (
            // We're assuming here that there is not conflicting page which has the format '/[blog]/page/2'
            pathname.includes(slug) &&
            pathname.includes('page') &&
            isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
          ) {
            postID = p.id;
          }
        })
      );
    }

    return postID;
  }, [pathname]);

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

  // The 'true' template id is a combination of id and post type
  const templateID = `${template?.id}-${template?.postTypeID}`;

  let loaded = false;

  // Check if post editor is ready
  if (site && post?.id === postID) {
    loaded = true;
  }

  // If there is a query, we need to wait for it
  if (template?.query && !query) {
    loaded = false;
  }

  // For the post lock functionality we need 4 useEffect functions to cover the whole process
  // 1. Set up interval function on initial load and remove post lock in case user leaves the editor
  // 2. Refresh the lock status every couple of seconds or check if post is still locked
  // 3. Inform user who is currently editing the post
  // 4. Remove lock status from old post in case user navigates away via editor link

  useEffect(() => {
    // Activate postLockTimer for post locking
    const intervalID = setInterval(() => {
      setPostLockTimer((time) => time + 1);
    }, 10000); // 10 seconds

    return async () => {
      clearInterval(intervalID);

      if (post && post.id === postID && !post.locked) {
        // Remove post lock once we leave the post editor
        await removePostLock(postID);
      }
    };
  }, []);

  useEffect(() => {
    // Skip initial fetch (postLockTimer = 0) because we're already setting the status on initial getPost fetch in WP
    if (postID && post && post.id === postID && postLockTimer) {
      if (post?.locked) {
        // Fetch post again in case it's locked to determine if other user is still editing
        loadPost(postID);
      } else {
        // Refresh the post lock status to inform WordPress that we are still editing
        refreshPostLock();
      }
    }
  }, [postLockTimer]);

  useEffect(() => {
    // Inform users who is editing the content right now
    if (postID && post && post.id === postID && post.locked) {
      message.info({ content: `${post.locked?.email} is currently editing` });
    }
  }, [pathname, postID, post?.id]);

  useEffect(() => {
    // Remove previous post ID in case user navigates to a different page
    if (postLockID) {
      removePostLock(postLockID);
    }

    // Set new post id
    setPostLockID(postID);
  }, [postID]);

  // Load query in case post has one assigned
  useEffect(() => {
    const loadQuery = async () => {
      // TODO: Move to utils function
      const cleanedUrl = config?.source.replace(/\/+$/, '');

      const result = await axios.post(`${cleanedUrl}/graphql`, { query: template.query });

      if (result?.data) {
        setQuery(result.data);
      }
    };

    template?.query && loadQuery();
  }, [templateID]);

  useEffect(() => {
    loadPost(postID);

    // Add fresh copy of editor to state
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    });

    // Reset query
    setQuery(null);

    return () => dispatch({ type: `CLEAR_EDITOR` });
  }, [postID]);

  useKeypress('Escape', () => {
    !previewID && setSidebarActive(!sidebarActive);
  });

  const loadPost = async (postID) => {
    if (!postID) {
      return;
    }

    let result;

    if (previewID) {
      result = await previewActions.getPostPreview({ siteID, previewID }, dispatch, config);
    } else {
      result = await postActions.getPost({ siteID, postID }, dispatch, config);
    }

    if (result) {
      dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
      dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID } });
    }
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

  const getPostData = () => {
    // Generate query variable i.e. 'wpPage'
    const nodeType = `wp${post.postTypeID.charAt(0).toUpperCase() + post.postTypeID.slice(1)}`;

    // Destructure query data in case user requested more information about post (i.e. wpPost comments)
    const { [nodeType]: nodeTypeQueryData, ...otherQueryData } = query?.data || {};

    // Generate default page data
    const data = { ...otherQueryData };

    const nodeTypeData = {
      id: post.id,
      seo: post.seo,
      title: post.title,
      date: post.createdAt,
      featuredImage: post.featuredImage,
      postTypeID: post.postTypeID,
      ...formatTaxonomiesForEditor(post, site),
    };

    data[nodeType] = { ...nodeTypeQueryData, ...nodeTypeData };

    const acfData = formatFieldsToProps({
      global: false,
      content: post.content,
      site,
      template,
    });

    if (post.postTypeID === 'page') {
      set(data, `${nodeType}.template.acf`, acfData);
    } else {
      set(data, `${nodeType}.acf`, acfData);
    }

    return data;
  };

  return (
    <>
      <PageWrapper
        template={!!Component && post?.content}
        sidebarActive={sidebarActive}
        loaded={loaded}
        locked={!!post?.locked}
      >
        {postID ? (
          <>
            {loaded ? (
              <>
                {!!Component && post?.content ? (
                  <Component
                    jamCMS={{
                      sidebar: {
                        active: sidebarActive,
                        ...sites?.[siteID]?.editorOptions?.sidebar,
                      },
                    }}
                    data={getPostData()}
                    pageContext={{
                      themeOptions: formatFieldsToProps({
                        global: true,
                        themeOptions: fields?.themeOptions,
                        content: site?.themeOptions,
                        site,
                        template,
                      }),
                      pagination,
                    }}
                  />
                ) : (
                  <EmptyContainer className="jam-cms">
                    <Empty
                      imageStyle={{
                        height: 120,
                      }}
                      description={'No Template'}
                    />
                  </EmptyContainer>
                )}
              </>
            ) : (
              <Loader />
            )}
          </>
        ) : (
          <>
            {React.cloneElement(defaultComponent, {
              pageContext: {
                pagination,
                themeOptions: formatFieldsToProps({
                  themeOptions: fields?.themeOptions,
                  content: site?.themeOptions,
                  site,
                }),
              },
            })}
          </>
        )}
      </PageWrapper>

      {previewID ? (
        <PreviewBanner children={`Preview`} type="primary" />
      ) : (
        <>
          {loaded && (
            <>
              {post?.locked ? (
                <FloatingButton sidebarPosition={sites?.[siteID]?.editorOptions?.sidebar?.position}>
                  <Button icon={<LockOutlined />} size="large" type="primary" />
                </FloatingButton>
              ) : (
                <>
                  {sidebarActive ? (
                    <EditorSidebar
                      className="jam-cms"
                      editable={!!Component}
                      onToggleSidebar={handleToggleSidebar}
                    />
                  ) : (
                    <FloatingButton
                      sidebarPosition={sites?.[siteID]?.editorOptions?.sidebar?.position}
                    >
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
      )}
    </>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const PreviewBanner = styled(Button)`
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 9999;
  transform: rotate(270deg) translate(-50%, 50%);
  transform-origin: left;
`;

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

export default PostEditor;
