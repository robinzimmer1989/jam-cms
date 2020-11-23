import React, { useState } from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Space, notification } from 'antd'
import { set } from 'lodash'

// import app components
import Input from '../Input'
import Skeleton from '../Skeleton'

import { useStore } from '../../store'
import { formActions } from '../../actions'

const FormSettings = () => {
  const [
    {
      editorState: { form },
    },
    dispatch,
  ] = useStore()

  const [loading, setLoading] = useState(false)

  const handleUpdateForm = async () => {
    setLoading(true)
    await formActions.updateForm(form, dispatch)
    setLoading(false)

    notification.success({
      message: 'Success',
      description: 'Updated successfully',
      placement: 'bottomRight',
    })
  }

  const handleChangeSettings = (e) => {
    const nextForm = produce(form, (draft) => set(draft, `${e.target.name}`, e.target.value))

    dispatch({
      type: `UPDATE_EDITOR_FORM`,
      payload: nextForm,
    })
  }

  return (
    <Container>
      <Space direction="vertical" size={20}>
        <Skeleton done={!!form} height={32}>
          <Input value={form?.title || ''} name={`title`} onChange={handleChangeSettings} label={`Title`} />
        </Skeleton>

        <Button children={`Update`} type="primary" onClick={handleUpdateForm} loading={loading} />
      </Space>
    </Container>
  )
}

const Container = styled.div`
  padding: 15px;
`

export default FormSettings
