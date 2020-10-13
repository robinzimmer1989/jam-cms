import React, { useEffect } from 'react'
import { Button, Empty } from 'antd'

// import app components
import CmsLayout from 'components/CmsLayout'
import PageWrapper from 'components/PageWrapper'
import FormEditorSidebar from 'components/formEditor/FormEditorSidebar'
import FormFieldsForm from 'components/formEditor/FormFieldsForm'
import FormFlexibleContent from 'components/formEditor/FormFlexibleContent'

import { convertToPropsSchema } from 'utils'
import { useStore } from 'store'
import { formActions } from 'actions'

const Form = props => {
  const { formID } = props

  const [
    {
      cmsState: { sites, siteID },
      editorState: { form },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const loadForm = async () => {
      await formActions.getForm({ site: sites[siteID], id: formID }, dispatch)
    }

    loadForm()

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` })
    }
  }, [formID])

  const handleOpenDialog = () =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Choose a Block',
        component: <FormFieldsForm index={0} />,
        width: 800,
      },
    })

  return (
    <CmsLayout pageTitle="Form" actionBar="editor" rightSidebar={<FormEditorSidebar />}>
      <PageWrapper>
        {form?.content?.length > 0 ? (
          <FormFlexibleContent blocks={convertToPropsSchema(form.content)} />
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
            <Button type="primary" onClick={handleOpenDialog}>
              Add Field
            </Button>
          </Empty>
        )}
      </PageWrapper>
    </CmsLayout>
  )
}

export default Form
