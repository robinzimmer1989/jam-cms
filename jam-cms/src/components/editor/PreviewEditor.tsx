import React, { useEffect } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Button } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './EditorWrapper' was resolved to '/Users/r... Remove this comment to see the full error message
import EditorWrapper from './EditorWrapper';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Editor' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Editor from './Editor';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Loader' was resolved to '/Users/robinzi... Remove this comment to see the full error message
import Loader from '../Loader';

import { auth } from '../../utils';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
import { previewActions } from '../../actions';

const PreviewEditor = (props: any) => {
  const {
    pageContext: { databaseId: postID },
  } = props;

  const [
    {
      config,
      cmsState: { siteID },
      editorState: { post },
    },
    dispatch,
  ] = useStore();

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

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <EditorWrapper loaded={loaded}>{loaded ? <Editor {...props} /> : <Loader />}</EditorWrapper>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
