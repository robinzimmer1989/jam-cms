import React, { useEffect } from 'react'
import { PageHeader, Divider, Space } from 'antd'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import FlexibleContent from 'components/FlexibleContent'
import BlockForm from 'components/BlockForm'
import BlockEditFields from 'components/BlockEditFields'
import postBlocks from 'components/postBlocks'
import CollectionSettings from 'components/CollectionSettings'

import { siteActions } from 'actions'
import { useStore } from 'store'
import getRoute from 'routes'

const CollectionEditor = ({ postTypeID }) => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, editorIndex },
    },
    dispatch,
  ] = useStore()

  const postType = site?.postTypes?.[postTypeID]

  useEffect(() => {
    dispatch({ type: `SET_LEFT_SIDEBAR`, payload: false })

    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch)
  }, [])

  const getFields = () => {
    if (postType?.template?.[editorIndex]) {
      return postBlocks[postType.template[editorIndex].name].fields.fields.map(o => {
        const setting = postType.template[editorIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    }
  }

  const getSidebar = () => {
    let sidebar = {
      title: '',
      icon: {
        onClick: null,
        component: null,
      },
      children: null,
    }

    if (postType?.template?.[editorIndex]) {
      sidebar = {
        title: {
          title: postType?.template?.[editorIndex].name,
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
          />
        ),
      }
    } else {
      sidebar = {
        title: { title: 'Settings', onBack: null },
        children: <CollectionSettings postTypeID={postTypeID} />,
      }
    }

    return (
      <>
        <PageHeader {...sidebar.title} style={{ paddingLeft: 20 }} />
        <Divider style={{ margin: 0 }} />
        {sidebar.children}
      </>
    )
  }

  const handleChangeElement = ({ id, type, value }, index) => {
    dispatch({ type: `CLOSE_DIALOG` })

    const nextPostType = produce(postType, draft => {
      return set(draft, `template.${editorIndex}.fields.${index}`, { id, value, type })
    })

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    })
  }

  const handleDeleteElement = () => {
    const nextPostType = produce(postType, draft => {
      draft.template.splice(editorIndex, 1)
      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    })

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null })
  }

  const handleMoveElement = (index, newIndex) => {
    const nextPostType = produce(postType, draft => {
      if (newIndex > -1 && newIndex < draft.template.length) {
        const temp = draft.template[index]
        draft.template[index] = draft.template[newIndex]
        draft.template[newIndex] = temp
      }

      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    })
  }

  const handleSelectElement = (name, index) => {
    const nextPostType = produce(postType, draft => {
      draft.template.splice(index, 0, postBlocks[name].fields)
      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_COLLECTION`,
      payload: nextPostType,
    })

    dispatch({ type: `SET_EDITOR_INDEX`, payload: index })
  }

  const handleOpenDialog = (index = 0) => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Choose a Block',
        component: <BlockForm index={index} onSelect={handleSelectElement} />,
        width: 500,
      },
    })
  }

  return (
    <CmsLayout pageTitle={`${postType?.title} Template`} actionBar={'editor'} rightSidebar={getSidebar()}>
      <Space direction="vertical" size={30}>
        <PageWrapper>
          <FlexibleContent
            allElements={postBlocks}
            renderedElements={postType?.template}
            editableHeader={false}
            editableFooter={false}
            onOpenDialog={handleOpenDialog}
            onMoveElement={handleMoveElement}
          />
        </PageWrapper>
      </Space>
    </CmsLayout>
  )
}

export default CollectionEditor
