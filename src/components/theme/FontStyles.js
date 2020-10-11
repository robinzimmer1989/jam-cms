import React from 'react'
import produce from 'immer'
import { Space, Slider, Collapse } from 'antd'
import { set } from 'lodash'

// import app components
import Caption from 'components/Caption'
import { useStore } from 'store'

const FontStyles = () => {
  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const handleChange = async (tag, key, value) => {
    const nextSite = produce(site, draft => {
      set(draft, `settings.typography.${tag}.${key}`, value)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  return (
    <Space direction="vertical" size={30}>
      <Collapse defaultActiveKey={['h1']}>
        {['h1', 'h2', 'h3', 'h4', 'h5', 'p'].map(tag => {
          const setting = site.settings.typography[tag]

          return (
            <Collapse.Panel key={tag} header={tag} direction="vertical">
              <Space direction="vertical" size={20}>
                <Space direction="vertical" size={5}>
                  <Caption children="Font Size" />
                  <Slider min={12} max={80} onChange={v => handleChange(tag, 'fontSize', v)} value={setting.fontSize} />
                </Space>
                <Space direction="vertical" size={5}>
                  <Caption children="Letter Spacing" />
                  <Slider
                    step={0.5}
                    min={-2}
                    max={4}
                    onChange={v => handleChange(tag, 'letterSpacing', v)}
                    value={setting.letterSpacing}
                  />
                </Space>
              </Space>
            </Collapse.Panel>
          )
        })}
      </Collapse>
    </Space>
  )
}

export default FontStyles
