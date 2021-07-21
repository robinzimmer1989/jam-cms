import React, { useEffect } from 'react';

// import app components
import EditorWrapper from './EditorWrapper';
import Editor from './Editor';
import Loader from '../Loader';

import { useStore } from '../../store';
import { postActions } from '../../actions';

const PrivateEditor = (props: any) => {
  const {
    pageContext: { databaseId: postID },
    defaultComponent,
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

  if (!postID) {
    return defaultComponent;
  }

  return (
    <EditorWrapper loaded={loaded}>
      {loaded ? <Editor postID={postID} {...props} /> : <Loader text="Load Post" />}
    </EditorWrapper>
  );
};

export default PrivateEditor;
