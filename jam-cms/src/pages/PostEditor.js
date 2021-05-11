import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import axios from 'axios';
import { set } from 'lodash';
import useKeypress from 'react-use-keypress';

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
import { postActions } from '../actions';

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

  const [query, setQuery] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(true);

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
        basePath: `/${post.slug}/`,
        numberOfPosts,
        postsPerPage,
        numberOfPages: Math.ceil(numberOfPosts / postsPerPage),
        page,
      };
    }

    return pagination;
  }, [template?.id]);

  // The 'true' template id is a combination of id and post type
  const templateID = `${template?.id}-${template?.postTypeID}`;

  // Check if post editor is ready
  let isReady = false;

  if (site && post) {
    isReady = true;
  }

  // If there is a query, we need to wait for it
  if (template?.query && !query) {
    isReady = false;
  }

  useEffect(() => {
    const loadQuery = async () => {
      const cleanedUrl = config?.source.replace(/\/+$/, '');
      const user = auth.getUser(config);

      const result = await axios.post(
        `${cleanedUrl}/graphql`,
        { query: template.query },
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );

      if (result?.data) {
        setQuery(result.data);
      }
    };

    template?.query && loadQuery();
  }, [templateID]);

  useEffect(() => {
    const loadPost = async (postID) => {
      const result = await postActions.getPost({ siteID, postID }, dispatch, config);

      if (result) {
        dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
        dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID } });
      }
    };

    postID && loadPost(postID);

    // Add fresh copy of editor to state
    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    });

    // Reset query
    setQuery(null);

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, [postID]);

  useKeypress('Escape', () => {
    setSidebarActive(!sidebarActive);
  });

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
      <PageWrapper template={!!Component && post?.content} sidebarActive={sidebarActive}>
        {postID ? (
          <>
            {isReady ? (
              <>
                {!!Component && post?.content ? (
                  <Component
                    jamCMS={{ sidebar: sidebarActive }}
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

      {sidebarActive && <EditorSidebar className="jam-cms" editable={!!Component} />}
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

export default PostEditor;
