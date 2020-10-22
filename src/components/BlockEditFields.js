import React from 'react'
import styled from 'styled-components'
import { Button, Space } from 'antd'

// import app components
import MenuBuilder from 'components/MenuBuilder'
import MediaLibrary from 'components/MediaLibrary'
import Caption from 'components/Caption'

// Admin fields
import CollectionSelector from 'components/postEditorAdminFields/CollectionSelector'
import FormSelector from 'components/postEditorAdminFields/FormSelector'
import Text from 'components/postEditorAdminFields/Text'
import Wysiwyg from 'components/postEditorAdminFields/Wysiwyg'
import ImagePicker from 'components/postEditorAdminFields/ImagePicker'
import Menu from 'components/postEditorAdminFields/Menu'
import Repeater from 'components/postEditorAdminFields/Repeater'
import LinkSelector from 'components/postEditorAdminFields/LinkSelector'
import Select from 'components/postEditorAdminFields/Select'
import Number from 'components/postEditorAdminFields/Number'
import Settings from 'components/postEditorAdminFields/Settings'

import { useStore } from 'store'

export const getField = ({ field, index, site, onChangeElement, dispatch }) => {
  let component

  switch (field.type) {
    case 'text':
      component = (
        <Text
          {...field}
          onChange={e => onChangeElement({ id: field.id, type: field.type, value: e.target.value }, index)}
        />
      )
      break

    case 'wysiwyg':
      component = (
        <Wysiwyg
          {...field}
          onChange={editorState => onChangeElement({ id: field.id, type: field.type, value: editorState }, index)}
        />
      )
      break

    case 'number':
      component = (
        <Number
          {...field}
          onChange={number => onChangeElement({ id: field.id, type: field.type, value: number }, index)}
        />
      )
      break

    case 'link':
      component = (
        <LinkSelector
          {...field}
          onChange={({ title, url, target }) =>
            onChangeElement({ id: field.id, type: field.type, value: { title, url, target } }, index)
          }
        />
      )
      break

    case 'select':
      component = (
        <Select
          {...field}
          onChange={optionValue => onChangeElement({ id: field.id, type: field.type, value: optionValue }, index)}
        />
      )
      break

    case 'settings':
      component = (
        <Settings
          {...field}
          onChange={newValue => onChangeElement({ id: field.id, type: field.type, value: newValue }, index)}
        />
      )
      break

    case 'collectionSelector':
      component = (
        <CollectionSelector
          {...field}
          site={site}
          onSelect={postTypeID => onChangeElement({ id: field.id, type: field.type, value: postTypeID }, index)}
        />
      )
      break

    case 'formSelector':
      component = (
        <FormSelector
          {...field}
          site={site}
          onSelect={formID => onChangeElement({ id: field.id, type: field.type, value: formID }, index)}
        />
      )
      break

    case 'repeater':
      component = (
        <Repeater
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={items => onChangeElement({ id: field.id, type: field.type, value: items }, index)}
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
                      onChangeElement({ id: field.id, type: field.type, value: { id, storageKey } }, index)
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
                    index={index}
                    {...field}
                    onChange={menu => onChangeElement({ id: field.id, type: field.type, value: menu }, index)}
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
    <div key={index}>
      <Caption children={field.label} />
      {component}
    </div>
  )
}

const BlockEditFields = props => {
  const { fields, isTemplate, isSiteComponent, onDeleteElement, onChangeElement } = props

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  return (
    <Container>
      <Space direction="vertical" size={30}>
        {fields && fields.map((field, index) => getField({ field, index, site, onChangeElement, dispatch }))}
        {!isTemplate && !isSiteComponent && <Button onClick={onDeleteElement} children={`Delete Block`} danger />}
      </Space>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

export default BlockEditFields
