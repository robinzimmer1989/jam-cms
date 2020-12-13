import React, { useEffect } from 'react';
import produce from 'immer';
import { set } from 'lodash';
import { navigate } from '@reach/router';
import Parser from 'html-react-parser';

// import app components
import BlockForm from '../BlockForm';
import BlockEditFields from '../BlockEditFields';
import CmsLayout from '../CmsLayout';
import PageWrapper from '../PageWrapper';
import EditorSidebar from '../EditorSidebar';
import FlexibleContent from '../FlexibleContent';
import PostSettings from '../PostSettings';
import Loader from '../Loader';

import { formatBlocks } from '../../utils';
import { useStore } from '../../store';
import { postActions } from '../../actions';
import getRoute from '../../routes';

const PostEditor = (props) => {
  const { postTypeID, postID, theme, blocks } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post, editorIndex, sidebar },
    },
    dispatch,
  ] = useStore();

  const postType = sites[siteID]?.postTypes?.[postTypeID];

  const siteComponent = editorIndex === 'header' || editorIndex === 'footer';

  useEffect(() => {
    const loadPost = async () => {
      const result = await postActions.getPost({ siteID, postID, blocks }, dispatch, config);

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

  const getFields = () => {
    if (siteComponent) {
      // Instead of looping through the db entrues, we loop through the content blocks and then assign the value
      return blocks?.[site.settings[editorIndex].id].fields.map((o) => {
        const setting = site.settings[editorIndex].fields[o.id];

        if (setting) {
          return { ...o, value: setting.value };
        } else {
          return o;
        }
      });
    } else if (post && post.content[editorIndex]) {
      // Instead of looping through the db entrues, we loop through the content blocks and then assign the value
      return blocks?.[post.content[editorIndex].id].fields.map((o) => {
        const setting = post.content[editorIndex].fields[o.id];

        if (setting) {
          return { ...o, value: setting.value };
        } else {
          return o;
        }
      });
    }
  };

  const getSidebar = () => {
    let title;
    let content;

    if (sidebar === 'post-settings') {
      title = 'Settings';
      content = <PostSettings />;
    } else if (post?.content[editorIndex]) {
      title = Parser(post.content[editorIndex].label || post.content[editorIndex].id);

      content = (
        <BlockEditFields
          fields={getFields()}
          onChangeElement={handleChangeElement}
          onDeleteElement={handleDeleteElement}
          isSiteComponent={false}
        />
      );
    } else if (siteComponent) {
      title = Parser(site.settings[editorIndex].label || site.settings[editorIndex].id);

      content = (
        <BlockEditFields
          fields={getFields()}
          onChangeElement={handleChangeElement}
          onDeleteElement={handleDeleteElement}
          isSiteComponent={true}
        />
      );
    }

    return <EditorSidebar title={title} children={content} />;
  };
  console.log(post);
  const handleChangeElement = (field) => {
    console.log(field);
    console.log(editorIndex);

    dispatch({ type: `CLOSE_DIALOG` });

    if (siteComponent) {
      const nextSite = produce(site, (draft) => {
        return set(draft, `settings.${editorIndex}.fields.${field.id}`, field);
      });

      dispatch({
        type: `UPDATE_EDITOR_SITE`,
        payload: nextSite,
      });
    } else {
      const nextPost = produce(post, (draft) => {
        return set(draft, `content.${editorIndex}.fields.${field.id}`, field);
      });

      dispatch({
        type: `UPDATE_EDITOR_POST`,
        payload: nextPost,
      });
    }
  };

  const handleDeleteElement = () => {
    const nextPost = produce(post, (draft) => {
      draft.content.splice(editorIndex, 1);
      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    });

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null });

    dispatch({ type: `SET_EDITOR_SIDEBAR`, payload: false });
  };

  const handleMoveElement = (index, newIndex) => {
    const nextPost = produce(post, (draft) => {
      if (newIndex > -1 && newIndex < draft.content.length) {
        const temp = draft.content[index];
        draft.content[index] = draft.content[newIndex];
        draft.content[newIndex] = temp;
      }

      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    });
  };

  const handleSelectElement = (id, index) => {
    // Assign the default value
    const block = produce(blocks[id], (draft) => {
      const obj = {};
      draft.fields.map((o) => (obj[o.id] = { ...o, value: o.defaultValue || null }));
      draft.fields = obj;
      return draft;
    });

    const nextPost = produce(post, (draft) => {
      draft.content.splice(index, 0, block);
      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    });

    dispatch({ type: `SET_EDITOR_INDEX`, payload: index });
  };

  const handleOpenDialog = (index = 0) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Choose a Block',
        component: <BlockForm index={index} onSelect={handleSelectElement} blocks={blocks} />,
        width: 500,
      },
    });
  };

  const handleBack = () => {
    navigate(getRoute(`collection`, { siteID, postTypeID }));
  };

  return (
    <CmsLayout
      pageTitle={post?.title}
      mode="editor"
      rightSidebar={getSidebar()}
      onBack={handleBack}
    >
      {post ? (
        <PageWrapper theme={theme}>
          <FlexibleContent
            blocks={blocks}
            renderedBlocks={formatBlocks(post?.content, site)}
            editableHeader={true}
            editableFooter={true}
            onOpenDialog={handleOpenDialog}
            onMoveElement={handleMoveElement}
          />
        </PageWrapper>
      ) : (
        <Loader />
      )}
    </CmsLayout>
  );
};

export default PostEditor;
