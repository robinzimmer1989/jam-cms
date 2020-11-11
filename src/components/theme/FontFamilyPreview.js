import React, { useState } from 'react'
import { Typography, Space } from 'antd'
import styled from 'styled-components'

// import app components
import Input from '../Input'
import Edges from '../Edges'

const FontFamilyPreview = () => {
  const [text, setText] = useState(`A red flair silhouetted the jagged edge of a wing.`)

  return (
    <Container>
      <Edges size="sm">
        <Space direction="vertical" size={40}>
          <Input className="reset-font" label="Preview Text" value={text} onChange={(e) => setText(e.target.value)} />
          <div>
            <Space direction="vertical" size={20}>
              <Typography.Title level={1} children={`h1. ${text}`} />
              <Typography.Title level={2} children={`h2. ${text}`} />
              <Typography.Title level={3} children={`h3. ${text}`} />
              <Typography.Title level={4} children={`h4. ${text}`} />
              <Typography.Title level={5} children={`h5. ${text}`} />
              <Typography.Paragraph children={`p. ${text}`} />
            </Space>
          </div>
        </Space>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  padding: 60px 0;
`

export default FontFamilyPreview
