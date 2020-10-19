import React, { useEffect } from 'react'
import { PageHeader, Divider } from 'antd'
import produce from 'immer'
import { set } from 'lodash'

// import app components
import BlockForm from 'components/BlockForm'
import BlockEditFields from 'components/BlockEditFields'
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import PostHeader from 'components/PostHeader'
import FlexibleContent from 'components/FlexibleContent'
import PostSettings from 'components/PostSettings'
import postBlocks from 'components/postBlocks'

import { useStore } from 'store'
import { postActions } from 'actions'

const PostEditor = props => {
  const { postTypeID, postID } = props

  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post, editorIndex },
    },
    dispatch,
  ] = useStore()

  const postType = sites[siteID]?.postTypes?.[postTypeID]

  const siteComponent = editorIndex === 'header' || editorIndex === 'footer'

  useEffect(() => {
    const loadPost = async () => {
      const result = await postActions.getPost({ site: sites[siteID], postID }, dispatch)

      if (result?.data?.getPost) {
        renderTemplateContent(result.data.getPost)
      }
    }

    loadPost()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
  }, [postID])

  const renderTemplateContent = post => {
    // if post type has a template assigned, then overwrite content in editor store
    // Because we don't wanna loose information in case the user changes the template along the way,
    // We'll loop through the existing fields and populate the template accordingly
    if (postType?.template && postType.template > 0) {
      const content = [...postType.template]

      const nextContent = produce(content, draft => {
        post.content.map((o, i) => {
          if (postType?.template?.[i]?.name === o.name) {
            o.fields.map((p, j) => {
              set(draft, `${i}.fields.${j}.value`, p.value)
            })
          }
        })
        return draft
      })

      dispatch({
        type: `UPDATE_EDITOR_POST`,
        payload: {
          ...post,
          content: nextContent,
        },
      })
    }
  }

  const getFields = () => {
    if (siteComponent) {
      // loop through default postBlocks and replace value if found
      return postBlocks[site.settings[editorIndex].name].fields.fields.map(o => {
        const setting = site.settings[editorIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    } else if (post && post.content[editorIndex]) {
      // loop through default postBlocks and replace value if found
      return postBlocks[post.content[editorIndex].name].fields.fields.map(o => {
        const setting = post.content[editorIndex].fields.find(p => p.id === o.id)

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

    if (post?.content[editorIndex] || siteComponent) {
      sidebar = {
        title: {
          title: siteComponent
            ? editorIndex.charAt(0).toUpperCase() + editorIndex.slice(1)
            : post.content[editorIndex].name,
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
        children: <PostSettings />,
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

    if (siteComponent) {
      const nextSite = produce(site, draft => {
        return set(draft, `settings.${editorIndex}.fields.${index}`, { id, type, value })
      })

      dispatch({
        type: `UPDATE_EDITOR_SITE`,
        payload: nextSite,
      })
    } else {
      const nextPost = produce(post, draft => {
        return set(draft, `content.${editorIndex}.fields.${index}`, { id, type, value })
      })

      dispatch({
        type: `UPDATE_EDITOR_POST`,
        payload: nextPost,
      })
    }
  }

  const handleDeleteElement = () => {
    const nextPost = produce(post, draft => {
      draft.content.splice(editorIndex, 1)
      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    })

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null })
  }

  const handleMoveElement = (index, newIndex) => {
    const nextPost = produce(post, draft => {
      if (newIndex > -1 && newIndex < draft.content.length) {
        const temp = draft.content[index]
        draft.content[index] = draft.content[newIndex]
        draft.content[newIndex] = temp
      }

      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    })
  }

  const handleSelectElement = (name, index) => {
    const nextPost = produce(post, draft => {
      draft.content.splice(index, 0, postBlocks[name].fields)
      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    })
  }

  const handleOpenDialog = (index = 0) =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Choose a Block',
        component: <BlockForm index={index} onSelect={handleSelectElement} />,
        width: 500,
      },
    })

  return (
    <CmsLayout pageTitle="Editor" actionBar="editor" rightSidebar={getSidebar()}>
      <PostHeader postType={postType} />

      <PageWrapper>
        <FlexibleContent
          allElements={postBlocks}
          renderedElements={post?.content}
          editableHeader={true}
          editableFooter={true}
          isTemplate={postType?.template && postType.template.length}
          onOpenDialog={handleOpenDialog}
          onMoveElement={handleMoveElement}
        />
      </PageWrapper>
    </CmsLayout>
  )
}

export default PostEditor
