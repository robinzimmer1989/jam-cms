import React, { useEffect, useState, useRef } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { css } from 'styled-components';
import produce from 'immer';
import { Modal, Upload, Button, Space, message, Spin, Checkbox, Input, PageHeader } from 'antd';
import { UploadOutlined, InboxOutlined, ArrowLeftOutlined, ArrowRightOutlined, } from '@ant-design/icons';
// import app components
import MediaImage from './MediaImage';
import { renderImage, useOnScreen } from '../utils';
import { mediaActions } from '../actions';
import { useStore } from '../store';
import { colors } from '../theme';
const MediaLibrary = (props: any) => {
    const { onSelect, allow = [], multiple, selected: defaultSelected = [] } = props;
    const ref = useRef();
    const isVisible = useOnScreen(ref);
    // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
    const [{ config, cmsState: { siteID }, }, dispatch,] = useStore();
    const [media, setMedia] = useState({ items: [], page: 0 });
    const [activeFile, setActiveFile] = useState(null);
    const [uploader, setUploader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(defaultSelected);
    const [search, setSearch] = useState('');
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const activeFileIndex = activeFile && media.items.findIndex((o) => (o as any).id === activeFile.id);
    useEffect(() => {
        isVisible && media.page > -1 && loadMediaItems(media.page);
    }, [isVisible]);
    const handleSearch = async (value: any) => {
        if (value) {
            const result = await mediaActions.getMediaItems({ siteID, page: 0, search: value, limit: 24, allow }, dispatch, config);
            if (result) {
                setMedia({ items: result.items, page: result.page });
            }
        }
        else {
            loadMediaItems(0, true);
        }
    };
    const loadMediaItems = async (page: any, clear = false) => {
        const result = await mediaActions.getMediaItems({ siteID, page, limit: 24, allow }, dispatch, config);
        if (result) {
            setMedia({
                items: clear ? result.items : media.items.concat(result.items),
                page: result.page,
            });
        }
    };
    const handleUpdateMediaItem = async (mediaItem: any) => {
        const { id, altText, siteID } = mediaItem;
        const result = await mediaActions.updateMediaItem({ id, altText, siteID }, dispatch, config);
        if (result) {
            setMedia({
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.
                items: media.items.map((o) => ((o as any).id === result.id ? result : o)),
                page: media.page,
            });
            message.success(`Saved successfully.`);
        }
    };
    const handlDeleteMediaItem = async () => {
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        const result = await mediaActions.deleteMediaItem({ ...activeFile, siteID }, dispatch, config);
        if (result) {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'items'.
            setMedia({ items: items.filter((o: any) => o.id !== parseInt(result)), page: media.page });
            handleCloseDialog();
            message.success(`Deleted successfully.`);
        }
    };
    const handleFileUpload = async (info: any) => {
        const { file: { status, name, originFileObj, error }, } = info;
        if (status !== 'uploading') {
            setLoading(true);
            const result = await mediaActions.uploadMediaItem({ siteID, file: originFileObj }, dispatch, config);
            if (result) {
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                setMedia({ items: [result, ...media.items], page: media.page });
            }
        }
        if (status === 'done') {
            message.success(`${name} file uploaded successfully.`);
            setLoading(false);
        }
        else if (status === 'error') {
            // TODO: length computable is set to false and therefore throwing an error if file size is too big.
            // However, this has nothing to do with the actual file upload to the backend, so we not gonna display an error here.
            // But this should be fixed at some point.
            if (!error?.lengthComputable) {
                message.success(`${name} file uploaded successfully.`);
            }
            else {
                console.log(info);
                message.error(`${name} file upload failed.`);
            }
            setLoading(false);
        }
    };
    const handleCloseDialog = () => {
        setActiveFile(null);
    };
    const handleClickCheckbox = (image: any) => {
        const nextSelection = produce(selected, (draft: any) => {
            const index = selected.findIndex((o: any) => o.id === image.id);
            if (index > -1) {
                draft.splice(index, 1);
            }
            else {
                draft.push(image);
            }
            return draft;
        });
        setSelected(nextSelection);
    };
    const handleSelect = (item: any) => {
        if (multiple) {
            handleClickCheckbox(item);
        }
        else {
            dispatch({ type: 'CLOSE_DIALOG' });
            onSelect(item);
        }
        setActiveFile(null);
    };
    const handleSelectMultiple = () => {
        dispatch({ type: 'CLOSE_DIALOG' });
        onSelect && onSelect(selected);
    };
    return <>
    <Container actionBar={multiple && selected.length > 0}>
      <Space direction="vertical" size={20}>
        <PageHeader title={<Button icon={<UploadOutlined />} children="Upload" type="primary" onClick={() => setUploader(!uploader)} loading={loading}/>} extra={[
            <Input.Search key="search" allowClear value={search} onChange={(e) => setSearch(e.target.value)} onSearch={handleSearch}/>,
        ]}/>

        {uploader && (<Upload.Dragger name="file" multiple onChange={handleFileUpload} showUploadList={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>)}

        <MediaItems>
          {media.items &&
            media.items.map((o) => {
                return (<MediaItem key={(o as any).id}>
                  <MediaItemInner onClick={() => setActiveFile(o)}>
                    {renderImage(o)}
                  </MediaItemInner>

                  {multiple && (<CheckboxContainer onClick={() => handleClickCheckbox(o)}>
                      <Checkbox checked={!!selected.find((p: any) => p.id === (o as any).id)}/>
                    </CheckboxContainer>)}
                </MediaItem>);
            })}

          <DummyItem />
          <DummyItem />
          <DummyItem />
          <DummyItem />
          <DummyItem />

          <LoadingContainer ref={ref} key={0} visible={media.page > -1}>
            <Spin size="large"/>
          </LoadingContainer>
        </MediaItems>

        {multiple && selected.length > 0 && (<ActionBar>
            {`${selected.length} selected`}
            <Button onClick={handleSelectMultiple} children="Select" type="primary"/>
          </ActionBar>)}
      </Space>
    </Container>

    {!!activeFile && (<Modal transitionName="none" maskTransitionName="none" title={'Media Image'} visible={true} onCancel={handleCloseDialog} footer={null} width={1024}>
        <PrevButton>
          {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
          <Button icon={<ArrowLeftOutlined />} onClick={() => setActiveFile(media.items[activeFileIndex - 1])} disabled={activeFileIndex === 0}/>
        </PrevButton>
        <MediaImage file={activeFile} onSelect={onSelect && handleSelect} onDelete={handlDeleteMediaItem} onUpdate={handleUpdateMediaItem}/>
        <NextButton>
          {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
          <Button icon={<ArrowRightOutlined />} onClick={() => setActiveFile(media.items[activeFileIndex + 1])} disabled={activeFileIndex === media.items.length - 1}/>
        </NextButton>
      </Modal>)}
  </>;
};
const Container = styled.div `
  padding-bottom: ${({ actionBar }: any) => (actionBar ? '40px' : 0)};
`;
const MediaItems = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const MediaItem = styled.div `
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
const MediaItemInner = styled.div `
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
const CheckboxContainer = styled.div `
  position: absolute;
  top: 4px;
  right: 6px;
  z-index: 1;
  padding: 4px;
`;
const DummyItem = styled.div `
  height: 0;
  width: 140px;
`;
const LoadingContainer = styled.div `
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  ${({ visible }: any) => !visible &&
    css `
      opacity: 0;
      height: 0;
      padding: 0;
    `};
`;
const ActionBar = styled.div `
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
const PrevButton = styled.div `
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 100px;
`;
const NextButton = styled.div `
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 60px;
`;
export default MediaLibrary;
