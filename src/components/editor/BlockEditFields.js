import React from 'react'
import { set } from 'lodash'
import styled from 'styled-components'
import produce from 'immer'
import { Button, Space, Collapse } from 'antd'

// import app components
import MenuBuilder from 'components/MenuBuilder'
import MediaLibrary from 'components/MediaLibrary'
import Textarea from 'components/editorFields/Textarea'
import ImagePicker from 'components/editorFields/ImagePicker'
import Menu from 'components/editorFields/Menu'
import blocks from 'components/blocks'

import { useStore } from 'store'

const BlockEditFields = () => {
  const [
    {
      editorState: { site, post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const siteComponent = activeBlockIndex === 'header' || activeBlockIndex === 'footer'

  // merges default settings and db values
  const getFields = () => {
    if (siteComponent) {
      // loop through default blocks and replace value if found
      return blocks[site.settings[activeBlockIndex].name].fields.fields.map(o => {
        const setting = site.settings[activeBlockIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    } else if (post && post.content[activeBlockIndex]) {
      // loop through default blocks and replace value if found
      return blocks[post.content[activeBlockIndex].name].fields.fields.map(o => {
        const setting = post.content[activeBlockIndex].fields.find(p => p.id === o.id)

        if (setting) {
          return { ...o, value: setting.value }
        } else {
          return o
        }
      })
    }
  }

  const handleChange = (value, id, index) => {
    dispatch({ type: `CLOSE_DIALOG` })

    if (siteComponent) {
      const nextSite = produce(site, draft => {
        return set(draft, `settings.${activeBlockIndex}.fields.${index}`, { id, value })
      })

      dispatch({
        type: `SET_EDITOR_SITE`,
        payload: nextSite,
      })
    } else {
      const nextPost = produce(post, draft => {
        return set(draft, `content.${activeBlockIndex}.fields.${index}`, { id, value })
      })

      dispatch({
        type: `SET_EDITOR_POST`,
        payload: nextPost,
      })
    }
  }

  const handleDeleteBlock = () => {
    const content = [...post.content]
    content.splice(activeBlockIndex, 1)

    dispatch({
      type: `SET_EDITOR_POST`,
      payload: {
        ...post,
        content,
      },
    })

    dispatch({ type: `SET_EDITOR_ACTIVE_BLOCK_INDEX`, payload: null })
  }

  const getField = (field, fieldIndex) => {
    let component

    switch (field.type) {
      case `textarea`:
        component = <Textarea {...field} onChange={e => handleChange(e.target.value, field.id, fieldIndex)} />
        break

      case `image`:
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
                      onSelect={({ id, storageKey }) => handleChange({ id, storageKey }, field.id, fieldIndex)}
                    />
                  ),
                  width: 1000,
                },
              })
            }
          />
        )
        break

      case `menu`:
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
                    <MenuBuilder index={fieldIndex} {...field} onChange={v => handleChange(v, field.id, fieldIndex)} />
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
