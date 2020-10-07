import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Upload, Button, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

// import app components
import MediaImage from './MediaImage'
import Image from 'components/Image'

import { mediaActions } from 'actions'
import { useStore } from 'store'

const MediaLibrary = props => {
  const { onSelect } = props

  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID]

  const [activeFile, setActiveFile] = useState(null)

  useEffect(() => {
    const loadMediaItems = async () => {
      await mediaActions.getMediaItems({ siteID }, dispatch)
    }

    loadMediaItems()
  }, [siteID])

  const handleFileUpload = async event => {
    await mediaActions.uploadMediaItem({ siteID, file: event.target.files[0] }, dispatch)
  }

  const handleCloseDialog = () => setActiveFile(null)

  return (
    <>
      <Space direction="vertical" size={20}>
        <Upload type="file" placeholder={'File Upload'} onChange={handleFileUpload} name="file">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        <Row gutter={[16, 16]}>
          {site?.mediaItems?.items &&
            site.mediaItems.items.map(o => {
              return (
                <MediaItem key={o.id} onClick={() => setActiveFile(o)} span={6}>
                  <Image bg={true} storageKey={o.storageKey} />
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

const MediaItem = styled(Col)`
  position: relative;
  height: 200px;
  cursor: pointer;

  > div {
    background-color: #fff;
    box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  }
`

export default MediaLibrary
