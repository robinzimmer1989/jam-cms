import React, { useEffect } from 'react'
import produce from 'immer'
import styled from 'styled-components'
import { set } from 'lodash'
import { Fab } from '@material-ui/core'
import EditIcon from 'react-ionicons/lib/IosBrushOutline'

// import app components
import AddBlock from '../forms/AddBlock'
import AddPost from '../forms/AddPost'
import FlexibleContent from './FlexibleContent'
import Layout from './Layout'
import Header from './blocks/Header'
import Skeleton from 'components/Skeleton'
import Spacer from 'components/Spacer'
import convertBlockSchemaToProps from './convertBlockSchemaToProps'

import { colors } from 'theme'
import { useStore } from 'store'
import { postActions } from 'actions'

const Editor = props => {
  const { postID } = props

  const [
    {
      postState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const loadPost = async () => {
      await postActions.getPost({ site: sites[siteID], postID }, dispatch)
    }

    loadPost()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
  }, [postID])

  const handleChangeTitleSlug = (title, slug) => {
    const nextPost = produce(post, draft => {
      set(draft, `title`, title)
      set(draft, `slug`, slug)
    })

    dispatch({
      type: `SET_EDITOR_POST`,
      payload: nextPost,
    })
  }

  const handleOpenUpdatePostForm = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        component: <AddPost title={post.title} slug={post.slug} onSubmit={handleChangeTitleSlug} />,
        width: 'xs',
      },
    })
  }

  const handleOpenBlockDialog = () =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        component: <AddBlock index={0} />,
        width: 'xs',
      },
    })

  return (
    <Layout>
      <PageHeader>
        <Spacer mb={10}>
          <Skeleton done={!!post} width={240} height={35}>
            <HeadlineContainer>
              <Headline children={post?.title} />
              <EditButton size="small" className={`icon icon-add`} onClick={handleOpenUpdatePostForm}>
                <EditIcon />
              </EditButton>
            </HeadlineContainer>
          </Skeleton>
        </Spacer>
        <Skeleton done={!!site && !!post} width={`80%`} height={19}>
          <Slug href={site?.netlifyUrl} target="_blank" rel="noopener" children={`${site?.netlifyUrl}${post?.slug}`} />
        </Skeleton>
      </PageHeader>

      <Page>
        {post && (
          <>
            {site?.settings?.header && (
              <Header
                {...convertBlockSchemaToProps([site.settings.header])[0].data}
                onClick={() => dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: 'header' })}
              />
            )}

            {post.content.length > 0 ? (
              <FlexibleContent blocks={convertBlockSchemaToProps(post.content)} />
            ) : (
              <AddFirstBlock onClick={handleOpenBlockDialog} children={`Add Block`} />
            )}
          </>
        )}
      </Page>
    </Layout>
  )
}

const PageHeader = styled.div`
  padding: 30px 0;
`

const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Headline = styled.h1`
  display: inline-block;
  font-size: 32px;
  margin-right: 20px;
`

const EditButton = styled(Fab)``

const Slug = styled.a`
  color: ${colors.text.light};
`

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;
  margin-bottom: 40px;
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
