import React from 'react'
import { set } from 'lodash'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Space, Collapse } from 'antd'

// import app components
import MenuBuilder from 'components/MenuBuilder'
import MediaLibrary from 'components/MediaLibrary'
import postBlocks from 'components/postBlocks'

import Textarea from 'components/postEditorAdminFields/Textarea'
import ImagePicker from 'components/postEditorAdminFields/ImagePicker'
import Menu from 'components/postEditorAdminFields/Menu'

import { useStore } from 'store'

const BlockEditFields = () => {
  const [
    {
      editorState: { site, post, editorIndex },
    },
    dispatch,
  ] = useStore()

  const siteComponent = editorIndex === 'header' || editorIndex === 'footer'

  // merges default settings and db values
  const getFields = () => {
    if (siteComponent) {
      // loop through default postBlocks and replace value if found
      return postBlocks[site.settings[editorIndex].name].fields.fields.map(o => {
        const setting = site.settings[editorIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    } else if (post && post.content[editorIndex]) {
      // loop through default postBlocks and replace value if found
      return postBlocks[post.content[editorIndex].name].fields.fields.map(o => {
        const setting = post.content[editorIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    }
  }

  const handleChange = (value, id, type, index) => {
    dispatch({ type: `CLOSE_DIALOG` })

    if (siteComponent) {
      const nextSite = produce(site, draft => {
        return set(draft, `settings.${editorIndex}.fields.${index}`, { id, value, type })
      })

      dispatch({
        type: `UPDATE_EDITOR_SITE`,
        payload: nextSite,
      })
    } else {
      const nextPost = produce(post, draft => {
        return set(draft, `content.${editorIndex}.fields.${index}`, { id, value, type })
      })

      dispatch({
        type: `UPDATE_EDITOR_POST`,
        payload: nextPost,
      })
    }
  }

  const handleDeleteBlock = () => {
    const content = [...post.content]
    content.splice(editorIndex, 1)

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: {
        ...post,
        content,
      },
    })

    dispatch({ type: `SET_EDITOR_INDEX`, payload: null })
  }

  const getField = (field, fieldIndex) => {
    let component

    switch (field.type) {
      case 'textarea':
        component = <Textarea {...field} onChange={e => handleChange(e.target.value, field.id, field.type, fieldIndex)} />
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
                      onSelect={({ id, storageKey }) => handleChange({ id, storageKey }, field.id, field.type, fieldIndex)}
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
                    <MenuBuilder index={fieldIndex} {...field} onChange={v => handleChange(v, field.id, field.type, fieldIndex)} />
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

  const fields = getFields()

  return (
    <Space direction="vertical" size={30}>
      <Collapse defaultActiveKey={[0]}>
        {fields && fields.map((field, fieldIndex) => getField(field, fieldIndex))}
      </Collapse>

      <Container>{!siteComponent && <Button onClick={handleDeleteBlock} children={`Delete Block`} danger />}</Container>
    </Space>
  )
}

const Container = styled.div`
  padding: 0 20px;
`

export default BlockEditFields
