import React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@material-ui/core'
import { toast } from 'react-toastify'
import { set } from 'lodash'

// import app components
import Skeleton from 'components/Skeleton'
import Spacer from 'components/Spacer'

import { useStore } from 'store'
import { postActions, siteActions } from 'actions'

const PostSettings = () => {
  const [
    {
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

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
    <Container>
      <Spacer mb={30}>
        <Skeleton done={!!post} height={56}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="post-status">Status</InputLabel>
            <Select
              value={post?.status || ''}
              name={`status`}
              onChange={handleChangeSettings}
              label={`Status`}
              inputProps={{
                id: 'post-status',
              }}
            >
              <MenuItem value={`publish`} children={`Publish`} />
              <MenuItem value={`draft`} children={`Draft`} />
              <MenuItem value={`trash`} children={`Trash`} />
            </Select>
          </FormControl>
        </Skeleton>
      </Spacer>

      <Spacer mb={30}>
        <Skeleton done={!!post} height={56}>
          <TextField
            value={post?.seoTitle || ''}
            name={`seoTitle`}
            onChange={handleChangeSettings}
            label={`SEO Title`}
            variant={`outlined`}
            fullWidth
          />
        </Skeleton>
      </Spacer>

      <Spacer mb={30}>
        <Skeleton done={!!post} height={113}>
          <TextField
            value={post?.seoDescription || ''}
            name={`seoDescription`}
            onChange={handleChangeSettings}
            label={`SEO Description`}
            variant={`outlined`}
            multiline
            rows={4}
            fullWidth
          />
        </Skeleton>
      </Spacer>

      <Button children={`Save`} variant="contained" onClick={handleSavePost} />
    </Container>
  )
}

const Container = styled.div``

export default PostSettings
