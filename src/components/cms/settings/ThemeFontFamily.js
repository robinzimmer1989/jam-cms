import React, { useState } from 'react'
import { Row, Col, Typography, Divider, Button, Space } from 'antd'
import FontPicker from 'font-picker-react'
import { toast } from 'react-toastify'

// import app components
import Caption from 'components/Caption'
import { siteActions } from 'actions'
import { useStore } from 'store'

const FontFamily = () => {
  const [
    {
      sitesState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const { headlineFontFamily, paragraphFontFamily } = sites[siteID]?.settings?.typography

  const [headlineFamily, setHeadlineFamily] = useState(headlineFontFamily)
  const [paragraphFamily, setParagraphFamily] = useState(paragraphFontFamily)

  const handleSave = async () => {
    const settings = {
      ...sites[siteID].settings,
      typography: {
        ...sites[siteID].settings.typography,
        headlineFontFamily: headlineFamily,
        paragraphFontFamily: paragraphFamily,
      },
    }

    const result = await siteActions.updateSite({ id: siteID, settings }, dispatch)

    if (result?.data?.updateSite) {
      toast.success('Updated successfully')
    }
  }

  return (
    <>
      <Space direction="vertical" size={30}>
        <Space direction="vertical" size={2}>
          <Caption children={`Headline Font Family`} />
          <FontPicker
            pickerId="headline"
            apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
            activeFontFamily={headlineFamily}
            onChange={nextFont => setHeadlineFamily(nextFont.family)}
            sort={`popularity`}
            categories={['sans-serif', 'serif', 'display', 'handwriting']}
          />
        </Space>
        <Space direction="vertical" size={2}>
          <Caption children={`Body Font Family`} />
          <FontPicker
            pickerId="paragraph"
            apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
            activeFontFamily={paragraphFamily}
            onChange={nextFont => setParagraphFamily(nextFont.family)}
            sort={`popularity`}
            categories={['sans-serif', 'serif']}
          />
        </Space>
      </Space>

      <Typography.Title
        className="apply-font-headline"
        level={2}
        children={`Occaecat before they sold out flexitarian`}
      />
      <Divider />

      <Button children={`Update`} onClick={handleSave} type="primary" />
    </>
  )
}

export default FontFamily
