import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Space, Row, Col, Popconfirm, Typography } from 'antd';

// import app components
import Caption from './Caption';
import Input from './Input';

import { convertFileSize, renderMediaItem } from '../utils';
import { colors } from '../theme';

const MediaImage = (props: any) => {
  const { file, onSelect, onDelete, onUpdate } = props;

  const [data, setData] = useState({ ...file });
  const [loading, setLoading] = useState('');

  useEffect(() => {
    setData(file);
  }, [file]);

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value });

  const handleUpdateMediaItem = async () => {
    setLoading('update');
    await onUpdate(data);
    setLoading('');
  };

  const handlDeleteMediaItem = async () => {
    setLoading('delete');
    await onDelete();
    setLoading('');
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ background: `${colors.secondaryContrast}` }}>
          <ImageContainer>{renderMediaItem(file, false)}</ImageContainer>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={20}>
            <Content>
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
                <Typography.Paragraph
                  copyable={{ text: data.sourceUrl || data.url }}
                  children={'Copy Link'}
                />
              </Space>
            </Content>

            <Row justify="space-between">
              <Col>
                <Space>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={handlDeleteMediaItem}
                    okText="Yes"
                    okButtonProps={{
                      id: 'delete-media-confirm',
                    }}
                    cancelText="No"
                  >
                    <Button
                      id="delete-media"
                      children={`Delete`}
                      danger
                      loading={loading === 'delete'}
                    />
                  </Popconfirm>

                  <Button
                    id="update-media"
                    onClick={handleUpdateMediaItem}
                    children={'Update'}
                    type="primary"
                    loading={loading === 'update'}
                  />
                </Space>
              </Col>
              {onSelect && (
                <Col>
                  <Button
                    id="select-media"
                    onClick={() => onSelect(file)}
                    children={`Select`}
                    type="primary"
                  />
                </Col>
              )}
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  );
};

const ImageContainer = styled.div`
  height: 400px;
  background: #fff;
  border: 1px solid #d9d9d9;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 300px;
`;

export default MediaImage;
