import React from 'react'
import styled from 'styled-components'
import { Space, Popover, Collapse } from 'antd'
import { ChromePicker } from 'react-color'
import produce from 'immer'
import { set } from 'lodash'
import ColorScheme from 'color-scheme'

// import app components
import Caption from 'components/Caption'
import { useStore } from 'store'

const scheme = new ColorScheme()

const Colors = () => {
  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  if (!site) {
    return null
  }

  const { colors } = site.settings

  const {
    primary,
    primaryVariant,
    primaryText,
    secondary,
    secondaryVariant,
    secondaryText,
    background,
    backgroundText,
    surface,
    surfaceText,
  } = colors

  const handleChange = async (key, value) => {
    const nextSite = produce(site, draft => {
      set(draft, `settings.colors.${key}`, value.hex)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  const getSwatchColors = color =>
    scheme
      .from_hex(color.replace('#', ''))
      .scheme('monochromatic')
      .variation('default')
      .web_safe(true)
      .colors()
      .map(s => `#${s}`)

  const getPicker = key => <StyledChromePicker color={colors[key]} onChange={v => handleChange(key, v)} disableAlpha />

  const getSwatch = (keyParent, key) => {
    const swatch = getSwatchColors(colors[keyParent])

    return (
      <SwatchesPicker>
        {swatch.map(s => (
          <Swatch key={s} value={s} onClick={() => handleChange(key, { hex: s })} />
        ))}
      </SwatchesPicker>
    )
  }

  return (
    <Collapse defaultActiveKey={['Primary']}>
      <Collapse.Panel key="Primary" header="Primary" direction="vertical">
        <Space direction="vertical" size={20}>
          <Space direction="vertical" size={2}>
            <Caption children="Primary" />
            <Popover content={getPicker('primary')} title="Primary" trigger="click">
              <Swatch value={primary} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Variant" />
            <Popover content={getSwatch('primary', 'primaryVariant')} title="Primary Variant" trigger="click">
              <Swatch value={primaryVariant} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Text" />
            <Popover content={getPicker('primaryText')} title="Primary Text" trigger="click">
              <Swatch value={primaryText} />
            </Popover>
          </Space>
        </Space>
      </Collapse.Panel>

      <Collapse.Panel key="Secondary" header="Secondary" direction="vertical">
        <Space direction="vertical" size={20}>
          <Space direction="vertical" size={2}>
            <Caption children="Secondary" />
            <Popover content={getPicker('secondary')} title="Secondary" trigger="click">
              <Swatch value={secondary} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Variant" />
            <Popover content={getSwatch('secondary', 'secondaryVariant')} title="Secondary Variant" trigger="click">
              <Swatch value={secondaryVariant} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Text" />
            <Popover content={getPicker('secondaryText')} title="Secondary Text" trigger="click">
              <Swatch value={secondaryText} />
            </Popover>
          </Space>
        </Space>
      </Collapse.Panel>

      <Collapse.Panel key="Background" header="Background" direction="vertical">
        <Space direction="vertical" size={20}>
          <Space direction="vertical" size={2}>
            <Caption children="Background" />
            <Popover content={getPicker('background')} title="Background" trigger="click">
              <Swatch value={background} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Text" />
            <Popover content={getPicker('backgroundText')} title="Background Text" trigger="click">
              <Swatch value={backgroundText} />
            </Popover>
          </Space>
        </Space>
      </Collapse.Panel>

      <Collapse.Panel key="Surface" header="Surface" direction="vertical">
        <Space direction="vertical" size={20}>
          <Space direction="vertical" size={2}>
            <Caption children="Surface" />
            <Popover content={getPicker('surface')} title="Surface" trigger="click">
              <Swatch value={surface} />
            </Popover>
          </Space>

          <Space direction="vertical" size={2}>
            <Caption children="Text" />
            <Popover content={getPicker('surfaceText')} title="Surface Text" trigger="click">
              <Swatch value={surfaceText} />
            </Popover>
          </Space>
        </Space>
      </Collapse.Panel>
    </Collapse>
  )
}

const Swatch = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  background-color: ${props => props.value};
  border-radius: 4px;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  cursor: pointer;
`

const StyledChromePicker = styled(ChromePicker)`
  box-shadow: none !important;
`

const SwatchesPicker = styled.div`
  width: 200px;
`

export default Colors
