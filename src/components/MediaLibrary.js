import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Modal, Row, Upload, Button, Space, message } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'

// import app components
import MediaImage from './MediaImage'

import { mediaActions } from '../actions'
import { useStore } from '../store'

const MediaLibrary = (props) => {
  const { onSelect } = props

  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const {
    mediaItems: { items, page },
  } = sites[siteID]

  const [activeFile, setActiveFile] = useState(null)
  const [uploader, setUploader] = useState(false)

  useEffect(() => {
    loadMediaItems(page || 0)
  }, [])

  const loadMediaItems = async (page) => {
    if (page > -1) {
      await mediaActions.getMediaItems({ siteID, page }, dispatch)
    }
  }

  const handleLoadMore = () => page && loadMediaItems(page)

  const handleFileUpload = async (info) => {
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

  const handleSelect = (image) => {
    handleCloseDialog()
    onSelect(image)
  }

  return (
    <>
      <Space direction="vertical" size={20}>
        <Button icon={<UploadOutlined />} children="Upload" type="primary" onClick={() => setUploader(!uploader)} />

        {uploader && (
          <Upload.Dragger name="file" multiple onChange={handleFileUpload} showUploadList={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        )}

        <Row>
          {items &&
            items.map((o) => {
              return (
                <MediaItem key={o.id} onClick={() => setActiveFile(o)} span={6}>
                  <Img
                    fluid={o.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={o.alt}
                    style={{ width: '100%', height: '100%' }}
                  />
                </MediaItem>
              )
            })}
        </Row>

        {page && <Button children={'Load More'} onClick={handleLoadMore} />}
      </Space>

      <Modal title={`Media Image`} visible={!!activeFile} onCancel={handleCloseDialog} footer={null} width={1024}>
        {activeFile && <MediaImage file={activeFile} onSelect={onSelect && handleSelect} onClose={handleCloseDialog} />}
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

  img {
    max-height: 150px;
    max-width: 150px;
    width: auto;
  }
`

export default MediaLibrary
