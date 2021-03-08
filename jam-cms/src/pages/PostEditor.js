import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';

// import app components
import PageWrapper from '../components/PageWrapper';
import Loader from '../components/Loader';
import FourOhFour from '../components/FourOhFour';
import EditorSidebar from '../components/EditorSidebar';

import { formatFieldsToProps, formatTaxonomiesForEditor, generateSlug } from '../utils';
import { useStore } from '../store';
import { postActions } from '../actions';

const PostEditor = (props) => {
  const { templates } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post, sidebar },
    },
    dispatch,
  ] = useStore();

  const template = templates?.postTypes?.[post?.postTypeID]?.[post?.template];

  const Component = template?.component;

  // The post id is only available during initial load
  const pathname = window.location.pathname.replace(/\/$/, '');

  let postIdBySlug;

  if (sites[siteID]) {
    Object.values(sites[siteID].postTypes).map((o) =>
      Object.values(o.posts).map((p) => {
        const slug = generateSlug(o, p.id, sites?.[siteID]?.frontPage, true);

        if (slug === `${pathname}/`) {
          postIdBySlug = p.id;
        }
      })
    );
  }

  useEffect(() => {
    const loadPost = async (postID) => {
      await postActions.getPost({ siteID, postID }, dispatch, config);
    };

    postIdBySlug && loadPost(postIdBySlug);

    dispatch({
      type: `ADD_EDITOR_SITE`,
      payload: sites[siteID],
    });

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, [postIdBySlug]);

  // Generate query variable i.e. 'wpPage'
  const postTypeQuery =
    post && `wp${post.postTypeID.charAt(0).toUpperCase() + post.postTypeID.slice(1)}`;

  return (
    <>
      {postIdBySlug ? (
        <>
          {site && post ? (
            <PageWrapper template={!!Component && post?.content}>
              {!!Component && post?.content ? (
                <>
                  <Component
                    jamCMS={{ sidebar: !!sidebar }}
                    data={{
                      [postTypeQuery]: {
                        id: post.id,
                        seo: post.seo,
                        title: post.title,
                        createdAt: post.createdAt,
                        featuredImage: post.featuredImage,
                        taxonomies: formatTaxonomiesForEditor(post, site),
                        query: post.query,
                        postTypeID: post.postTypeID,
                        acf: formatFieldsToProps(post.content, site),
                      },
                    }}
                    pageContext={{
                      globalOptions: formatFieldsToProps(site?.globalOptions, site),
                    }}
                  />
                  <EditorSidebar className="jam-cms" templates={templates} />
                </>
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
            </PageWrapper>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <FourOhFour />
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
