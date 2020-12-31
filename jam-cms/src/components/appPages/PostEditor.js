import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { Empty } from 'antd';

// import app components
import CmsLayout from '../CmsLayout';
import PageWrapper from '../PageWrapper';
import EditorSidebar from '../EditorSidebar';
import Loader from '../Loader';

import { formatFieldsToProps } from '../../utils';
import { useStore } from '../../store';
import { postActions } from '../../actions';
import getRoute from '../../routes';

const PostEditor = (props) => {
  const { postTypeID, postID, theme, templates } = props;

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
    templates[post.postTypeID].find((o) => o.id === post?.template);

  const Component = template?.component;

  useEffect(() => {
    const loadPost = async () => {
      const result = await postActions.getPost({ siteID, postID }, dispatch, config);

      if (result) {
        dispatch({
          type: `ADD_EDITOR_SITE`,
          payload: sites[siteID],
        });
      }
    };

    loadPost();

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, [postID]);

  const handleBack = () => {
    navigate(getRoute(`collection`, { siteID, postTypeID }));
  };

  return (
    <CmsLayout
      pageTitle={post?.title}
      mode="editor"
      rightSidebar={<EditorSidebar templates={templates} />}
      onBack={handleBack}
      templates={templates}
    >
      {post ? (
        <PageWrapper theme={theme}>
          {!!Component && post?.content ? (
            <Component
              pageContext={{
                content: formatFieldsToProps(post.content, site),
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
    </CmsLayout>
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
