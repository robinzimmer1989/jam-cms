import React, { useState } from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Space, Select as AntSelect } from 'antd'
import { toast } from 'react-toastify'
import { set } from 'lodash'

// import app components
import Input from 'components/Input'
import Select from 'components/Select'
import Skeleton from 'components/Skeleton'
import PostTreeSelect from 'components/PostTreeSelect'

import { useStore } from 'store'
import { postActions, siteActions } from 'actions'

const PostSettings = () => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const [loading, setLoading] = useState(false)

  const posts = sites[siteID]?.postTypes?.[post?.postTypeID]?.posts

  // Remove own post for display in the page parent drop down
  const otherPosts = { ...posts }
  post && delete otherPosts[post.id]

  const handleSavePost = async () => {
    setLoading(true)
    await postActions.updatePost(post, dispatch)
    await siteActions.updateSite(site, dispatch)
    setLoading(false)
    toast.success('Updated successfully')
  }

  const handleChangeSettings = e => {
    const nextPost = produce(post, draft => set(draft, `${e.target.name}`, e.target.value))

    dispatch({
      type: `SET_EDITOR_POST`,
      payload: nextPost,
    })
  }

  return (
    <Container>
      <Space direction="vertical" size={20}>
        <Skeleton done={!!post} height={32}>
          <Select
            value={post?.status || ''}
            onChange={value => handleChangeSettings({ target: { name: `status`, value } })}
            label={`Status`}
          >
            <AntSelect.Option value={`publish`} children={`Publish`} />
            <AntSelect.Option value={`draft`} children={`Draft`} />
            <AntSelect.Option value={`trash`} children={`Trash`} />
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
          <Input value={post?.seoTitle || ''} name={`seoTitle`} onChange={handleChangeSettings} label={`SEO Title`} />
        </Skeleton>

        <Skeleton done={!!post} height={98}>
          <Input
            value={post?.seoDescription || ''}
            name={`seoDescription`}
            onChange={handleChangeSettings}
            label={`SEO Description`}
            rows={4}
          />
        </Skeleton>

        <Button children={`Update`} type="primary" onClick={handleSavePost} loading={loading} />
      </Space>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

export default PostSettings
