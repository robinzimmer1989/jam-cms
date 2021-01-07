import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { Empty, Layout } from 'antd';

// import app components
import PageWrapper from '../PageWrapper';
import EditorHeader from '../EditorHeader';
import EditorSidebar from '../EditorSidebar';
import Loader from '../Loader';
import FourOhFour from '../FourOhFour';

import { formatFieldsToProps } from '../../utils';
import { useStore } from '../../store';
import { postActions } from '../../actions';
import getRoute from '../../routes';

const PostEditor = (props) => {
  const { postID, theme, templates } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { sidebar, site, post },
    },
    dispatch,
  ] = useStore();

  const template =
    templates?.[post?.postTypeID] &&
    templates[post.postTypeID].find((o) => o.id === post?.template);

  const Component = template?.component;

  // The post id is only available during initial load
  const path = window.location.pathname.replace(/\/$/, '');
  const slug = path.substr(path.lastIndexOf('/') + 1);

  let postIdBySlug;

  if (site) {
    Object.values(site.postTypes).map((o) =>
      Object.values(o.posts).map((p) => {
        if (p.slug === slug || (slug === '' && site.frontPage === p.id)) {
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
    <Layout>
      <Layout style={{ marginRight: sidebar ? 320 : 0 }}>
        <Layout.Header>
          <EditorHeader
            postID={postID || postIdBySlug}
            template={!!Component && post?.content}
            title={post?.title}
            onBack={() =>
              navigate(getRoute('collection', { siteID, postTypeID: post?.postTypeID || 'page' }))
            }
            templates={templates}
          />
        </Layout.Header>

        <Layout.Content>
          {postID || postIdBySlug ? (
            <>
              {site && post ? (
                <PageWrapper theme={theme}>
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
                        globalOptions: formatFieldsToProps(site?.settings, site),
                      }}
                    />
                  ) : (
                    <EmptyContainer>
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
        </Layout.Content>
      </Layout>

      {sidebar && (
        <Layout.Sider
          className="sider"
          theme="light"
          width={320}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            right: 0,
          }}
        >
          <EditorSidebar templates={templates} />
        </Layout.Sider>
      )}
    </Layout>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  text-align: center;
`;

export default PostEditor;
