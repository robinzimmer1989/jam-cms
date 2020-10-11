import React from 'react'
import produce from 'immer'
import { set } from 'lodash'
import { Typography, Row } from 'antd'

// import app components
import Skeleton from 'components/Skeleton'

import { formatSlug } from 'utils'
import { useStore } from 'store'

const EditorPostTitle = props => {
  const { postType } = props

  const [
    {
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

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
        {/* <a href={site?.netlifyUrl} target="_blank" rel="noopener"></a> */}
        <Row>
          <Typography children={`${site?.netlifyUrl}${formatSlug(postType?.slug)}`} />
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
