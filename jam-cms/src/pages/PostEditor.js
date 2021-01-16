import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { Empty } from 'antd';

// import app components
import PageWrapper from '../components/PageWrapper';
import EditorHeader from '../components/EditorHeader';
import EditorSidebar from '../components/EditorSidebar';
import Loader from '../components/Loader';
import FourOhFour from '../components/FourOhFour';

import { formatFieldsToProps, generateSlug } from '../utils';
import { useStore } from '../store';
import { postActions } from '../actions';
import getRoute from '../routes';

const PostEditor = (props) => {
  const { templates } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore();

  const template =
    templates?.[post?.postTypeID] &&
    templates[post.postTypeID].find((o) => o?.id === post?.template);

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

  return (
    <>
      <EditorHeader
        className="jam-cms"
        postID={postIdBySlug}
        template={!!Component && post?.content}
        title={post?.title}
        onBack={() =>
          navigate(getRoute('collection', { siteID, postTypeID: post?.postTypeID || 'page' }))
        }
        templates={templates}
      />

      {postIdBySlug ? (
        <>
          {site && post ? (
            <PageWrapper template={!!Component && post?.content}>
              {!!Component && post?.content ? (
                <Component
                  pageContext={{
                    id: post.id,
                    seo: post.seo,
                    title: post.title,
                    createdAt: post.createdAt,
                    featuredImage: post.featuredImage,
                    content: formatFieldsToProps(post.content, site),
                    postTypeID: post.postTypeID,
                    globalOptions: formatFieldsToProps(site?.globalOptions, site),
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
            </PageWrapper>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <FourOhFour />
      )}

      <EditorSidebar className="jam-cms" templates={templates} />
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
