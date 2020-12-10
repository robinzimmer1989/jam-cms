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
      const result = await postActions.getPost({ siteID, postID }, dispatch, config);

      if (result) {
        dispatch({
          type: `ADD_EDITOR_SITE`,
          payload: sites[siteID],
        });

        renderTemplateContent(result);
      }
    };

    loadPost();

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, [postID]);

  const renderTemplateContent = (post) => {
    // if post type has a template assigned, then overwrite content in editor store
    // Because we don't wanna loose information in case the user changes the template along the way,
    // We'll loop through the existing fields and populate the template accordingly
    if (postType?.template && postType.template.length > 0) {
      const nextContent = produce(postType.template, (draft) => {
        post.content.map((o, i) => {
          if (postType?.template?.[i]?.id === o.id) {
            o.fields.map((p, j) => {
              set(draft, `${i}.fields.${j}.value`, p.value);
            });
          }
        });
        return draft;
      });

      dispatch({
        type: `ADD_EDITOR_POST`,
        payload: {
          ...post,
          content: nextContent,
        },
      });
    }
  };

  const getFields = () => {
    if (siteComponent) {
      // loop through default blocks and replace value if found
      return blocks?.[site.settings[editorIndex].id].fields.map((o) => {
        const setting = site.settings[editorIndex].fields.find((p) => p?.id === o.id);

        if (setting) {
          return { ...o, value: setting.value };
        } else {
          return o;
        }
      });
    } else if (post && post.content[editorIndex]) {
      // loop through default blocks and replace value if found
      return blocks?.[post.content[editorIndex].id].fields.map((o) => {
        const setting = post.content[editorIndex].fields.find((p) => p?.id === o.id);

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
    let children;

    if (sidebar === 'post-settings') {
      title = 'Settings';
      children = <PostSettings />;
    } else if (post?.content[editorIndex] || siteComponent) {
      title = siteComponent
        ? editorIndex.charAt(0).toUpperCase() + editorIndex.slice(1)
        : Parser(post.content[editorIndex].label || post.content[editorIndex].id);

      children = (
        <BlockEditFields
          fields={getFields()}
          onChangeElement={handleChangeElement}
          onDeleteElement={handleDeleteElement}
          isTemplate={postType?.template && postType.template.length}
          isSiteComponent={!!siteComponent}
        />
      );
    }

    return <EditorSidebar title={title} children={children} />;
  };

  const handleChangeElement = (field, index) => {
    dispatch({ type: `CLOSE_DIALOG` });

    if (siteComponent) {
      const nextSite = produce(site, (draft) => {
        return set(draft, `settings.${editorIndex}.fields.${index}`, field);
      });

      dispatch({
        type: `UPDATE_EDITOR_SITE`,
        payload: nextSite,
      });
    } else {
      const nextPost = produce(post, (draft) => {
        return set(draft, `content.${editorIndex}.fields.${index}`, field);
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
      draft.fields = draft.fields.map((o) => {
        return { ...o, value: o.defaultValue || null };
      });

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
            isTemplate={postType?.template && postType.template.length}
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
