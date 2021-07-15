import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

// import app components
import EditorWrapper from './EditorWrapper';
import Editor from './Editor';
import Loader from '../Loader';

import { auth, getPostID } from '../../utils';
import { useStore } from '../../store';
import { previewActions } from '../../actions';

const PreviewEditor = (props: any) => {
  const { defaultComponent } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { post },
    },
    dispatch,
  ] = useStore();

  const postID = useMemo(() => {
    return getPostID(sites[siteID]);
  }, [window.location.pathname]);

  const previewID = auth.getPreviewID();

  // We need to check if the parentID is equal to the postID
  const loaded = postID && post?.id === postID;

  useEffect(() => {
    const loadPost = async () => {
      if (!postID) {
        return;
      }

      const result = await previewActions.getPostPreview({ siteID, previewID }, dispatch, config);

      if (result) {
        dispatch({ type: 'ADD_POST', payload: { ...result, siteID } });
        dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID } });
      }
    };

    loadPost();

    return () => dispatch({ type: `CLEAR_EDITOR` });
  }, [postID]);

  if (!postID) {
    return defaultComponent;
  }

  return (
    <>
      <EditorWrapper loaded={loaded}>
        {loaded ? <Editor postID={postID} {...props} /> : <Loader text="Load Post" />}
      </EditorWrapper>

      <PreviewBanner children={`Preview`} type="primary" />
    </>
  );
};

const PreviewBanner = styled(Button)`
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 9999;
  transform: rotate(270deg) translate(-50%, 50%);
  transform-origin: left;
`;

export default PreviewEditor;
