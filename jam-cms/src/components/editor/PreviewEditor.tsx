import React, { useEffect } from 'react';

// import app components
import Editor from './Editor';
import Loader from '../Loader';

import { getPreviewID } from '../../utils/auth';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  previewReducer,
  clearEditor,
} from '../../redux';

const PreviewEditor = (props: any) => {
  const {
    cms: {
      editor: { post },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    previewReducer.getPostPreview({ previewID: getPreviewID() });

    return () => dispatch(clearEditor());
  }, []);

  return <>{post ? <Editor postID={post?.id} {...props} /> : <Loader text="Load Preview" />}</>;
};

export default PreviewEditor;
