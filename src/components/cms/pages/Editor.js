import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Button, Tooltip } from 'antd'
import { FullscreenExitOutlined } from '@ant-design/icons'
import { set } from 'lodash'

// import app components
import BlockForm from '../forms/BlockForm'
import FlexibleContent from '../editor/FlexibleContent'
import BlockWrapper from '../editor/BlockWrapper'
import EditorLayout from '../editor/EditorLayout'
import EditorPostTitle from '../editor/EditorPostTitle'
import EditorSidebar from '../editor/EditorSidebar'
import Header from '../editor/blocks/Header'
import Footer from '../editor/blocks/Footer'
import convertBlockSchemaToProps from '../editor/convertBlockSchemaToProps'

import getRoute from 'routes'
import { useStore } from 'store'
import { postActions } from 'actions'

const Editor = props => {
  const { postTypeID, postID } = props

  const [
    {
      sitesState: { sites, siteID },
      editorState: { site, post, viewport },
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
    <EditorLayout sidebar={<EditorSidebar />} backLink={getRoute(`collection`, { siteID, postTypeID })}>
      <EditorPostTitle postType={postType} />

      {viewport === `fullscreen` && (
        <Tooltip key={`view-fullscreen`} title={`Exit Fullscreen`} placement="left">
          <FullScreenExitButton>
            <Button
              onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: `desktop` })}
              icon={<FullscreenExitOutlined />}
              shape="circle"
              type="primary"
              size="large"
            />
          </FullScreenExitButton>
        </Tooltip>
      )}

      <Page viewport={viewport}>
        {post && (
          <>
            {site?.settings?.header && (
              <BlockWrapper
                index={'header'}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'header' })}
                hideAddButtonTop
              >
                <Header {...headerData} />
              </BlockWrapper>
            )}

            {post.content.length > 0 ? (
              <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
            ) : (
              <AddFirstBlock onClick={handleOpenBlockDialog} children={`Add Block`} />
            )}

            {site?.settings?.footer && (
              <BlockWrapper
                index={'footer'}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'footer' })}
                hideAddButtonTop
              >
                <Footer {...footerData} />
              </BlockWrapper>
            )}
          </>
        )}
      </Page>
    </EditorLayout>
  )
}

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;
  min-height: 360px;
  margin-bottom: 40px;

  ${({ viewport }) =>
    viewport === `fullscreen` &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      overflow: auto;
    `}
`

const FullScreenExitButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 25;
`

const AddFirstBlock = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dotted #ccc;
  cursor: pointer;
`

export default Editor
