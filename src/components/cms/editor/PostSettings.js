import React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { Input, Button, Space, Select, Divider } from 'antd'
import { toast } from 'react-toastify'
import { set } from 'lodash'

// import app components
import Skeleton from 'components/Skeleton'
import PostTreeSelect from '../PostTreeSelect'

import { useStore } from 'store'
import { postActions, siteActions } from 'actions'

const PostSettings = () => {
  const [
    {
      postState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const posts = sites[siteID]?.postTypes?.[post?.postTypeID]?.posts

  // Remove own post for display in the page parent drop down
  const otherPosts = { ...posts }
  post && delete otherPosts[post.id]

  const handleSavePost = async () => {
    await postActions.updatePost(post, dispatch)
    await siteActions.updateSite(site, dispatch)

    toast.success('Saved successfully')
  }

  const handleChangeSettings = e => {
    const nextPost = produce(post, draft => set(draft, `${e.target.name}`, e.target.value))

    dispatch({
      type: `SET_EDITOR_POST`,
      payload: nextPost,
    })
  }

  return (
    <>
      <StyledDivider />
      <Content>
        <Space direction="vertical" size={20}>
          <Skeleton done={!!post} height={32}>
            <Select
              value={post?.status || ''}
              onChange={value => handleChangeSettings({ target: { name: `status`, value } })}
            >
              <Select.Option value={`publish`} children={`Publish`} />
              <Select.Option value={`draft`} children={`Draft`} />
              <Select.Option value={`trash`} children={`Trash`} />
            </Select>
          </Skeleton>

          <Skeleton done={!!post} height={32}>
            <PostTreeSelect
              items={otherPosts}
              value={post?.parentID}
              onChange={value => handleChangeSettings({ target: { name: `parentID`, value } })}
            />
          </Skeleton>

          <Skeleton done={!!post} height={32}>
            <Input
              value={post?.seoTitle || ''}
              name={`seoTitle`}
              onChange={handleChangeSettings}
              placeholder={`SEO Title`}
            />
          </Skeleton>

          <Skeleton done={!!post} height={98}>
            <Input.TextArea
              value={post?.seoDescription || ''}
              name={`seoDescription`}
              onChange={handleChangeSettings}
              placeholder={`SEO Description`}
              rows={4}
            />
          </Skeleton>

          <Button children={`Update`} type="primary" onClick={handleSavePost} />
        </Space>
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 20px;
`

const StyledDivider = styled(Divider)`
  margin: 0;
`

export default PostSettings
