import React, { useEffect } from 'react';
import { Space } from 'antd';
import produce from 'immer';
import { set } from 'lodash';
import { navigate } from '@reach/router';
import Parser from 'html-react-parser';

// import app components
import CmsLayout from '../CmsLayout';
import PageWrapper from '../PageWrapper';
import FlexibleContent from '../FlexibleContent';
import BlockForm from '../BlockForm';
import BlockEditFields from '../BlockEditFields';
import CollectionSettings from '../CollectionSettings';
import EditorSidebar from '../EditorSidebar';

import { formatBlocks } from '../../utils';
import { siteActions } from '../../actions';
import { useStore } from '../../store';
import getRoute from '../../routes';

const CollectionEditor = ({ postTypeID, theme, blocks }) => {
  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, editorIndex, sidebar },
    },
    dispatch,
  ] = useStore();

  const postType = site?.postTypes?.[postTypeID];

  useEffect(() => {
    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch, config);
  }, []);

  const getFields = () => {
    if (postType?.template?.[editorIndex]) {
      return blocks[postType.template[editorIndex].id].fields.map((o) => {
        const setting = postType.template[editorIndex].fields.find((p) => p.id === o.id);

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
      children = <CollectionSettings postTypeID={postTypeID} />;
    } else if (postType?.template?.[editorIndex]) {
      title = Parser(
        postType?.template?.[editorIndex].label || postType?.template?.[editorIndex].id
      );

      children = (
        <BlockEditFields
          fields={getFields()}
          onChangeElement={handleChangeElement}
          onDeleteElement={handleDeleteElement}
        />
      );
    }

    return <EditorSidebar title={title} children={children} />;
  };

  const handleChangeElement = (field, index) => {
    dispatch({ type: `CLOSE_DIALOG` });

    const nextPostType = produce(postType, (draft) => {
      return set(draft, `template.${editorIndex}.fields.${index}`, field);
    });

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    });
  };

  const handleDeleteElement = () => {
    const nextPostType = produce(postType, (draft) => {
      draft.template.splice(editorIndex, 1);
      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    });

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null });
  };

  const handleMoveElement = (index, newIndex) => {
    const nextPostType = produce(postType, (draft) => {
      if (newIndex > -1 && newIndex < draft.template.length) {
        const temp = draft.template[index];
        draft.template[index] = draft.template[newIndex];
        draft.template[newIndex] = temp;
      }

      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    });
  };

  const handleSelectElement = (id, index) => {
    const nextPostType = produce(postType, (draft) => {
      draft.template.splice(index, 0, blocks[id]);
      return draft;
    });

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
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
    navigate(getRoute(`settings-collections`, { siteID }));
  };

  return (
    <CmsLayout
      pageTitle={`${postType?.title} Template`}
      mode={'editor'}
      rightSidebar={getSidebar()}
      onBack={handleBack}
    >
      <Space direction="vertical" size={30}>
        <PageWrapper theme={theme}>
          <FlexibleContent
            blocks={blocks}
            renderedBlocks={formatBlocks(postType?.template, site)}
            editableHeader={false}
            editableFooter={false}
            onOpenDialog={handleOpenDialog}
            onMoveElement={handleMoveElement}
          />
        </PageWrapper>
      </Space>
    </CmsLayout>
  );
};

export default CollectionEditor;
