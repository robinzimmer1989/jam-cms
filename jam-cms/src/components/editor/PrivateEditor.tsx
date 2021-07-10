import React, { useEffect } from 'react';

// import app components
import EditorWrapper from './EditorWrapper';
import Editor from './Editor';
import Loader from '../Loader';

import { useStore } from '../../store';
import { postActions } from '../../actions';

const PrivateEditor = (props) => {
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

  const loaded = postID && post?.id === postID;

  useEffect(() => {
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

    loadPost();

    return () => dispatch({ type: `CLEAR_EDITOR` });
  }, [postID]);

  return (
    <EditorWrapper loaded={loaded}>{loaded ? <Editor {...props} /> : <Loader />}</EditorWrapper>
  );
};

export default PrivateEditor;