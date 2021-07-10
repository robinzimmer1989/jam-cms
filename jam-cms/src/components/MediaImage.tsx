import React, { useEffect, useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Button, Space, Row, Col, Popconfirm, Typography } from 'antd';

// import app components
import Caption from './Caption';
import Input from './Input';

import { convertFileSize, renderImage } from '../utils';
import { colors } from '../theme';

const MediaImage = (props: any) => {
  const { file, onSelect, onDelete, onUpdate } = props;

  const [data, setData] = useState({ ...file });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(file);
  }, [file]);

  const handleChange = (e: any) => setData({ ...data, [e.target.name]: e.target.value });

  const handleUpdateMediaItem = async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"update"' is not assignable to p... Remove this comment to see the full error message
    setLoading('update');

    onUpdate(data);

    setLoading(false);
  };

  const handlDeleteMediaItem = async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"delete"' is not assignable to p... Remove this comment to see the full error message
    setLoading('delete');

    await onDelete();

    setLoading(false);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ background: `${colors.secondaryContrast}` }}>
          <ImageContainer>{renderImage(file)}</ImageContainer>
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
                    {/* @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message */}
                    <Button children={`Delete`} danger loading={loading === 'delete'} />
                  </Popconfirm>

                  <Button
                    onClick={handleUpdateMediaItem}
                    children={'Update'}
                    // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
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
