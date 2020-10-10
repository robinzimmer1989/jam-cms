import React, { useEffect } from 'react'
import { Button, Empty } from 'antd'
import { set } from 'lodash'

// import app components
import BlockForm from 'components/BlockForm'
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import EditorPostTitle from 'components/editor/EditorPostTitle'
import EditorSidebar from 'components/editor/EditorSidebar'
import convertBlockSchemaToProps from 'components/editor/convertBlockSchemaToProps'
import FlexibleContent from 'components/editor/FlexibleContent'
import BlockWrapper from 'components/editor/BlockWrapper'

import Header from 'components/blocks/Header'
import Footer from 'components/blocks/Footer'

import { useStore } from 'store'
import { postActions } from 'actions'

const Editor = props => {
  const { postTypeID, postID } = props

  const [
    {
      sitesState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const postType = sites[siteID]?.postTypes?.[postTypeID]

  // TODO: Evaluate if menus as separate post types are still necessary
  // Add menu data to all header menus
  const headerData = site && { ...convertBlockSchemaToProps([site.settings.header])[0].data }

  if (site) {
    const headerMenus = site.settings.header.fields.filter(o => o.type === 'menu')
    headerMenus.map(menu => {
      set(headerData, menu.id, site.menus[menu.id]?.content)
    })
  }

  // TODO: Evaluate if menus as separate post types are still necessary
  // Add menu data to all header menus
  const footerData = site && { ...convertBlockSchemaToProps([site.settings.footer])[0].data }

  if (site) {
    const footerMenus = site.settings.footer.fields.filter(o => o.type === 'menu')
    footerMenus.map(menu => {
      set(footerData, menu.id, site.menus[menu.id]?.content)
    })
  }

  useEffect(() => {
    const loadPost = async () => {
      await postActions.getPost({ site: sites[siteID], postID }, dispatch)
    }

    loadPost()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
  }, [postID])

  const handleOpenBlockDialog = () =>
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
              <BlockWrapper
                index={'header'}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'header' })}
              >
                <Header {...headerData} />
              </BlockWrapper>
            )}

            {post.content.length > 0 ? (
              <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
            ) : (
              <Empty
                style={{ padding: 60 }}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description=""
                className="reset-font"
              >
                <Button type="primary" onClick={handleOpenBlockDialog}>
                  Let's do this
                </Button>
              </Empty>
            )}

            {site?.settings?.footer && (
              <BlockWrapper
                index={'footer'}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'footer' })}
              >
                <Footer {...footerData} />
              </BlockWrapper>
            )}
          </>
        )}
      </PageWrapper>
    </CmsLayout>
  )
}

export default Editor
