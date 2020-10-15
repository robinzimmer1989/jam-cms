import React from 'react'
import styled from 'styled-components'
import { Button, Space, Collapse } from 'antd'

// import app components
import MenuBuilder from 'components/MenuBuilder'
import MediaLibrary from 'components/MediaLibrary'

import PostSelector from 'components/postEditorAdminFields/PostSelector'
import Textarea from 'components/postEditorAdminFields/Textarea'
import ImagePicker from 'components/postEditorAdminFields/ImagePicker'
import Menu from 'components/postEditorAdminFields/Menu'

import { useStore } from 'store'

const BlockEditFields = props => {
  const { fields, onDeleteElement, onChangeElement } = props

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const getField = (field, fieldIndex) => {
    let component

    switch (field.type) {
      case 'textarea':
        component = (
          <Textarea {...field} onChange={e => onChangeElement(e.target.value, field.id, field.type, fieldIndex)} />
        )
        break

      case 'postSelector':
        component = (
          <PostSelector
            site={site}
            {...field}
            onSelect={postTypeID => onChangeElement(postTypeID, field.id, field.type, fieldIndex)}
          />
        )
        break

      case 'image':
        component = (
          <ImagePicker
            {...field}
            onClick={() =>
              dispatch({
                type: `SET_DIALOG`,
                payload: {
                  open: true,
                  component: (
                    <MediaLibrary
                      onSelect={({ id, storageKey }) =>
                        onChangeElement({ id, storageKey }, field.id, field.type, fieldIndex)
                      }
                    />
                  ),
                  width: 1000,
                },
              })
            }
          />
        )
        break

      case 'menu':
        component = (
          <Menu
            {...field}
            onClick={() =>
              dispatch({
                type: `SET_DIALOG`,
                payload: {
                  open: true,
                  title: 'Menu',
                  component: (
                    <MenuBuilder
                      index={fieldIndex}
                      {...field}
                      onChange={v => onChangeElement(v, field.id, field.type, fieldIndex)}
                    />
                  ),
                  width: 1000,
                },
              })
            }
          />
        )
        break

      default:
    }

    return (
      <Collapse.Panel header={field.label} direction="vertical" key={fieldIndex}>
        {component}
      </Collapse.Panel>
    )
  }

  return (
    <Space direction="vertical" size={30}>
      <Collapse defaultActiveKey={[0]}>
        {fields && fields.map((field, fieldIndex) => getField(field, fieldIndex))}
      </Collapse>

      <Container>
        <Button onClick={onDeleteElement} children={`Delete Block`} danger />
      </Container>
    </Space>
  )
}

const Container = styled.div`
  padding: 0 20px;
`

export default BlockEditFields
