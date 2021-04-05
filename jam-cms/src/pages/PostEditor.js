import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import axios from 'axios';

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
  const { templates, defaultComponent } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post, sidebar },
    },
    dispatch,
  ] = useStore();

  const [query, setQuery] = useState(null);

  const template = getTemplateByPost(post, templates);

  const pathname = window.location.pathname.replace(/\/$/, '');

  const Component = template?.component;

  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  };

  const getPostID = () => {
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
  };

  const getPagination = () => {
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
  };

  // The post id is only available during initial load so we need to look it up ourselves by searching through all pages
  const postID = getPostID();

  // The pagination object will be available once we have the post id and therefore template id
  const pagination = getPagination();

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
      await postActions.getPost({ siteID, postID }, dispatch, config);
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

  return (
    <>
      {postID ? (
        <>
          {isReady ? (
            <PageWrapper template={!!Component && post?.content}>
              {!!Component && post?.content ? (
                <Component
                  jamCMS={{ sidebar: !!sidebar }}
                  data={{
                    ...query?.data,
                    // Generate query variable i.e. 'wpPage'
                    [`wp${post.postTypeID.charAt(0).toUpperCase() + post.postTypeID.slice(1)}`]: {
                      id: post.id,
                      seo: post.seo,
                      title: post.title,
                      createdAt: post.createdAt,
                      featuredImage: post.featuredImage,
                      postTypeID: post.postTypeID,
                      acf: formatFieldsToProps(post.content, site),
                      ...formatTaxonomiesForEditor(post, site),
                    },
                  }}
                  pageContext={{
                    globalOptions: formatFieldsToProps(site?.globalOptions, site),
                    pagination,
                  }}
                />
              ) : (
                <EmptyContainer className="jam-cms">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 120,
                    }}
                    description={'No Template'}
                  />
                </EmptyContainer>
              )}

              <EditorSidebar
                className="jam-cms"
                templates={templates}
                hasTemplate={!!Component}
                editable={true}
              />
            </PageWrapper>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <>
          {defaultComponent}
          <EditorSidebar className="jam-cms" hasTemplate={false} editable={false} />
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

export default PostEditor;
