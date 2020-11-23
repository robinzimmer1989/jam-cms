import React from 'react'
import produce from 'immer'
import styled from 'styled-components'
import { Space } from 'antd'
import FontPicker from 'font-picker-react'
import { set } from 'lodash'

// import app components
import Caption from '../Caption'
import { useStore } from '../../store'

const FontFamily = () => {
  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const { headlineFontFamily, paragraphFontFamily } = site?.settings?.typography

  const handleChange = async (key, value) => {
    const nextSite = produce(site, (draft) => {
      set(draft, `settings.typography.${key}`, value)
    })

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
      payload: nextSite,
    })
  }

  return (
    <Container>
      <Space direction="vertical" size={20}>
        <Space direction="vertical" size={2}>
          <Caption children={`Headline Font Family`} />
          <FontPicker
            pickerId="headline"
            apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
            activeFontFamily={headlineFontFamily}
            onChange={(nextFont) => handleChange('headlineFontFamily', nextFont.family)}
            sort={`popularity`}
            categories={['sans-serif', 'serif', 'display', 'handwriting']}
          />
        </Space>
        <Space direction="vertical" size={2}>
          <Caption children={`Body Font Family`} />
          <FontPicker
            pickerId="paragraph"
            apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
            activeFontFamily={paragraphFontFamily}
            onChange={(nextFont) => handleChange('paragraphFontFamily', nextFont.family)}
            sort={`popularity`}
            categories={['sans-serif', 'serif']}
          />
        </Space>
      </Space>
    </Container>
  )
}

const Container = styled.div`
  padding: 15px;

  && {
    #font-picker-headline,
    #font-picker-paragraph {
      width: 100%;
      box-shadow: none;
    }

    .dropdown-button {
      background: transparent;
      border: 1px solid #d9d9d9;
      height: 32px;

      &:hover {
        background: transparent;
        border-color: #1890ff;
      }

      .font-list {
        background: #fff;
      }

      ul li button {
        background: #fff;
      }
    }
  }
`

export default FontFamily
