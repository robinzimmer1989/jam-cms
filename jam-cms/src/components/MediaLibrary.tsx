import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import produce from 'immer';
import { Modal, Upload, Button, Space, message, Spin, Checkbox, Input, PageHeader } from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

// import app components
import MediaImage from './MediaImage';
import { renderMediaItem, useOnScreen } from '../utils';
import { RootState, useAppSelector, useAppDispatch, mediaActions, uiActions } from '../redux';
import { MediaItem } from '../types';
import { colors } from '../theme';

const MediaLibrary = (props: any) => {
  const { onSelect, allow = [], multiple, selected: defaultSelected = [] } = props;
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const {
    cms: {
      site,
      media: { items, page },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [activeFile, setActiveFile] = useState(null as any);
  const [uploader, setUploader] = useState(false);
  const [loading, setLoading] = useState('');
  const [selected, setSelected] = useState(defaultSelected);
  const [search, setSearch] = useState('');

  const activeFileIndex = activeFile && items.findIndex((o: any) => o.id === activeFile.id);

  useEffect(() => {
    isVisible && page > -1 && loadMediaItems(page);
  }, [isVisible]);

  const handleSearch = async (value: any) => {
    setLoading('search');

    if (value) {
      await dispatch(
        mediaActions.getMediaItems({
          page: 0,
          search: value,
          limit: 24,
          allow,
        })
      );
    } else {
      await loadMediaItems(0);
    }

    setLoading('');
  };

  const loadMediaItems = async (page: any) =>
    dispatch(mediaActions.getMediaItems({ page, limit: 24, allow }));

  const handleUpdateMediaItem = async (mediaItem: any) => {
    const { id, altText } = mediaItem;

    const { payload } = await dispatch(mediaActions.updateMediaItem({ id, altText }));

    if (payload) {
      message.success({ className: 'media-update-success', content: 'Saved successfully.' });
    }
  };

  const handlDeleteMediaItem = async () => {
    const result: any = await dispatch(mediaActions.deleteMediaItem({ ...activeFile }));

    if (result) {
      handleCloseDialog();
      message.success({ className: 'media-delete-success', content: 'Deleted successfully..' });
    }
  };

  const handleFileUpload = async (info: any) => {
    const {
      file: { status, name, originFileObj, error },
    } = info;

    if (status !== 'uploading') {
      setLoading('upload');
      await dispatch(mediaActions.addMediaItem({ file: originFileObj }));
    }

    if (status === 'done') {
      message.success({
        className: 'media-upload-success',
        content: `${name} file uploaded successfully.`,
      });
      setLoading('');
    } else if (status === 'error') {
      // TODO: length computable is set to false and therefore throwing an error if file size is too big.
      // However, this has nothing to do with the actual file upload to the backend, so we not gonna display an error here.
      // But this should be fixed at some point.
      if (!error?.lengthComputable) {
        message.success({
          className: 'media-upload-success',
          content: `${name} file uploaded successfully.`,
        });
      } else {
        console.log(info);
        message.error(`${name} file upload failed.`);
      }
      setLoading('');
    }
  };

  const handleCloseDialog = () => {
    setActiveFile(null);
  };

  const handleClickCheckbox = (image: MediaItem) => {
    const nextSelection = produce(selected, (draft: any) => {
      const index = selected.findIndex((o: any) => o.id === image.id);
      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(image);
      }
      return draft;
    });
    setSelected(nextSelection);
  };

  const handleSelect = (item: any) => {
    if (multiple) {
      handleClickCheckbox(item);
    } else {
      dispatch(uiActions.hideDialog());
      onSelect(item);
    }
    setActiveFile(null);
  };

  const handleSelectMultiple = () => {
    onSelect && onSelect(selected);

    dispatch(uiActions.hideDialog());
  };

  return (
    <>
      <Container actionBar={multiple && selected.length > 0}>
        <Space direction="vertical" size={20}>
          <PageHeader
            title={
              <Button
                id="upload-media"
                icon={<UploadOutlined />}
                children="Upload"
                type="primary"
                onClick={() => setUploader(!uploader)}
                loading={loading === 'upload'}
                disabled={!site}
              />
            }
            extra={[
              <Input.Search
                id="search-media"
                key="search"
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={handleSearch}
                loading={loading === 'search'}
              />,
            ]}
          />

          {uploader && (
            <Upload.Dragger
              id="file-dropzone"
              name="file"
              multiple
              onChange={handleFileUpload}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          )}

          <Items id="media-items">
            {items &&
              items.map((o: MediaItem) => {
                return (
                  <Item key={(o as any).id} className="media-item">
                    <MediaItemInner onClick={() => setActiveFile(o)}>
                      {renderMediaItem(o)}
                    </MediaItemInner>

                    {multiple && (
                      <CheckboxContainer onClick={() => handleClickCheckbox(o)}>
                        <Checkbox checked={!!selected.find((p: any) => p.id === (o as any).id)} />
                      </CheckboxContainer>
                    )}
                  </Item>
                );
              })}

            <DummyItem />
            <DummyItem />
            <DummyItem />
            <DummyItem />
            <DummyItem />

            <LoadingContainer ref={ref} key={0} visible={page > -1}>
              <Spin size="large" />
            </LoadingContainer>
          </Items>

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
          title={'Media Image'}
          visible={true}
          onCancel={handleCloseDialog}
          footer={null}
          width={1024}
        >
          <PrevButton>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setActiveFile(items[activeFileIndex - 1])}
              disabled={activeFileIndex === 0}
            />
          </PrevButton>
          <MediaImage
            file={activeFile}
            onSelect={onSelect && handleSelect}
            onDelete={handlDeleteMediaItem}
            onUpdate={handleUpdateMediaItem}
          />
          <NextButton>
            <Button
              icon={<ArrowRightOutlined />}
              onClick={() => setActiveFile(items[activeFileIndex + 1])}
              disabled={activeFileIndex === items.length - 1}
            />
          </NextButton>
        </Modal>
      )}
    </>
  );
};

const Container = styled('div' as any)`
  padding-bottom: ${({ actionBar }: any) => (actionBar ? '40px' : 0)};
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  float: left;
  position: relative;
  height: 140px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #d9d9d9;
`;

const MediaItemInner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .gatsby-image-wrapper {
    max-width: 100%;
    max-height: 100%;
  }
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

const LoadingContainer = styled('div' as any)`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  ${({ visible }: any) =>
    !visible &&
    css`
      opacity: 0;
      height: 0;
      padding: 0;
    `};
`;

const ActionBar = styled.div`
  position: fixed;
  z-index: 1;
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
  top: 12px;
  right: 100px;
`;

const NextButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 60px;
`;

export default MediaLibrary;
