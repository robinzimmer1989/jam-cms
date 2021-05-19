import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Space, Row, Col, Popconfirm, message, Typography } from 'antd';

// import app components
import Caption from './Caption';
import Input from './Input';

import { mediaActions } from '../actions';
import { useStore } from '../store';
import { convertFileSize, renderImage } from '../utils';
import { colors } from '../theme';

const MediaImage = (props) => {
  const { file, onSelect, onClose } = props;

  const [{ config }, dispatch] = useStore();

  const [data, setData] = useState({ ...file });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(file);
  }, [file]);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleUpdateMediaItem = async () => {
    const { id, altText, siteID } = data;

    setLoading('update');
    const result = await mediaActions.updateMediaItem({ siteID, id, altText }, dispatch, config);
    setLoading(false);

    if (result) {
      message.success(`Saved successfully.`);
    }
  };

  const handlDeleteMediaItem = async () => {
    const { siteID } = data;

    setLoading('delete');
    const result = await mediaActions.deleteMediaItem({ ...file, siteID }, dispatch, config);
    setLoading(false);

    if (result) {
      onClose();
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ background: `${colors.secondaryContrast}` }}>
          {renderImage(file)}
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={20}>
            <Content span={12}>
              <Space direction="vertical">
                <Row gutter={[8, 8]} align="middle">
                  {data?.filename && (
                    <>
                      <Col span={6}>
                        <Caption children="File name" />
                      </Col>
                      <Col span={18}>
                        <Typography children={data.filename} />
                      </Col>
                    </>
                  )}

                  {data?.type && data?.subtype && (
                    <>
                      <Col span={6}>
                        <Caption children="Type" />
                      </Col>
                      <Col span={18}>
                        <Typography children={`${data.type}/${data.subtype}`} />
                      </Col>
                    </>
                  )}

                  {data?.filesize && (
                    <>
                      <Col span={6}>
                        <Caption children="File size" />
                      </Col>
                      <Col span={18}>
                        <Typography children={convertFileSize(data.filesize)} />
                      </Col>
                    </>
                  )}

                  <Col span={6}>
                    <Caption children="Dimensions" />
                  </Col>
                  <Col span={18}>
                    <Typography>
                      {data?.width > 0 && data?.height > 0
                        ? `${data.width} by ${data.height} pixels`
                        : 'Not available'}
                    </Typography>
                  </Col>
                </Row>

                <Input
                  label="Alternative Text"
                  value={data.altText}
                  onChange={handleChange}
                  name={`altText`}
                />

                <Input label="Url" value={data.url} onChange={() => {}} name={`url`} disabled />
                <Typography.Paragraph copyable={{ text: data.sourceUrl }} children={'Copy Link'} />
              </Space>
            </Content>

            <Row justify="space-between">
              <Col>
                <Space>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={handlDeleteMediaItem}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button children={`Delete`} danger loading={loading === 'delete'} />
                  </Popconfirm>

                  <Button
                    onClick={handleUpdateMediaItem}
                    children={`Update Image`}
                    loading={loading === 'update'}
                  />
                </Space>
              </Col>
              {onSelect && (
                <Col>
                  <Button onClick={() => onSelect(file)} children={`Select`} type="primary" />
                </Col>
              )}
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 300px;
`;

export default MediaImage;
