import React from 'react'
import { set, unionBy } from 'lodash'
import produce from 'immer'
import { Button, Space, Collapse } from 'antd'

// import app components
import MenuBuilder from './MenuBuilder'
import MediaLibrary from '../media/MediaLibrary'
import Textarea from './fields/Textarea'
import ImagePicker from './fields/ImagePicker'
import Menu from './fields/Menu'
import blocks from './blocks'

import { useStore } from 'store'

const BlockEditFields = () => {
  const [
    {
      editorState: { site, post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const siteComponent = activeBlockIndex === 'header' || activeBlockIndex === 'footer'

  const getFields = () => {
    // Because fields can change in the future, we have to combine the default settings
    // of each block with the saved settings from the db to make the fields appear in the sidebar
    if (siteComponent) {
      return unionBy(
        site.settings[activeBlockIndex].fields,
        blocks[site.settings[activeBlockIndex].name].fields.fields,
        'id'
      )
    } else if (post && post.content[activeBlockIndex]) {
      return unionBy(
        post.content[activeBlockIndex].fields,
        blocks[post.content[activeBlockIndex].name].fields.fields,
        'id'
      )
    }
  }

  const handleChange = (value, id) => {
    // Because fields can change in the future, we have to combine the default settings
    // of each block with the saved settings from the db to make the fields appear in the post/site content.
    // We can't just pass in the field index, because the order might have changed after the merge.

    dispatch({ type: `CLOSE_DIALOG` })

    let index

    if (siteComponent) {
      const nextSite = produce(site, draft => {
        set(
          draft,
          `settings.${activeBlockIndex}.fields`,
          unionBy(
            draft.settings[activeBlockIndex].fields,
            blocks[draft.settings[activeBlockIndex].name].fields.fields,
            'id'
          )
        )

        index = draft.settings[activeBlockIndex].fields.findIndex(o => o.id === id)
        return set(draft, `settings.${activeBlockIndex}.fields.${index}.value`, value)
      })

      dispatch({
        type: `SET_EDITOR_SITE`,
        payload: nextSite,
      })
    } else {
      const nextPost = produce(post, draft => {
        set(
          draft,
          `content.${activeBlockIndex}.fields`,
          unionBy(
            draft.content[activeBlockIndex].fields,
            blocks[draft.content[activeBlockIndex].name].fields.fields,
            'id'
          )
        )

        index = draft.content[activeBlockIndex].fields.findIndex(o => o.id === id)
        return set(draft, `content.${activeBlockIndex}.fields.${index}.value`, value)
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
        component = <Textarea {...field} onChange={e => handleChange(e.target.value, field.id)} />
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
                    <MediaLibrary onSelect={({ id, storageKey }) => handleChange({ id, storageKey }, field.id)} />
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
                  component: <MenuBuilder {...field} />,
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
      <Collapse.Panel header={field.type.toUpperCase()} direction="vertical" key={fieldIndex}>
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

      {!siteComponent && <Button onClick={handleDeleteBlock} children={`Delete Block`} danger />}
    </Space>
  )
}

export default BlockEditFields
