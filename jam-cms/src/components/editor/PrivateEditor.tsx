import React, { useEffect } from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './EditorWrapper' was resolved to '/Users/r... Remove this comment to see the full error message
import EditorWrapper from './EditorWrapper';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Editor' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Editor from './Editor';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Loader' was resolved to '/Users/robinzi... Remove this comment to see the full error message
import Loader from '../Loader';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
import { postActions } from '../../actions';

const PrivateEditor = (props: any) => {
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <EditorWrapper loaded={loaded}>{loaded ? <Editor {...props} /> : <Loader />}</EditorWrapper>
  );
};

export default PrivateEditor;
