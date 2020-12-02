import React, { useEffect } from 'react';
import { PageHeader, Divider } from 'antd';
import produce from 'immer';
import { set } from 'lodash';
import { navigate } from '@reach/router';
import Parser from 'html-react-parser';

// import app components
import BlockForm from '../BlockForm';
import BlockEditFields from '../BlockEditFields';
import CmsLayout from '../CmsLayout';
import PageWrapper from '../PageWrapper';
import PostHeader from '../PostHeader';
import FlexibleContent from '../FlexibleContent';
import PostSettings from '../PostSettings';

import { formatBlocks } from '../../utils';
import { useStore } from '../../store';
import { postActions } from '../../actions';
import getRoute from '../../routes';

const PostEditor = (props) => {
  const { postTypeID, postID, theme, blocks } = props;

  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post, editorIndex },
    },
    dispatch,
  ] = useStore();

  const postType = sites[siteID]?.postTypes?.[postTypeID];

  const siteComponent = editorIndex === 'header' || editorIndex === 'footer';

  useEffect(() => {
    const loadPost = async () => {
      const result = await postActions.getPost({ siteID, postID }, dispatch);

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

  useEffect(() => {
    dispatch({ type: `SET_LEFT_SIDEBAR`, payload: false });
  }, []);

  const renderTemplateContent = (post) => {
    // if post type has a template assigned, then overwrite content in editor store
    // Because we don't wanna loose information in case the user changes the template along the way,
    // We'll loop through the existing fields and populate the template accordingly
    if (postType?.template && postType.template.length > 0) {
      const nextContent = produce(postType.template, (draft) => {
        post.content.map((o, i) => {
          if (postType?.template?.[i]?.name === o.name) {
            o.fields.map((p, j) => {
              set(draft, `${i}.fields.${j}.value`, p.value);
            });
          }
        });
        return draft;
      });

      dispatch({
        type: `UPDATE_EDITOR_POST`,
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
      return blocks?.[site.settings[editorIndex].name].fields.fields.map((o) => {
        // TODO: We might have to move to an object structure for fields instead of array.
        // There is a problem when fields get removed and we try to add an array element and then skip something in between.
        // The p?.id should fix it for now.
        const setting = site.settings[editorIndex].fields.find((p) => p?.id === o.id);

        if (setting) {
          return { ...o, value: setting.value };
        } else {
          return o;
        }
      });
    } else if (post && post.content[editorIndex]) {
      // loop through default blocks and replace value if found
      return blocks?.[post.content[editorIndex].name].fields.fields.map((o) => {
        // TODO: We might have to move to an object structure for fields instead of array.
        // There is a problem when fields get removed and we try to add an array element and then skip something in between.
        // The p?.id should fix it for now.
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
    let sidebar = {
      title: '',
      icon: {
        onClick: null,
        component: null,
      },
      children: null,
    };

    if (post?.content[editorIndex] || siteComponent) {
      sidebar = {
        title: {
          title: siteComponent
            ? editorIndex.charAt(0).toUpperCase() + editorIndex.slice(1)
            : Parser(post.content[editorIndex].label || post.content[editorIndex].name),
          onBack: () =>
            dispatch({
              type: 'SET_EDITOR_INDEX',
              payload: null,
            }),
        },
        children: (
          <BlockEditFields
            fields={getFields()}
            onChangeElement={handleChangeElement}
            onDeleteElement={handleDeleteElement}
            isTemplate={postType?.template && postType.template.length}
            isSiteComponent={!!siteComponent}
          />
        ),
      };
    } else {
      sidebar = {
        title: { title: 'Settings', onBack: null },
        children: <PostSettings />,
      };
    }

    return (
      <>
        <PageHeader {...sidebar.title} style={{ paddingLeft: 20 }} />
        <Divider style={{ margin: 0 }} />
        {sidebar.children}
      </>
    );
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

  const handleSelectElement = (name, index) => {
    // Assign the default value
    const block = produce(blocks[name], (draft) => {
      draft.fields.fields = draft.fields.fields.map((o) => {
        return { ...o, value: o.defaultValue || null };
      });

      return draft;
    });

    const nextPost = produce(post, (draft) => {
      draft.content.splice(index, 0, block.fields);
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
    <CmsLayout pageTitle="Editor" mode="editor" rightSidebar={getSidebar()} onBack={handleBack}>
      <PostHeader postType={postType} />

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
    </CmsLayout>
  );
};

export default PostEditor;
