import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Row, Col, Typography, Divider } from 'antd'
import FontPicker from 'font-picker-react'

// import app components
import CmsLayout from '../CmsLayout'

import { useStore } from 'store'

const SettingsTheme = () => {
  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  console.log(sites)

  const [headlineFamily, setHeadlineFamily] = useState('')
  const [paragraphFamily, setParagraphFamily] = useState('')

  return (
    <CmsLayout pageTitle={`Theme`}>
      <Card title="Font Family">
        <Row>
          <Col span={8}>
            <FontPicker
              pickerId="headline"
              apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
              activeFontFamily={headlineFamily}
              onChange={nextFont => setHeadlineFamily(nextFont.family)}
              sort={`popularity`}
              categories={['sans-serif', 'serif', 'display', 'handwriting']}
            />
          </Col>
          <Col span={16}>
            <Typography.Title
              className="apply-font-headline"
              level={1}
              children={`h1. The path of the righteous man is beset on all sides by the`}
            />
            <Typography.Title
              className="apply-font-headline"
              level={2}
              children={`h2. Inequities of the selfish and the tyranny of evil men. Blessed is he who, in`}
            />
            <Typography.Title
              className="apply-font-headline"
              level={3}
              children={`h3. The name of charity and good will, shepherds the weak through the valley of`}
            />
            <Typography.Title
              className="apply-font-headline"
              level={4}
              children={`h4. Darkness, for he is truly his brother's keeper and the finder of lost Children. And I will strike down upon thee with great vengeance and furious`}
            />
            <Typography.Title
              className="apply-font-headline"
              level={5}
              children={`h5. Anger those who attempt to poison and destroy my brothers. And you will know`}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={8}>
            <FontPicker
              pickerId="paragraph"
              apiKey={process.env.GATSBY_GOOGLE_FONTS_KEY}
              activeFontFamily={paragraphFamily}
              onChange={nextFont => setParagraphFamily(nextFont.family)}
              sort={`popularity`}
              categories={['sans-serif', 'serif']}
            />
          </Col>
          <Col span={16}>
            <Typography
              className="apply-font-paragraph"
              children={`p. My name is the Lord when I lay my vengeance upon thee.`}
            />
          </Col>
        </Row>
      </Card>
    </CmsLayout>
  )
}

export default SettingsTheme
