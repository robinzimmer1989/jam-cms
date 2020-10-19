import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Space, Row, Col, Popconfirm } from 'antd'

// import app components
import Image from 'components/Image'
import Input from 'components/Input'

import { mediaActions } from 'actions'
import { useStore } from 'store'

const MediaImage = props => {
  const { file, onSelect, onClose } = props

  const [, dispatch] = useStore()

  const [data, setData] = useState({ ...file })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  const handleUpdateMediaItem = async () => {
    const { id, altText, siteID } = data

    setLoading('update')
    await mediaActions.updateMediaItem({ siteID, id, altText }, dispatch)
    setLoading(false)
  }

  const handlDeleteMediaItem = async () => {
    setLoading('delete')
    const result = await mediaActions.deleteMediaItem({ ...file }, dispatch)
    setLoading(false)

    if (result?.data?.deleteMediaItem) {
      onClose()
    }
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image image={file} />
        </Col>
        <Col span={12}>
          <Content span={12}>
            <Space direction="vertical">
              <Input label="Alternative Text" value={data.altText} onChange={handleChange} name={`altText`} />

              <Space>
                <Popconfirm title="Are you sure?" onConfirm={handlDeleteMediaItem} okText="Yes" cancelText="No">
                  <Button children={`Delete`} danger loading={loading === 'delete'} />
                </Popconfirm>

                <Button
                  onClick={handleUpdateMediaItem}
                  children={`Update Image`}
                  type="primary"
                  loading={loading === 'update'}
                />
              </Space>
            </Space>

            <Space>
              <Button onClick={onClose} children={`Close`} />
              {onSelect && <Button onClick={() => onSelect(file)} children={`Select`} type="primary" />}
            </Space>
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
