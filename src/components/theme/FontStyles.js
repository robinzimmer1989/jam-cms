import React from 'react'
import produce from 'immer'
import { Space, Slider, Collapse, Select as AntSelect } from 'antd'
import { set } from 'lodash'

// import app components
import Select from '../Select'
import Caption from '../Caption'
import { useStore } from '../../store'

const FontStyles = () => {
  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const handleChange = async (tag, key, value) => {
    const nextSite = produce(site, (draft) => {
      set(draft, `settings.typography.${tag}.${key}`, value)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  return (
    <Space direction="vertical" size={30}>
      <Collapse>
        {['menuItem', 'h1', 'h2', 'h3', 'h4', 'h5', 'p'].map((tag) => {
          const setting = site.settings.typography[tag]

          return (
            <Collapse.Panel key={tag} header={tag} direction="vertical">
              <Space direction="vertical" size={20}>
                <Space direction="vertical" size={5}>
                  <Caption children="Font Size" />
                  <Slider
                    min={12}
                    max={80}
                    onChange={(v) => handleChange(tag, 'fontSize', v)}
                    value={setting.fontSize}
                  />
                </Space>

                <Space direction="vertical" size={5}>
                  <Caption children="Letter Spacing" />
                  <Slider
                    step={0.5}
                    min={-2}
                    max={4}
                    onChange={(v) => handleChange(tag, 'letterSpacing', v)}
                    value={setting.letterSpacing}
                  />
                </Space>

                <Space direction="vertical" size={5}>
                  <Caption children="Line Height" />
                  <Slider
                    step={0.1}
                    min={0.5}
                    max={2}
                    onChange={(v) => handleChange(tag, 'lineHeight', v)}
                    value={setting.lineHeight}
                  />
                </Space>

                <Select value={setting.color} onChange={(v) => handleChange(tag, 'color', v)} label={`Color`}>
                  <AntSelect.Option value={`primary`} children={`Primary`} />
                  <AntSelect.Option value={`secondary`} children={`Secondary`} />
                  <AntSelect.Option value={`backgroundText`} children={`Text`} />
                </Select>

                <Select
                  value={setting.textTransform}
                  onChange={(v) => handleChange(tag, 'textTransform', v)}
                  label={`Text Transform`}
                >
                  <AntSelect.Option value={`none`} children={`None`} />
                  <AntSelect.Option value={`uppercase`} children={`Uppercase`} />
                  <AntSelect.Option value={`lowercase`} children={`lowercase`} />
                </Select>

                <Select
                  value={setting.fontWeight}
                  onChange={(v) => handleChange(tag, 'fontWeight', v)}
                  label={`Font Weight`}
                >
                  <AntSelect.Option value={400} children={`Normal`} />
                  <AntSelect.Option value={100} children={`Light`} />
                  <AntSelect.Option value={700} children={`bold`} />
                </Select>
              </Space>
            </Collapse.Panel>
          )
        })}
      </Collapse>
    </Space>
  )
}

export default FontStyles
