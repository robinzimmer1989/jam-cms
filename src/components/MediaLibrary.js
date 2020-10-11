import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Upload, Button, Space, message } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

// import app components
import MediaImage from 'components/MediaImage'
import Image from 'components/Image'

import { mediaActions } from 'actions'
import { useStore } from 'store'

const MediaLibrary = props => {
  const { onSelect } = props

  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID]

  const [activeFile, setActiveFile] = useState(null)
  const [uploader, setUploader] = useState(false)

  useEffect(() => {
    const loadMediaItems = async () => {
      await mediaActions.getMediaItems({ siteID }, dispatch)
    }

    loadMediaItems()
  }, [siteID])

  const handleFileUpload = async info => {
    const {
      file: { status, name, originFileObj },
    } = info

    if (status !== 'uploading') {
      await mediaActions.uploadMediaItem({ siteID, file: originFileObj }, dispatch)
    }
    if (status === 'done') {
      message.success(`${name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${name} file upload failed.`)
    }
  }

  const handleCloseDialog = () => setActiveFile(null)

  return (
    <>
      <Space direction="vertical" size={20}>
        <Button icon={<UploadOutlined />} children="Upload" type="primary" onClick={() => setUploader(!uploader)} />

        {uploader && (
          <Upload.Dragger name="file" multiple onChange={handleFileUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        )}

        <Row>
          {site?.mediaItems?.items &&
            site.mediaItems.items.map(o => {
              return (
                <MediaItem key={o.id} onClick={() => setActiveFile(o)} span={6}>
                  <Image storageKey={o.storageKey} preview={false} />
                </MediaItem>
              )
            })}
        </Row>
      </Space>

      <Modal title={`Media Image`} visible={!!activeFile} onCancel={handleCloseDialog} footer={null} width={1024}>
        {activeFile && <MediaImage file={activeFile} onSelect={onSelect} onClose={handleCloseDialog} />}
      </Modal>
    </>
  )
}

const MediaItem = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

export default MediaLibrary
