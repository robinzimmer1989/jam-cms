import React, { useEffect } from 'react'
import { Button, Empty } from 'antd'

// import app components
import BlockForm from 'components/postEditor/BlockForm'
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import EditorPostTitle from 'components/postEditor/EditorPostTitle'
import EditorSidebar from 'components/postEditor/EditorSidebar'
import FlexibleContent from 'components/postEditor/FlexibleContent'
import BlockWrapper from 'components/postEditor/BlockWrapper'

import Header from 'components/postBlocks/Header'
import Footer from 'components/postBlocks/Footer'

import { convertToPropsSchema } from 'utils'
import { useStore } from 'store'
import { postActions } from 'actions'

const Editor = props => {
  const { postTypeID, postID } = props

  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const postType = sites[siteID]?.postTypes?.[postTypeID]

  let blocks = []

  // This is a special block to make post references work (such as archive page)
  // The admin field is simply returning an ID and we're replacing it with the actual content
  if (site && post) {
    blocks = post.content.map(block => {
      return {
        ...block,
        fields: block.fields.map(field => {
          if (field.type === 'postSelector' && field?.value) {
            // Filter out draft and trashed posts
            // Possibly change object structure in the future to match with front end props
            const posts = Object.values(site?.postTypes?.[field.value]?.posts || {}).filter(
              post => post.status === 'publish'
            )

            return {
              ...field,
              value: posts,
            }
          }

          return field
        }),
      }
    })
  }

  blocks = convertToPropsSchema(blocks)

  useEffect(() => {
    const loadPost = async () => {
      await postActions.getPost({ site: sites[siteID], postID }, dispatch)
    }

    loadPost()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
  }, [postID])

  const handleOpenDialog = () =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Choose a Block',
        component: <BlockForm index={0} />,
        width: 800,
      },
    })

  return (
    <CmsLayout pageTitle="Editor" actionBar="editor" rightSidebar={<EditorSidebar />}>
      <EditorPostTitle postType={postType} />

      <PageWrapper>
        {post && (
          <>
            {site?.settings?.header && (
              <BlockWrapper index={'header'} onClick={() => dispatch({ type: 'SET_EDITOR_INDEX', payload: 'header' })}>
                <Header {...convertToPropsSchema([site.settings.header])[0].data} />
              </BlockWrapper>
            )}

            {post.content.length > 0 ? (
              <FlexibleContent blocks={blocks} />
            ) : (
              <Empty
                style={{ padding: 60 }}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description=""
                className="reset-font"
              >
                <Button type="primary" onClick={handleOpenDialog}>
                  Add Block
                </Button>
              </Empty>
            )}

            {site?.settings?.footer && (
              <BlockWrapper index={'footer'} onClick={() => dispatch({ type: 'SET_EDITOR_INDEX', payload: 'footer' })}>
                <Footer {...convertToPropsSchema([site.settings.footer])[0].data} />
              </BlockWrapper>
            )}
          </>
        )}
      </PageWrapper>
    </CmsLayout>
  )
}

export default Editor
