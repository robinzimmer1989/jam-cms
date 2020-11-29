import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import Img from 'gatsby-image';
import { Modal, Upload, Button, Space, message, Spin } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

// import app components
import MediaImage from './MediaImage';

import { mediaActions } from '../actions';
import { useStore } from '../store';

const MediaLibrary = (props) => {
  const { onSelect, allow } = props;

  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const {
    mediaItems: { items, page },
  } = sites[siteID];

  const [activeFile, setActiveFile] = useState(null);
  const [uploader, setUploader] = useState(false);

  useEffect(() => {
    loadMediaItems(page || 0);
  }, []);

  const loadMediaItems = async (page) => {
    if (page > -1) {
      await mediaActions.getMediaItems({ siteID, page, limit: 24 }, dispatch);
    }
  };

  const handleLoadMore = () => page && loadMediaItems(page);

  const handleFileUpload = async (info) => {
    const {
      file: { status, name, originFileObj },
    } = info;

    if (status !== 'uploading') {
      await mediaActions.uploadMediaItem({ siteID, file: originFileObj }, dispatch);
    }
    if (status === 'done') {
      message.success(`${name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${name} file upload failed.`);
    }
  };

  const handleCloseDialog = () => setActiveFile(null);

  const handleSelect = (image) => {
    handleCloseDialog();
    onSelect(image);
  };

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

        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={page > -1}
          loader={
            <LoadingContainer key={0}>
              <Spin size="large" />
            </LoadingContainer>
          }
        >
          {items &&
            items
              .filter((o) => (allow ? allow.includes(o.type) : o))
              .map((o) => {
                return (
                  <MediaItem key={o.id} onClick={() => setActiveFile(o)} span={6}>
                    {o.type === 'image' && (
                      <Img
                        fluid={o.childImageSharp.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt={o.alt}
                        style={{ width: '100%', height: '100%' }}
                      />
                    )}

                    {o.type === 'application' && (
                      <File>
                        <img src={o.icon} />
                        <span>{o.title}</span>
                      </File>
                    )}
                  </MediaItem>
                );
              })}
        </InfiniteScroll>
      </Space>

      {!!activeFile && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={`Media Image`}
          visible={true}
          onCancel={handleCloseDialog}
          footer={null}
          width={1024}
        >
          {activeFile && (
            <MediaImage file={activeFile} onSelect={onSelect && handleSelect} onClose={handleCloseDialog} />
          )}
        </Modal>
      )}
    </>
  );
};

const MediaItem = styled.div`
  float: left;
  position: relative;
  height: 140px;
  width: 140px;
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
`;

const File = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  img {
    height: 40px;
    margin-bottom: 10px;
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export default MediaLibrary;
