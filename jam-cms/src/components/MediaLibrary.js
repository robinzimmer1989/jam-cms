import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import InfiniteScroll from 'react-infinite-scroller';
import { Modal, Upload, Button, Space, message, Spin, Checkbox } from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

// import app components
import Img from './GatsbyImage';
import MediaImage from './MediaImage';

import { mediaActions } from '../actions';
import { useStore } from '../store';
import { colors } from '../theme';

const MediaLibrary = (props) => {
  const { onSelect, allow, multiple, selected: defaultSelected = [] } = props;

  const [
    {
      config,
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const {
    mediaItems: { items, page },
  } = sites[siteID];

  const [activeFile, setActiveFile] = useState(null);
  const [uploader, setUploader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const activeFileIndex = activeFile && items.findIndex((o) => o.id === activeFile.id);

  useEffect(() => {
    // We need to add this check, because deployment causes a new site fetch
    if (page === null) {
      loadMediaItems(page || 0);
    }
  }, [page]);

  const loadMediaItems = async (page) => {
    if (page > -1) {
      await mediaActions.getMediaItems({ siteID, page, limit: 24 }, dispatch, config);
    }
  };

  const handleLoadMore = () => page && loadMediaItems(page);

  const handleFileUpload = async (info) => {
    const {
      file: { status, name, originFileObj, error },
    } = info;

    if (status !== 'uploading') {
      setLoading(true);
      await mediaActions.uploadMediaItem({ siteID, file: originFileObj }, dispatch, config);
    }
    if (status === 'done') {
      message.success(`${name} file uploaded successfully.`);
      setLoading(false);
    } else if (status === 'error') {
      // TODO: length computable is set to false and therefore throwing an error if file size is too big.
      // However, this has nothing to do with the actual file upload to the backend, so we not gonna display an error here.
      // But this should be fixed at some point.
      if (!error?.lengthComputable) {
        message.success(`${name} file uploaded successfully.`);
      } else {
        console.log(info);
        message.error(`${name} file upload failed.`);
      }

      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setActiveFile(null);
  };

  const handleClickCheckbox = (image) => {
    const nextSelection = produce(selected, (draft) => {
      const index = selected.findIndex((o) => o.id === image.id);

      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(image);
      }

      return draft;
    });

    setSelected(nextSelection);
  };

  const handleSelect = (item) => {
    if (multiple) {
      handleClickCheckbox(item);
      setActiveFile(null);
    } else {
      dispatch({ type: 'CLOSE_DIALOG' });
      onSelect && onSelect(item);
    }
  };

  const handleSelectMultiple = () => {
    dispatch({ type: 'CLOSE_DIALOG' });
    onSelect && onSelect(selected);
  };

  return (
    <>
      <Container actionBar={multiple && selected.length > 0}>
        <Space direction="vertical" size={20}>
          <Button
            icon={<UploadOutlined />}
            children="Upload"
            type="primary"
            onClick={() => setUploader(!uploader)}
            loading={loading}
          />

          {uploader && (
            <Upload.Dragger name="file" multiple onChange={handleFileUpload} showUploadList={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          )}

          <MediaItems>
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
                      <MediaItem key={o.id}>
                        <MediaItemInner onClick={() => setActiveFile(o)}>
                          {o.type === 'image' && (
                            <Img
                              image={o}
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
                        </MediaItemInner>

                        {multiple && (
                          <CheckboxContainer onClick={() => handleClickCheckbox(o)}>
                            <Checkbox checked={!!selected.find((p) => p.id === o.id)} />
                          </CheckboxContainer>
                        )}
                      </MediaItem>
                    );
                  })}

              <DummyItem />
              <DummyItem />
              <DummyItem />
              <DummyItem />
              <DummyItem />
            </InfiniteScroll>
          </MediaItems>

          {multiple && selected.length > 0 && (
            <ActionBar>
              {`${selected.length} selected`}
              <Button onClick={handleSelectMultiple} children="Select" type="primary" />
            </ActionBar>
          )}
        </Space>
      </Container>

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
          <PrevButton>
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size={'large'}
              onClick={() => setActiveFile(items[activeFileIndex - 1])}
              disabled={activeFileIndex === 0}
            />
          </PrevButton>
          <MediaImage
            file={activeFile}
            onSelect={onSelect && handleSelect}
            onClose={handleCloseDialog}
          />
          <NextButton>
            <Button
              shape="circle"
              icon={<ArrowRightOutlined />}
              size={'large'}
              onClick={() => setActiveFile(items[activeFileIndex + 1])}
              disabled={activeFileIndex === items.length - 1}
            />
          </NextButton>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  padding-bottom: ${({ actionBar }) => (actionBar ? '40px' : 0)};
`;

const MediaItems = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const MediaItem = styled.div`
  float: left;
  position: relative;
  height: 140px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const MediaItemInner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 6px;
  z-index: 1;
  padding: 4px;
`;

const DummyItem = styled.div`
  height: 0;
  width: 140px;
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

const ActionBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-top: 1px solid ${colors.tertiary};
`;

const PrevButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  left: -50px;
`;

const NextButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  right: -50px;
`;

export default MediaLibrary;
