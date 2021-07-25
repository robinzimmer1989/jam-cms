import React, { useEffect, useState } from 'react';

// import app components
import Editor from './Editor';
import Loader from '../Loader';

import { auth } from '../../utils';
import { useStore } from '../../store';
import { previewActions } from '../../actions';

const PreviewEditor = (props: any) => {
  const [loading, setLoading] = useState(true);

  const [
    {
      config,
      cmsState: { siteID },
      editorState: { post },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    const loadPost = async () => {
      const previewID = auth.getPreviewID();

      const result = await previewActions.getPostPreview({ siteID, previewID }, dispatch, config);

      if (result) {
        dispatch({ type: 'ADD_POST', payload: { ...result, siteID } });
        dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID } });
      }

      setLoading(false);
    };

    loadPost();

    return () => dispatch({ type: `CLEAR_EDITOR` });
  }, []);

  return <>{loading ? <Loader text="Load Preview" /> : <Editor postID={post?.id} {...props} />}</>;
};

export default PreviewEditor;
