import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Space, Row, Col, Popconfirm, message, Typography } from 'antd';
import Img from 'gatsby-image';

// import app components
import Caption from './Caption';
import Input from './Input';

import { mediaActions } from '../actions';
import { useStore } from '../store';
import { convertFileSize } from '../utils';
import { colors } from '../theme';

const MediaImage = (props) => {
  const { file, onSelect, onClose } = props;

  const [{ config }, dispatch] = useStore();

  const [data, setData] = useState({ ...file });
  const [loading, setLoading] = useState(false);

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
    setLoading('delete');
    const result = await mediaActions.deleteMediaItem({ ...file }, dispatch, config);
    setLoading(false);

    if (result) {
      onClose();
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ background: `${colors.background.light}`, padding: 0 }}>
          {file.type === 'image' && file?.childImageSharp?.fluid && (
            <Img
              fluid={file.childImageSharp.fluid}
              imgStyle={{
                objectFit: 'contain',
                maxWidth: file.width,
                maxHeight: file.height,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              alt={file.alt}
              style={{ width: '100%', height: '50vh' }}
            />
          )}

          {file.type === 'application' && (
            <File>
              <div>
                <img src={file.icon} />
                <span>{file.title}</span>
              </div>
            </File>
          )}
        </Col>
        <Col span={12} style={{ padding: '0 0 0 20px' }}>
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

                  {data?.width && data?.height && (
                    <>
                      <Col span={6}>
                        <Caption children="Dimensions" />
                      </Col>
                      <Col span={18}>
                        <Typography children={`${data.width} by ${data.height} pixels`} />
                      </Col>
                    </>
                  )}
                </Row>

                <Input
                  label="Alternative Text"
                  value={data.altText}
                  onChange={handleChange}
                  name={`altText`}
                />

                <Input label="Url" value={data.url} onChange={() => {}} name={`url`} disabled />
                <Typography.Paragraph copyable={{ text: data.url }} children={'Copy Link'} />
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

const File = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;

  div {
  }

  img {
    margin-bottom: 10px;
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

export default MediaImage;
