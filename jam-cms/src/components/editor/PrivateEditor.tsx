import React, { useEffect } from 'react';

// import app components
import Editor from './Editor';
import Loader from '../Loader';

import { RootState, useAppDispatch, useAppSelector, postActions, clearEditor } from '../../redux';

const PrivateEditor = (props: any) => {
  const {
    pageContext: { databaseId: postID },
    defaultComponent,
  } = props;

  const {
    cms: {
      editor: { post },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const loaded = postID && post?.id === postID;

  useEffect(() => {
    postID && postActions.getPost({ id: postID });

    return () => dispatch(clearEditor());
  }, [postID]);

  if (!postID) {
    return defaultComponent;
  }

  return <>{loaded ? <Editor postID={postID} {...props} /> : <Loader text="Load Post" />}</>;
};

export default PrivateEditor;
