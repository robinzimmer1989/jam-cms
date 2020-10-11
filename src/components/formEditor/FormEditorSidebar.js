import React from 'react'
import { PageHeader, Divider } from 'antd'

// import app components
import FormSettings from 'components/formEditor/FormSettings'
import FormEditFields from 'components/formEditor/FormEditFields'
import { useStore } from 'store'

const FormEditorSidebar = () => {
  const [
    {
      editorState: { form, editorIndex },
    },
    dispatch,
  ] = useStore()

  let settings = {
    title: '',
    icon: {
      onClick: null,
      component: null,
    },
    children: null,
  }

  if (form?.content?.[editorIndex]) {
    settings = {
      title: {
        title: form.content[editorIndex].name,
        onBack: () =>
          dispatch({
            type: 'SET_EDITOR_INDEX',
            payload: null,
          }),
      },
      children: <FormEditFields />,
    }
  } else {
    settings = {
      title: { title: 'Settings', onBack: null },
      children: <FormSettings />,
    }
  }

  return (
    <>
      <PageHeader {...settings.title} style={{ paddingLeft: 20 }} />
      <Divider style={{ margin: 0 }} />
      {settings.children}
    </>
  )
}

export default FormEditorSidebar
