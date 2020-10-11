import React, { useEffect } from 'react'
import { Button, Empty } from 'antd'
import { set } from 'lodash'

// import app components
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import EditorPostTitle from 'components/editor/EditorPostTitle'

import { useStore } from 'store'
import { formActions } from 'actions'

const Form = props => {
  const { formID } = props

  const [
    {
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
    dispatch,
  ] = useStore()

  const form = site?.forms?.[formID]

  console.log(form)

  return (
    <CmsLayout pageTitle="Form" actionBar="editor" rightSidebar={null}>
      <PageWrapper></PageWrapper>
    </CmsLayout>
  )
}

export default Form
