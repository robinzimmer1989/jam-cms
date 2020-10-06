import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Button, Space, Row, Col } from 'antd'

// import app components
import Image from 'components/Image'

import { colors } from 'theme'
import { mediaActions } from 'actions'
import { useStore } from 'store'

const MediaImage = props => {
  const { file, onSelect, onClose } = props

  const [, dispatch] = useStore()

  const [data, setData] = useState({ ...file })

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  const handleUpdateMediaItem = async () => {
    const { id, altText, siteID } = data
    await mediaActions.updateMediaItem({ siteID, id, altText }, dispatch)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image storageKey={file?.storageKey} />
        </Col>
        <Col span={12}>
          <Content span={12}>
            <Space direction="vertical">
              <Input placeholder={`Alternative Text`} value={data.altText} onChange={handleChange} name={`altText`} />

              <Button onClick={handleUpdateMediaItem} children={`Update Image`} type="primary" />
            </Space>

            <div>
              <Button onClick={onClose} children={`Close`} />
              {onSelect && <Button onClick={() => onSelect(file)} children={`Select`} type="primary" />}
            </div>
          </Content>
        </Col>
      </Row>
    </>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  min-height: 300px;
`

export default MediaImage
