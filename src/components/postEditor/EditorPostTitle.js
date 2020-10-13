import React from 'react'
import produce from 'immer'
import { set } from 'lodash'
import { Typography, Row } from 'antd'

// import app components
import Skeleton from 'components/Skeleton'

import { formatSlug, generateSlug } from 'utils'
import { useStore } from 'store'

const EditorPostTitle = props => {
  const { postType } = props

  const [
    {
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  // Generate slug, but trim actually post slug (after last slash), because this becomes an edit field
  let slug = generateSlug(postType, post?.id)
  slug = slug.substr(0, slug.lastIndexOf('/'))

  const handleChange = (name, value) => {
    const nextPost = produce(post, draft => set(draft, name, value))

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    })
  }

  return (
    <>
      <Skeleton done={!!post} width={240} height={35}>
        <Typography.Paragraph
          strong
          children={post?.title}
          editable={{ onChange: value => handleChange('title', value) }}
        />
      </Skeleton>

      <Skeleton done={!!site && !!post} width={`80%`} height={19}>
        <Row>
          <Typography children={slug} />
          <Typography.Paragraph
            children={post?.slug}
            editable={{ onChange: value => handleChange('slug', formatSlug(value)) }}
          />
        </Row>
      </Skeleton>
    </>
  )
}

export default EditorPostTitle
